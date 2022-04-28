DROP TABLE IF EXISTS user_table CASCADE;
CREATE TABLE user_table (
  id SERIAL PRIMARY KEY,
  username text NOT NULL,
  password text NOT NULL,
  avatar text,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE IF EXISTS room_table CASCADE;
CREATE TABLE room_table (
  id SERIAL PRIMARY KEY,
  roomname text,
  type boolean,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE IF EXISTS chat_table CASCADE;
CREATE TABLE chat_table (
  id SERIAL PRIMARY KEY,
  roomid integer REFERENCES room_table (id) ON DELETE CASCADE,
  userid integer REFERENCES user_table (id) ON DELETE CASCADE,
  message text,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE IF EXISTS users_rooms CASCADE;
CREATE TABLE users_rooms (
  roomid integer REFERENCES room_table (id) ON DELETE CASCADE,
  userid integer REFERENCES user_table (id) ON DELETE CASCADE,
  PRIMARY KEY (roomid, userid)
);
DROP TABLE IF EXISTS user_session CASCADE;
CREATE TABLE user_session (
  sid varchar NOT NULL COLLATE "default",
  sess json NOT NULL,
  expire timestamp(6) NOT NULL
) WITH (OIDS = FALSE);
ALTER TABLE user_session
ADD
  CONSTRAINT session_pkey PRIMARY KEY (sid) NOT DEFERRABLE INITIALLY IMMEDIATE;
CREATE INDEX IDX_session_expire ON user_session (expire);