import React from "react";
import axios from "axios";

const UserCard = props => {
  const fetchData = () => {
    axios
      .get("http://localhost:4000/api/users/")
      .then(res => {
        props.setUsers(res.data);
      })
      .catch(err => {
        console.log("error fetching : ", err);
      });
  };

  const handleDelete = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:4000/api/users/${props.user.id}`)
      .then(() => {
        fetchData();
      })
      .catch(err => {
        console.log("error deleting: ", err);
      });
  };

  const handleEdit = e => {
    e.preventDefault();
    props.setItemToEdit(props.user);
    props.setIsEditing(true);
  };

  return (
    <div key={props.user.id}>
      <p>Name: {props.user.name}</p>
      <p>Bio: {props.user.bio}</p>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
};

export default UserCard;
