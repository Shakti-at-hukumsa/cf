// db.js
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:'); // ya phir aap file path de sakte hain

// Table create karna
db.serialize(() => {
    db.run("CREATE TABLE items (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, value TEXT)");
});

// Item add karne ka function
const addItem = (name, value) => {
    return new Promise((resolve, reject) => {
        db.run("INSERT INTO items (name, value) VALUES (?, ?)", [name, value], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id: this.lastID, name, value });
            }
        });
    });
};

// Item read karne ka function
const getItems = () => {
    return new Promise((resolve, reject) => {
        db.all("SELECT * FROM items", [], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Item update karne ka function
const updateItem = (id, name, value) => {
    return new Promise((resolve, reject) => {
        db.run("UPDATE items SET name = ?, value = ? WHERE id = ?", [name, value, id], function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id, name, value });
            }
        });
    });
};

// Item delete karne ka function
const deleteItem = (id) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM items WHERE id = ?", id, function(err) {
            if (err) {
                reject(err);
            } else {
                resolve({ id });
            }
        });
    });
};

module.exports = { addItem, getItems, updateItem, deleteItem };