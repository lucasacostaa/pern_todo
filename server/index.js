const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const Sequelize = require("sequelize"),
const S = Sequelize;

// Middleware
app.use(cors());
app.use(express.json());
//Routes

//Create a todo

app.post("/todos", async (req, res) => {
    try{
        const {description} = req.body;

        const newTodo = await pool.query("INSERT INTO todo(description) VALUES($1)", [description]);

        res.json(newTodo.rows)
    } catch {
        console.error(err.message)
        return res.status(500).json("Server error")
    }
})

//Get all todo

app.get("/todos", async (req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message)
        return res.status(500).json("Server error")
    }
})

//Get a todo

app.get("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params
        const todo = await pool.query("SELECT * FROM todo WHERE id = $1", [id])
        res.json(todo.rows[0])
    } catch (err) {
        console.error(err.message)
        return res.status(500).json("Server error")
    }
})

//Update a todo

app.put("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params, {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE id = $2", [description, id]);
        res.json("Todo updated");
    } catch (err) {
        console.error(err.message)
        return res.status(500).json("Server error")
    }
})

//Delete a todo
app.delete("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deletedTodo = await pool.query("DELETE FROM todo WHERE id = $1", [id]);
        res.json("Deleted todo");
    } catch (err) {
        console.error(err.message)
        return res.status(500).json("Server error")
    }
})

app.listen(5000, () => {
    console.log("Server running on 5000")
});