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
        success: false,
        errorMessage: "The users information could not be retrieved."
      });
    });
});

//get user by id
server.get("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          error: "The user with the specified ID does not exist."
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        errorMessage: "The user information could not be retrieved.",
        success: false
      });
    });
});

//post new user
server.post("/api/users", (req, res) => {
  const newUser = req.body;

  if (!newUser.name || !newUser.bio) {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    });
  } else {
    db.insert(newUser)
      .then(user => {
        res.status(201).json({ success: true, user });
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          errorMessage:
            "There was an error while saving the user to the database"
        });
      });
  }
});

//delete user
server.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(deletedUser => {
      if (deletedUser) {
        res.status(204).end();
      } else {
        res
          .status(404)
          .json({ message: "The user with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({
        success: false,
        message: "The user with the specified ID does not exist."
      });
    });
});

//update user
server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const userInfo = req.body;

  if (!userInfo.name || !userInfo.bio) {
    res.status(400).json({
      errorMessage: "Please provide name and bio for the user."
    });
  } else {
    db.update(id, userInfo)
      .then(user => {
        if (user) {
          res.status(200).json({
            success: true,
            user
          });
        } else {
          res.status(404).json({
            success: false,
            message: "The user with the specified ID does not exist."
          });
        }
      })
      .catch(err => {
        res.status(500).json({
          success: false,
          errorMessage: "The user information could not be modified."
        });
      });
  }
});
