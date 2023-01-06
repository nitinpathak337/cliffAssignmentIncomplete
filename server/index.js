const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const dbPath = path.join(__dirname, "users.db");

let db = null;

const initializeDB = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3001, () => {
      console.log("Server is running");
    });
  } catch (e) {
    console.log(`DB Error:${e.message}`);
  }
};

initializeDB();

app.post("/signup", async (req, res) => {
  const { name, username, password } = req.body;

  let query = `select * from user_details where username='${username}' and password='${password}';`;
  let result = await db.get(query);

  if (result !== undefined) {
    res.status(400);
    res.send("User already exist");
  } else {
    let insertQuery = `insert into user_details values ('${name}','${username}','${password}');`;
    await db.run(insertQuery);
    res.status(200);
    res.send("User registered successfully");
  }
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  let query = `select * from user_details where username='${username}' and password='${password}';`;
  let result = await db.get(query);

  if (result === undefined) {
    res.status(400);
    res.send("User does not exist");
  } else {
    res.status(200);
    res.send("Login Success");
  }
});
