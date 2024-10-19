// App.jsx
import { useState } from "react";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import "./index.css";

const App = () => {
  const [contacts, setContacts] = useState([
    { name: "John Doe", email: "johndoe@gmail.com", id: 1 },
    { name: "Jane Smith", email: "janesmith@gmail.com", id: 2 },
    { name: "Michael Johnson", email: "michealjohnson@gmail.com", id: 3 },
    { name: "Emily Davis", email: "emilydavis@gmail.com", id: 4 },
    { name: "David Brown", email: "davidbrown@gmail.com", id: 5 },
  ]);

  const handleSubmit = (name, email) => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      alert("Contact name cannot be empty.");
      return;
    }
    if (!trimmedEmail) {
      alert("Contact email cannot be empty.");
      return;
    }

    // Checking if we have a duplicate somewhere
    const isDuplicate = contacts.some(contact =>
      contact.name.toLowerCase() === trimmedName.toLowerCase() ||
      contact.email.toLowerCase() === trimmedEmail.toLowerCase()
    );
    if (isDuplicate) {
      alert("Contact name or email already exists.");
      return;
    }
    // Otherwise we're all good to go

    const newContact = {
      name: trimmedName,
      email: trimmedEmail,
      id: Date.now(),
    };

    setContacts([...contacts, newContact]);
  };

  return (
    <div className="contacts-app">
      <AddContact onSubmit={handleSubmit} />
      <ContactList
        contacts={contacts}
      />
    </div>
  );
};

export default App;
