import { useState, useRef, useEffect } from 'react'
import { USERS } from '../../data/constants'
import styles from './AddTaskForm.module.css'

export default function AddTaskForm({ colId, onAdd, onCancel }) {
  const [title, setTitle]       = useState('')
  const [desc, setDesc]         = useState('')
  const [priority, setPriority] = useState('med')
  const [assignee, setAssignee] = useState(USERS[0].id)
  const inputRef = useRef()

  useEffect(() => { inputRef.current?.focus() }, [])

  const submit = () => {
    if (!title.trim()) return
    onAdd({
      id: `t_${Date.now()}`,
      title: title.trim(),
      desc,
      column: colId,
      priority,
      tags: [],
      assignee,
      due: '',
      created: Date.now(),
    })
  }

  return (
    <div className={styles.form}>
      <input
        ref={inputRef}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title…"
        onKeyDown={(e) => {
          if (e.key === 'Enter') submit()
          if (e.key === 'Escape') onCancel()
        }}
      />
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Description (optional)"
        rows={2}
      />
      <div className={styles.row}>
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="high">High priority</option>
          <option value="med">Med priority</option>
          <option value="low">Low priority</option>
        </select>
        <select value={assignee} onChange={(e) => setAssignee(e.target.value)}>
          {USERS.map((u) => (
            <option key={u.id} value={u.id}>{u.name.split(' ')[0]}</option>
          ))}
        </select>
      </div>
      <div className={styles.btns}>
        <button className={styles.confirm} onClick={submit}>Add Task</button>
        <button className={styles.cancel}  onClick={onCancel}>Cancel</button>
      </div>
    </div>
  )
}
