import { useState, useEffect } from 'react'
import { getItem, setItem } from '../utils/storage'
import { LS_KEYS } from '../data/constants'
import seedTasks from '../data/seedTasks'

/**
 * useTasks — full CRUD for tasks with automatic LocalStorage sync.
 * Simulates REST API behaviour (create, read, update, delete, move).
 */
export function useTasks() {
  const [tasks, setTasks] = useState(() => getItem(LS_KEYS.TASKS, seedTasks))

  // Sync to localStorage whenever tasks change (simulates API write-back)
  useEffect(() => {
    setItem(LS_KEYS.TASKS, tasks)
  }, [tasks])

  /** Create a new task */
  const createTask = (taskData) => {
    const newTask = {
      id: `t_${Date.now()}`,
      created: Date.now(),
      tags: [],
      due: '',
      desc: '',
      ...taskData,
    }
    setTasks((prev) => [newTask, ...prev])
    return newTask
  }

  /** Update an existing task by id */
  const updateTask = (id, changes) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...changes, updatedAt: Date.now() } : t))
    )
  }

  /** Delete a task by id */
  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  /** Move a task to a different column (drag-and-drop) */
  const moveTask = (id, targetColumnId) => {
    updateTask(id, { column: targetColumnId })
  }

  /** Reset board to seed data */
  const resetBoard = () => {
    setTasks(seedTasks)
  }

  return { tasks, createTask, updateTask, deleteTask, moveTask, resetBoard }
}
