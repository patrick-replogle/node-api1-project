// implement your API here
const express = require("express");
const db = require("./data/db.js");

const server = express();

server.listen(4000, () => {
  console.log("=== server listening on port 4000 ===");
});

server.get("/api/users", (req, res) => {
  res.json(db);
});

server.get("/api/users/:id", (req, res) => {
  const user = db.find(user => user.id === req.params.id);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});
