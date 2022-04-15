const express = require("express");
const app = express(); //res body
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

//routes//

//create a todo
app.post("/create-todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO stack (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
    // console.log(newTodo);
  } catch (error) {
    console.log({ message: error.message });
  }
});

//get all todo
app.get("/get-all-todos", async (req, res) => {
  try {
    const getAllTodos = await pool.query("SELECT * FROM stack");
    res.json(getAllTodos.rows);
  } catch (error) {
    console.log({ message: error.message });
  }
});

//get a todo
app.get("/get-todo-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getTodoById = await pool.query(
      "SELECT * FROM stack WHERE todo_id = $1",
      [id]
    );
    res.json(getTodoById.rows[0]);
  } catch (error) {
    console.log({ message: error.message });
  }
});

//update a todo
app.patch("/update-todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodoById = await pool.query(
      "UPDATE stack SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("Todos was updated!");
  } catch (error) {
    console.log({ message: error.message });
  }
});

//delete a todo
app.delete("/delete-todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const delTodoById = await pool.query(
      "DELETE FROM stack WHERE todo_id = $1",
      [id]
    );
    res.json("Delete was done!");
  } catch (error) {
    console.log({ message: error.message });
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});
