/* eslint-disable react/prop-types */
// components/AddContact.jsx
import { useState } from "react";
import "../index.css";

const AddContact = ({ onSubmit }) => {
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setNewEmail(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(newName, newEmail);
    setNewName(""); // Clear input field
    setNewEmail(""); // Clear input field
  };

  return (
    <div className="contacts-app">
      <h2>Add a New Contact</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter contact name"
          value={newName}
          onChange={handleNameChange}
        />
        <input
          type="email"
          placeholder="Enter contact email"
          value={newEmail}
          onChange={handleEmailChange}
        />
        <button type="submit">Add Contact</button>
      </form>
    </div>
  );
};

export default AddContact;
