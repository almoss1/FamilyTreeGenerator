const express = require('express');

const app = express();
const PORT = 5000;

// Database connection
require('./database');

// Models
const Member = require('./models/member');

app.use(express.static('frontend'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post('/my-form-route', async (req, res) => {
    const member = new Member(req.body);
    try {
        const createdMember = await member.save();
        res.send(`Succesfully added ${createdMember.name} to the family tree.`);
    } catch (e) {
        console.log("Error saving member:");
        console.error(e);
        res.send(`Bad shit: ${e.message}`);
    }
});

app.listen(PORT, () => {
    console.log(`Running FamTree backend on http://0.0.0.0:${PORT}`);
});

// https://alex.com/