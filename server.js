// server.js
const express = require('express');
const bodyParser = require('body-parser');
const { addItem, getItems, updateItem, deleteItem } = require('./db');

const app = express();
app.use(bodyParser.json());

app.post('/items', async (req, res) => {
    try {
        const item = await addItem(req.body.name, req.body.value);
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/items', async (req, res) => {
    try {
        const items = await getItems();
        res.json(items);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/items/:id', async (req, res) => {
    try {
        const item = await updateItem(req.params.id, req.body.name, req.body.value);
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/items/:id', async (req, res) => {
    try {
        const item = await deleteItem(req.params.id);
        res.json(item);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});