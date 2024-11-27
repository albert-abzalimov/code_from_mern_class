import axios from "axios";
// Define the base URL for the JSON Server
const baseURL = process.env.NODE_ENV === "production" ? "/api/contacts" : "http://localhost:3001/api/contacts";

const getContacts = () => {
  return axios.get(baseURL).then((res) => { console.log("why is res.data this: ", res.data); return res.data;});
};

const addContact = (contact) => {
  return axios.post(baseURL, contact).then((res) => res.data);
};

const updateContact = (contact) => {
  return axios.put(`${baseURL}/${contact.id}`, contact)
  .then((res) => res.data);
};

const deleteContact = (id) => {
  return axios.delete(`${baseURL}/${id}`).then((res) => res.data);
};

export default { getContacts, addContact, updateContact, deleteContact};