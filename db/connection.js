// Connect to database
const mysql = require("mysql2");

const db = mysql.createConnection(
    {
      host: 'localhost',
      // Your MySQL username,
      user: 'root',
      // Your MySQL password
      password: '',
      database: 'chat_like_its_2010'
    },
    console.log('Connected to the chat database.')
  );
