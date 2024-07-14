const express = require("express");
const fs = require("fs").promises;

const app = express();
const port = 8000;
const filePath = "contacts.json";

app.use(express.json());

const getContact = async () => {
    try {
        const allContacts = await fs.readFile(filePath, "utf-8");
        return JSON.parse(allContacts);
    } catch {
        return [];
    }
}

app.get("/contacts", async (req, res) => {
  try {
        const allContacts = await getContact();
        if (allContacts.length === 0) {
            return res.json({ message: "No contacts found" });
        }
        res.json({ allContacts });
    } catch {
        return res.status(500).json({ message: "Error getting contacts" });
    }
});

app.post("/contacts/add", async (req, res) => {

    const newData = req.body;

    if (!newData.firstName || !newData.lastName || !newData.number || !newData.type) {
        return res.status(400).json({ message: "Field is missing" });
    }

    if (newData.number.length !== 10 || isNaN(newData.number)) {
        return res.status(400).json({ message: "Number must be exactly 10 digits" });
    }

    try {
        const allContacts = await getContact();
        const existingContact = allContacts.find(contact => contact.number === newData.number);
        
        if (existingContact) {
            return res.json({ message: "Contact already exists" });
        }
        
        allContacts.push(newData);
        await fs.writeFile(filePath, JSON.stringify(allContacts, null, 2), "utf8");
        return res.status(200).json({ message: "Contact added successfully" });
    } catch {
        return res.status(500).json({ message: "Error getting contacts" });
    }
});

app.get("/contacts/search/name", (req, res) => {
    return res.status(400).json({ message: "Enter valid name to search" });
});

app.get("/contacts/search/name/:query", async (req, res) => {
    const nameQuery = req.params.query.toLowerCase();
    try {
        const allContacts = await getContact();
        const filteredarray = allContacts.filter((contact) => contact.firstName.toLowerCase() === nameQuery || contact.lastName.toLowerCase() === nameQuery)
        if(filteredarray.length === 0) {
            return res.status(400).json({ message: "Contact does not exist" });
        }
        res.json({ filteredarray });
    } catch {
        return res.status(500).json({ message: "Error getting contacts" });
    }
});

app.get("/contacts/search/type", (req, res) => {
    return res.status(400).json({ message: "Enter valid type to search" });
});

app.get("/contacts/search/type/:query", async (req, res) => {
    const typeQuery = req.params.query.toLowerCase();
    try {
        const allContacts = await getContact();
        const filteredarray = allContacts.filter((contact) => contact.type.toLowerCase() === typeQuery)
        if(filteredarray.length === 0) {
            return res.status(400).json({ message: "Contact does not exist" });
        }
        res.json({ filteredarray });
    } catch {
        return res.status(500).json({ message: "Error getting contact" });
    }
});

app.get("/contacts/search/number", (req, res) => {
    return res.status(400).json({ message: "Enter valid number to search" });
});

app.get("/contacts/search/number/:query", async (req, res) => {
    const numberQuery = req.params.query;
    try {
        const allContacts = await getContact();
        const filteredarray = allContacts.filter((contact) => contact.number === numberQuery)
        if(filteredarray.length === 0) {
            return res.status(400).json({ message: "Contact does not exist" });
        }
        res.json({ filteredarray });
    } catch {
        return res.status(500).json({ message: "Error getting contact" });
    }
});

app.delete("/contacts/delete", (req, res) => {
    return res.status(400).json({ message: "Enter valid number to delete" });
});

app.delete("/contacts/delete/:number", async (req, res) => {
    const deleteQuery = req.params.number;
    try {
        const allContacts = await getContact();
        const index = allContacts.findIndex(contact => contact.number === deleteQuery);
        if (index === -1) {
            return res.status(400).json({ message: "Contact does not exist" });
        }
        allContacts.splice(index, 1);
        await fs.writeFile(filePath, JSON.stringify(allContacts, null, 2), "utf8");
        res.json({ message: "Contact deleted successfully" });
    } catch {
        return res.status(500).json({ message: "Error deleting contact" });
    }
});

app.put("/contacts/update/:number", async (req, res) => {
    const updateQuery = req.params.number;
    const updatedData = req.body;

    if (!updatedData.firstName || !updatedData.lastName || !updatedData.number || !updatedData.type) {
        return res.status(400).json({ message: "Field is missing" });
    }

    if (updatedData.number.length !== 10 || isNaN(updatedData.number)) {
        return res.status(400).json({ message: "Number must be exactly 10 digits" });
    }

    try {
        const allContacts = await getContact();
        const index = allContacts.findIndex(contact => contact.number === updateQuery);
        if (index === -1) {
            return res.status(400).json({ message: "Contact does not exist" });
        }
        allContacts.splice(index, 1);
        allContacts.push(updatedData);
        await fs.writeFile(filePath, JSON.stringify(allContacts, null, 2), "utf8");
        res.json({ message: "Contact updated successfully" });
    } catch {
        return res.status(500).json({ message: "Error updating contact" });
    }
});

app.listen(port, () => console.log("listening on port " + port));
