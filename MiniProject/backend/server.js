const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Task = require('./models/Task')

const app = express()

app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/taskmanager')
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch(err => console.log('MongoDB Error:', err))

// Home route
app.get('/', (req, res) => {
  res.send('Task Manager Backend is Running!')
})

// Get all tasks
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find()
  res.json(tasks)
})

// Add a task
app.post('/tasks', async (req, res) => {
  const newTask = new Task({
    title: req.body.title
  })

  await newTask.save()
  res.json(newTask)
})

// Update a task
app.put('/tasks/:id', async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  )

  res.json(updatedTask)
})

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id)
  res.json({ message: 'Task deleted successfully!' })
})

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000')
})