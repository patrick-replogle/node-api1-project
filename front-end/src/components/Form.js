import React, { useState, useEffect } from "react";
import axios from "axios";

const Form = ({
  users,
  setUsers,
  isEditing,
  setIsEditing,
  itemToEdit,
  setItemToEdit
}) => {
  const [user, setUser] = useState({ name: "", bio: "" });

  useEffect(() => {
    if (isEditing) {
      setUser(itemToEdit);
    }
  }, [setUsers, isEditing, itemToEdit]);

  const fetchData = () => {
    axios
      .get("http://localhost:4000/api/users/")
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.log("error fetching : ", err);
      });
  };

  const handleChange = e => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (isEditing) {
      axios
        .put(`http://localhost:4000/api/users/${itemToEdit.id}`, user)
        .then(() => {
          fetchData();
          setUser({ name: "", bio: "" });
          setIsEditing(false);
          setItemToEdit({});
        });
    } else {
      axios
        .post("http://localhost:4000/api/users", user)
        .then(() => {
          fetchData();
          setUser({ name: "", bio: "" });
          setIsEditing(false);
          setItemToEdit({});
        })
        .catch(err => {
          console.log("error posting : ", err);
        });
    }
  };

  return (
    <>
      {isEditing ? <h2>Edit a User</h2> : <h2>Add a User</h2>}
      <form onSubmit={handleSubmit}>
        <input
          value={user.name}
          placeholder="name"
          name="name"
          type="text"
          onChange={handleChange}
        />
        <input
          value={user.bio}
          placeholder="bio"
          name="bio"
          type="text"
          onChange={handleChange}
        />
        <button>Submit</button>
        <button
          onClick={e => {
            e.preventDefault();
            setIsEditing(false);
            setItemToEdit({});
            setUser({ name: "", bio: "" });
          }}
        >
          Cancel
        </button>
      </form>
    </>
  );
};

export default Form;
