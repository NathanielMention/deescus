const { pool } = require("../../config/dbConfig");

async function getChat(roomId) {
  try {
    const result = await pool.query(
      `
        SELECT chat_table.id as id, 
               message, 
               chat_table.created_at as createdAt, 
               user_table.id as userid, 
               username, 
               avatar
        FROM chat_table 
        LEFT JOIN user_table on userid = user_table.id 
        WHERE roomid = $1 
        ORDER BY chat_table.created_at ASC`,
      [roomId]
    );
    return result.rows;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getChat,
};
