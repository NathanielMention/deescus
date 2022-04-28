require("dotenv").config({ path: "./.env" });
const path = require("path");
const express = require("express");
const app = express();
const { cloudinary } = require("./config/cloudinary");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const cors = require("cors");
const server = require("http").createServer(app);
const io = require("socket.io")(server, { pingTimeout: 60000 });
const pgSession = require("connect-pg-simple")(session);
const { pool } = require("./config/dbConfig");
const { connectionString } = require("./config/dbConfig");
const initializePassport = require("./middleware/passportConfig");
initializePassport.initialize(passport);
const { getChat } = require("./database/queries/rooms");

app.use(express.static(path.join(__dirname, "../client/build")));
app.use(cors({ credentials: true, origin: true }));

// Parses data from form
app.use(
  bodyParser.urlencoded({
    parameterLimit: 100000,
    limit: "50mb",
    extended: true,
  })
);
app.use(bodyParser.json({ limit: "50mb" }));

app.use(
  session({
    store: new pgSession({
      pool,
      tableName: "user_session",
    }),
    // Key we want to keep secret which will encrypt all of our information
    secret: process.env.SESSION_SECRET,
    // Should we resave our session variables if nothing has changes which we dont
    resave: false,
    // Save empty value if there is no value which we do not want to do
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  })
);
console.log("the path", path.join(__dirname, "../client/build"));

//initializes passport
app.use(passport.initialize());
// Store variables to use across the whole session, Works with app.use(Session) above
app.use(passport.session());

// app.use(express.static("build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
//routes
app.use("/", require("./routes/auth"));

io.on("connection", (socket) => {
  socket.on("disconnect", (reason) => {});

  socket.on("room", (data) => {
    console.log("room join");
    socket.join(data.room);
  });

  socket.on("leave room", (data) => {
    console.log("leaving room");
    socket.leave(data.room);
  });

  socket.on("new message", (data) => {
    //put data in db here
    const message = data.message;
    const userId = data.userId;
    const roomId = data.roomId;
    try {
      pool.query(
        `INSERT INTO chat_table (message, userid, roomid)
              VALUES ($1, $2, $3)
              RETURNING id, message, userid, roomid`,
        [message, userId, roomId],
        (err) => {
          if (err) {
            throw err;
          } else {
            io.in(roomId).emit("receive message", data);
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  });
});

app.post("/createroom", async function (req, res) {
  const roomName = req.body.roomName;

  try {
    const results = await pool.query(
      `INSERT INTO room_table (roomName)
            VALUES ($1)
            RETURNING id, roomname`,
      [roomName]
    );
    const roomId = results.rows[0].id;
    const userId = req.user && req.user.id;
    await pool.query(
      `INSERT INTO users_rooms (userid, roomid)
            VALUES ($1, $2)`,
      [userId, roomId]
    );
    res.json({ roomid: roomId, name: results.rows[0].roomname, messages: [] });
  } catch (error) {
    console.error(error);
  }
});

app.post("/removeroom", function (req, res) {
  const roomId = req.body.roomId;

  try {
    pool.query(
      `DELETE FROM room_table 
      WHERE id = $1`,
      [roomId],
      (err) => {
        if (err) {
          throw err;
        } else {
          res.sendStatus(200);
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
});

app.get("/room/:roomId", async function (req, res) {
  const roomId = req.params.roomId;
  //JOIN chat_table ON room_table.id = chat_table.roomid
  try {
    const result = await pool.query(
      `SELECT
      room_table.id as roomId,
      room_table.roomname as name
    FROM room_table
      WHERE room_table.id = $1`,
      [roomId]
    );
    const room = result.rows[0];
    const messages = await getChat(roomId);
    res.json({ ...room, messages });
  } catch (error) {
    console.error(error);
  }
});

app.get("/rooms", async function (req, res) {
  try {
    const userId = req.user && req.user.id;
    const result = await pool.query(
      `SELECT
      users_rooms.roomid as roomid,
      room_table.roomname as name
    FROM users_rooms
      JOIN room_table on users_rooms.roomid = room_table.id
      WHERE users_rooms.userid = $1`,
      [userId]
    );
    const rooms = result.rows;
    res.json({ rooms });
  } catch (error) {
    console.error(error);
  }
});

app.post("/api/upload", async (req, res) => {
  try {
    const fileStr = req.body.data;
    const uploadResponse = await cloudinary.uploader.upload(fileStr);
    const avatar = uploadResponse.secure_url;
    const username = req.user.username;
    console.log(uploadResponse);
    pool.query("UPDATE user_table SET avatar=($1) WHERE username=($2)", [
      avatar,
      username,
    ]);
    res.json({ avatar });
  } catch (err) {
    console.error(err);
    res.status(500).json({ err: "Something went wrong" });
  }
});

// const root = path.join(__dirname, "../client/build");
// app.use(express.static(root));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});
// app.use((req, res, next) => {
//   // res.sendFile(path.join(__dirname, "../client/build", "index.html"));
//   res.sendFile("index.html", { root });
// });

server.listen(5001);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
