const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./models/Todo');

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = 'mongodb://127.0.0.1:27017/todo';

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log(`db connected`);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(cors());
//create todo
app.post('/todos', async (req, res) => {
  try {
    const todo = new Todo(req.body);
    console.log(todo);
    await todo.save();
    res.status(201).send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.send(todos);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a todo (including marking it as completed)
app.patch('/todos/:id', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['text', 'completed'];
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!todo) {
      return res.status(404).send();
    }

    res.send(todo);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a todo
app.delete('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);

    if (!todo) {
      return res.status(404).send();
    }

    res.send(todo);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
