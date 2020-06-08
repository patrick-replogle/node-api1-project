import React, { useState } from "react";
import Form from "./components/Form";
import Users from "./components/Users";

import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [itemToEdit, setItemToEdit] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="App">
      <h1>Front-End User App</h1>
      <Form
        users={users}
        setUsers={setUsers}
        itemToEdit={itemToEdit}
        setItemToEdit={setItemToEdit}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
      <Users
        users={users}
        setUsers={setUsers}
        itemToEdit={itemToEdit}
        setItemToEdit={setItemToEdit}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </div>
  );
}

export default App;
