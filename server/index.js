import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "crud",
    dateStrings: "date"
});

// Get all books
app.get("/", (req, res) => {
    const sql = "SELECT * FROM book";
    db.query(sql, (err, data) => {
        if (err) {
            return res.json({ Error: "Error" });
        }
        return res.json(data);
    });
})
// Create a new book
app.post("/create", (req, res) => {
    const sql = "INSERT INTO book (publisher, name, date) VALUES (?)";
    const values = [
        req.body.publisher,
        req.body.name,
        req.body.date, 
    ];
    db.query(sql, [values], (err, data) => {
        if (err) {
            console.error("SQL Error:", err); // Log the actual SQL error
            return res.status(500).json({ error: "Error in creating book", details: err })
        }
        return res.json(data);
    });
});

// Update a book
app.put("/update/:id", (req, res) => {
    const sql = "UPDATE book SET name = ?, publisher = ?, date = ? WHERE id = ?";
    const values = [
        req.body.name,
        req.body.publisher,
        req.body.date, 
    ];
    const id = req.params.id;
    db.query(sql, [...values, id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error in updating book" });
        }
        return res.json(data);
    });
});

app.get("/getrecord/:id", (req, res) => {
    const sql = "SELECT * FROM book WHERE id = ?";
    const id = req.params.id;
   
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error in updating book" });
        }
        
            return res.json(data[0]);
    });
});
    


// Delete a book
app.delete("/delete/:id", (req, res) => {
    const sql = "DELETE FROM book WHERE id = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, data) => {
        if (err) {
            return res.json({ Error: "Error in deleting book" });
        }
        return res.json(data);
    });
});

// Start the server
app.listen(3030, () => {
    console.log("Server running on port 3030...");
});
