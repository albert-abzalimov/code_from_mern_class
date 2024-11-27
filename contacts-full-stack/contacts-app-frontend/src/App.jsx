// App.jsx
import { useEffect, useState } from "react";
import AddContact from "./components/AddContact";
import ContactList from "./components/ContactList";
import "./index.css";
import contactService from "./services/contacts"

const App = () => {
  const [contacts, setContacts] = useState([]);
  // set the initial contact data

  // useEffect to fetch data when component mounts
  useEffect(() => {
    contactService.getContacts().then((data) => {console.log("retrieved data", data); setContacts(data);});
  }, []);

  console.log("contacts: ", contacts);

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

    const isDuplicate = contacts.some(contact =>
      contact.email.toLowerCase() === trimmedEmail.toLowerCase()
    );
    if (isDuplicate) {
      alert("Contact email already exists.");
      return;
    }

    const existingContact = contacts.find(contact => contact.name.toLowerCase() === trimmedName.toLowerCase());

    if (existingContact) {
      if (window.confirm(`Contact "${trimmedName}" already exists. Do you want to update the email?`)) {
        const updatedContact = { ...existingContact, email: trimmedEmail };

        contactService.updateContact(updatedContact).then(() => {
          // so if its the existing contact... then update it.. if not then just keep it :)
          setContacts(contacts.map(contact =>
            contact.id === existingContact.id ? updatedContact : contact
          ));
        }).catch(error => {
          console.error("Uh oh... error updating contact?:", error);
        });
      }
    } else {

      // Otherwise we're all good to go

      const newContact = {
        name: trimmedName,
        email: trimmedEmail,
        id: Date.now(),
      };

      setContacts([...contacts, newContact]);
      contactService.addContact(newContact);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Do you wish to delete this contact?")) {
      contactService.deleteContact(id).then(() => {
        setContacts(contacts.filter((contact) => contact.id !== id));
      }).catch((error) => {
        console.error("Erm.. that shouldn't happen something went wrong deleting contact", error);
      });
    }
  };

  return (
    <div className="contacts-app">
      <AddContact onSubmit={handleSubmit} />
      <ContactList
        contacts={contacts} deleteContact={handleDelete}
      />
    </div>
  );
};

export default App;
