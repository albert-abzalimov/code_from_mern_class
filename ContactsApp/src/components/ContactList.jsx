/* eslint-disable react/prop-types */
import { useState } from "react";

const ContactList = ({ contacts }) => {
    const [searchTerm, setSearchTerm] = useState("");
  
    const handleSearchChange = (event) => {
      setSearchTerm(event.target.value);
    };
  
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div className="contacts-app">
        <h2>Search Contacts</h2>
        <input
          type="text"
          placeholder="Search by name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
  
        <h2>Contact List</h2>
        {filteredContacts.length > 0 ? (
          <table className="contact-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact, index) => (
                <tr key={contact.id} className={index % 2 === 0 ? "green-row" : "green-row-dark"}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No contacts found</p>
        )}
      </div>
    );
  };

export default ContactList;