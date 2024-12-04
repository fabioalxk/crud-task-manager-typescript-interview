import express from "express";
const app = express();
app.use(express.json());
let tasks = [];

app.get("/", (req, res) => {
  const name = process.env.NAME || "World";
  res.send(`Hello ${name}!`);
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const { id, title, completed } = req.body;
  if (!id || !title || typeof completed !== "boolean") {
    return res.status(400).json({ error: "Invalid data" });
  }

  const newTask = { id, title, completed };
  tasks.push(newTask);

  return res.json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const { title, completed } = req.body;

  if (!title || typeof completed !== "boolean") {
    return res.status(400).json({ error: "Invalid data" });
  }

  const taskIndex = tasks.findIndex((task) => task.id === parseInt(taskId));

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Task not found" });
  }
  tasks[taskIndex].title = title;
  tasks[taskIndex].completed = completed;

  return res.json(tasks[taskIndex]);
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(taskId));

  if (taskIndex === -1) {
    return res.status(404).json({ error: "Didn't find task" });
  }

  tasks.splice(taskIndex, 1);
  return res.sendStatus(204);
});

const port = parseInt(process.env.PORT || "3000");
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
