// implement your API here
const express = require("express");
const db = require("./data/db.js");

const server = express();

server.listen(4000, () => {
  console.log("=== server listening on port 4000 ===");
});

server.use(express.json());

//get all users
server.get("/api/users", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json({
        message: err,
        success: false
      });
    });
});

//get user by id
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(res => {
      if (res.length > 0) {
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

//post new user
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

//delete user
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

//update user
server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = req.body;

  db.update(id, user)
    .then(user => {
      if (user) {
        res.status(200).json({
          success: true,
          user
        });
      } else {
        res.status(404).json({
          success: false,
          message: `Id=${id} does not exist`
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        err
      });
    });
});
