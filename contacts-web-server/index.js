
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
    const id = Number(req.params.id); 
    const contact = contacts.find((value) => value.id === id); 
    if (contact) {
        res.json(contact);
    } else {
        res.status(404).json({ error: "Could not find contact" });
    }
});

app.delete("/api/contacts/:id", (req, res) => {
    const id = Number(req.params.id); 
    const contactIndex = contacts.findIndex((contact) => contact.id === id); 

    if (contactIndex !== -1) {
        // Deletes one contact quite nicely
        contacts.splice(contactIndex, 1);
        res.status(204).send(); 
    } else {
        // Contact does not exist
        res.status(404).json({ error: "Contact not found" });
    }
});


app.post("/api/contacts", (req, res) => {
    const { name, email } = req.body;

    // Validate!
    if (!name || !email) {
        return res.status(400).json({ error: "Missing required fields: 'name' and/or 'email'" });
    }

    // More validate!
    const emailExists = contacts.some((contact) => contact.email === email);
    if (emailExists) {
        return res.status(409).json({ error: "Email already exists" });
    }

    // unqiue id
    const id = Math.floor(Math.random() * 1000000) + Date.now();

    const newContact = { id, name, email };
    contacts.push(newContact);

    res.status(201).json(newContact);
});


app.get("/", (req, res) => {
    res.send("Whats up");
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});