
const express = require("express");
const app = express();
const cors = require("cors");

// middleware for parsing body into js object
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

const requestLogger = (req, res, next) => {
    console.log(`Request Method: ${req.method}`);
    console.log(`Request URL: ${req.url}`);
    console.log("Request body:", req.body);
    console.log("------------");
    next();
};
// utilize requestLogger middleware
app.use(requestLogger);

const contacts = [
    { name: "John Doe", email: "johndoe@gmail.com", id: 1 },
    { name: "Jane Smith", email: "janesmith@gmail.com", id: 2 },
    { name: "Michael Johnson", email: "michealjohnson@gmail.com", id: 3 },
    { name: "Emily Davis", email: "emilydavis@gmail.com", id: 4 },
    { name: "David Brown", email: "davidbrown@gmail.com", id: 5 },
];

const port = process.env.PORT || 3001;

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
    const { name, email, id } = req.body;

    // Validate!
    if (!name || !email) {
        return res.status(400).json({ error: "Missing required fields: 'name' and/or 'email'" });
    }

    // More validate!
    const emailExists = contacts.some((contact) => contact.email === email);
    if (emailExists) {
        return res.status(409).json({ error: "Email already exists" });
    }

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