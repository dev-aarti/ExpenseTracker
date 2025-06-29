const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "userrecords",
});

app.get("/", (re, res) => {
  return res.json("from Backend");
});

app.get("/records", (req, res) => {
  const sql = "SELECT * FROM records";
  db.query(sql, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// ...existing code...

app.post("/records", (req, res) => {
  const { title, price, date } = req.body;
  const sql = "INSERT INTO records (title, price, date) VALUES (?, ?, ?)";
  db.query(sql, [title, price, date], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.status(201).json({ message: "Record added", id: result.insertId });
  });
});

app.delete("/records/:id", (req, res) => {
  const id = req.params.id;
  console.log("Deleting record with id:", id); // Add this line
  const sql = "DELETE FROM records WHERE id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Delete error:", err); // Add this line
      return res.status(500).json(err);
    }
    res.status(200).json({ message: "Record deleted" });
  });
});

app.put("/records/:id", (req, res) => {
  const id = req.params.id;
  const { title, price, date } = req.body;
  const sql = "UPDATE records SET title = ?, price = ?, date = ? WHERE id = ?";
  db.query(sql, [title, price, date, id], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }
    res.status(200).json({ message: "Record updated" });
  });
});

app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
