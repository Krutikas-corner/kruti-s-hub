import { useState, useEffect } from 'react'
import './App.css'

const API = 'http://localhost:5000/tasks'

function App() {
  const [task, setTask] = useState('')
  const [editId, setEditId] = useState(null)
  const [tasks, setTasks] = useState([])

  // Get tasks from MongoDB
  useEffect(() => {
    fetch(API)
      .then(res => res.json())
      .then(data => setTasks(data))
      .catch(() => alert('Cannot connect to backend!'))
  }, [])

  // Add or Update Task
  async function addTask() {
    if (task.trim() === '') {
      alert('Please enter a task!')
      return
    }

    try {
      if (editId !== null) {
        const res = await fetch(`${API}/${editId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title: task })
        })

        const updatedTask = await res.json()

        setTasks(tasks.map(item =>
          item._id === editId ? updatedTask : item
        ))

        setEditId(null)
      } else {
        const res = await fetch(API, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ title: task })
        })

        const newTask = await res.json()
        setTasks([...tasks, newTask])
      }

      setTask('')
    } catch {
      alert('Something went wrong!')
    }
  }

  // Edit Task
  function editTask(item) {
    setTask(item.title)
    setEditId(item._id)
  }

  // Delete Task
  async function deleteTask(id) {
    try {
      await fetch(`${API}/${id}`, {
        method: 'DELETE'
      })

      setTasks(tasks.filter(item => item._id !== id))

      if (editId === id) {
        setEditId(null)
        setTask('')
      }
    } catch {
      alert('Could not delete task!')
    }
  }

  // Mark Task as Completed
  async function toggleTask(item) {
    try {
      const res = await fetch(`${API}/${item._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          completed: !item.completed
        })
      })

      const updatedTask = await res.json()

      setTasks(tasks.map(taskItem =>
        taskItem._id === item._id ? updatedTask : taskItem
      ))
    } catch {
      alert('Could not update task!')
    }
  }

  // Calculate Task Statistics
  const completedCount = tasks.filter(
    item => item.completed
  ).length

  const pendingCount = tasks.length - completedCount

  return (
    <div className="container">

      <header>
        <h1>Task Manager</h1>
        <p>Organize your day and get things done!</p>
      </header>

      <div className="stats">

        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p>{tasks.length}</p>
        </div>

        <div className="stat-card">
          <h3>Pending</h3>
          <p>{pendingCount}</p>
        </div>

        <div className="stat-card">
          <h3>Completed</h3>
          <p>{completedCount}</p>
        </div>

      </div>

      <div className="task-box">

        <h2>
          {editId !== null ? 'Edit Task' : 'Add New Task'}
        </h2>

        <input
          type="text"
          placeholder="Enter your task..."
          value={task}
          onChange={e => setTask(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              addTask()
            }
          }}
        />

        <button className="add-btn" onClick={addTask}>
          {editId !== null ? 'Update Task' : '+ Add Task'}
        </button>

        {editId !== null && (
          <button
            className="cancel-btn"
            onClick={() => {
              setEditId(null)
              setTask('')
            }}
          >
            Cancel
          </button>
        )}

      </div>

      <div className="task-list">

        <h2>My Tasks</h2>

        {tasks.length === 0 ? (
          <p className="empty-message">
            No tasks yet. Add your first task!
          </p>
        ) : (

          tasks.map(item => (

            <div className="task-item" key={item._id}>

              <label className="task-info">

                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTask(item)}
                />

                <span
                  className={item.completed ? 'completed' : ''}
                >
                  {item.title}
                </span>

              </label>

              <div className="task-actions">

                <button
                  className="edit-btn"
                  onClick={() => editTask(item)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(item._id)}
                >
                  Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  )
}

export default App