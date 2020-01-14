// implement your API here
const express = require("express");
const db = require("./data/db.js");

const server = express();

server.listen(4000, () => {
  console.log("=== server listening on port 4000 ===");
});

server.use(express.json());

server.get("/api/users", (req, res) => {
  db.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({
        message: err,
        success: false
      });
    });
});

server.get("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = db.findById(user => user.id === req.params.id);
  db.findById(user)
    .then(res => {
      if (user) {
        res.status(200).json(res);
      } else {
        res.status(404).json({
          error: "User not found"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        message: err,
        success: false
      });
    });
});

server.post("/api/users", (req, res) => {
  const newUser = req.body;
  db.insert(newUser)
    .then(user => {
      res.status(201).json({ success: true, user });
    })
    .catch(err => {
      res.status(500).json({
        message: err,
        success: false
      });
    });
});

server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(deletedUser => {
      if (deletedUser) {
        res.status(204).end();
      } else {
        res.status(404).json({ message: `Could not find id ${id}` });
      }
    })
    .catch(err => {
      res.status(500).json({ success: false, err });
    });
});

server.put("/api/users/:id", (req, res) => {});
