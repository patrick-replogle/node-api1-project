import React, { useEffect } from "react";
import axios from "axios";

import UserCard from "./UserCard";

const Users = ({
  users,
  setUsers,
  isEditing,
  setIsEditing,
  itemToEdit,
  setItemToEdit
}) => {
  useEffect(() => {
    axios
      .get("http://localhost:4000/api/users")
      .then(res => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch(err => {
        console.log("error fetching : ", err);
      });
  }, [setUsers]);

  return (
    <div>
      {users.map(user => {
        return (
          <UserCard
            user={user}
            key={user.id}
            setUsers={setUsers}
            setIsEditing={setIsEditing}
            setItemToEdit={setItemToEdit}
            itemToEdit={itemToEdit}
          />
        );
      })}
    </div>
  );
};

export default Users;
