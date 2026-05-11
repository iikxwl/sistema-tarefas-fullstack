const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

let tasks = [
  { id: 1, title: "Estudar rotas com Express", done: false }
];

app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  if (!title || title.trim().length < 3) {
    return res.status(400).json({ message: "O título precisa ter pelo menos 3 caracteres." });
  }

  const newTask = {
    id: tasks.length + 1,
    title: title.trim(),
    done: false
  };

  tasks.push(newTask);
  return res.status(201).json(newTask);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
