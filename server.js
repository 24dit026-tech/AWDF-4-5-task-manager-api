const express = require("express");

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());

// Logging Middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toLocaleString()}`);
  next();
});

// In-memory Task Array
let tasks = [
  {
    id: 1,
    title: "Complete React Practical",
    completed: false,
  },
];

// Home Route
app.get("/", (req, res) => {
  res.send("Task Manager API is Running!");
});

// =========================
// GET - Read All Tasks
// =========================
app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});

// =========================
// POST - Create Task
// =========================
app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// =========================
// PUT - Update Task
// =========================
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  task.title = req.body.title;
  task.completed = req.body.completed;

  res.status(200).json(task);
});

// =========================
// DELETE - Delete Task
// =========================
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const index = tasks.findIndex((t) => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Task not found",
    });
  }

  tasks.splice(index, 1);

  res.status(200).json({
    message: "Task deleted successfully",
  });
});

// =========================
// Global Error Handler
// =========================
app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    error: "Something went wrong!",
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});