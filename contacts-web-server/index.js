
const express = require("express");
const app = express();
// middleware for parsing body into js object
app.use(express.json());

const contacts = [
    { name: "John Doe", email: "johndoe@gmail.com", id: 1 },
    { name: "Jane Smith", email: "janesmith@gmail.com", id: 2 },
    { name: "Michael Johnson", email: "michealjohnson@gmail.com", id: 3 },
    { name: "Emily Davis", email: "emilydavis@gmail.com", id: 4 },
    { name: "David Brown", email: "davidbrown@gmail.com", id: 5 },
];

const port = "3001";

app.get("/api/contacts", (req, res) => {
    return res.status(201).json(contacts);
});

app.get("/api/info", (req, res) => {
    return res.send(`
        <h1>Contacts Web Server</h1>
        <p>Number of contacts: ${contacts.length}</p>
        `);
});

app.get("/api/contacts/:id", (req, res) => {
    const id = req.params.id;
    console.log(contacts);
    const contact = contacts.find((value) => value.id === id);
    console.log("contact: ", contact);
    contact ? res.json(contact) : res.status(404).json({"error": "Could not find contact", "contact": contact});
});


app.get("/", (req, res) => {
    res.send("Whats up");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});