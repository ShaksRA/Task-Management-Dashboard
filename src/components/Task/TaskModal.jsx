import { useState } from 'react'
import { COLUMNS, USERS, PRIORITY_LEVELS } from '../../data/constants'
import styles from './TaskModal.module.css'

export default function TaskModal({ task, onSave, onClose }) {
  const [form, setForm]         = useState({ ...task })
  const [tagInput, setTagInput] = useState((task.tags || []).join(', '))

  const update = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))

  const save = () => {
    const tags = tagInput
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter(Boolean)
    onSave({ ...form, tags })
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.head}>
          <h2 className={styles.title}>{task._new ? 'New Task' : 'Edit Task'}</h2>
          <button className={styles.close} onClick={onClose}>×</button>
        </div>

        <div className={styles.body}>
          {/* Title */}
          <div className={styles.field}>
            <label>Title</label>
            <input value={form.title} onChange={update('title')} placeholder="Task title…" />
          </div>

          {/* Description */}
          <div className={styles.field}>
            <label>Description</label>
            <textarea value={form.desc || ''} onChange={update('desc')} rows={3} placeholder="Add more context…" />
          </div>

          {/* Priority + Status */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Priority</label>
              <select value={form.priority} onChange={update('priority')}>
                {PRIORITY_LEVELS.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label>Status</label>
              <select value={form.column} onChange={update('column')}>
                {COLUMNS.map((c) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Assignee + Due date */}
          <div className={styles.row}>
            <div className={styles.field}>
              <label>Assignee</label>
              <select value={form.assignee} onChange={update('assignee')}>
                {USERS.map((u) => (
                  <option key={u.id} value={u.id}>{u.name}</option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label>Due Date</label>
              <input type="date" value={form.due || ''} onChange={update('due')} />
            </div>
          </div>

          {/* Tags */}
          <div className={styles.field}>
            <label>Tags <span className={styles.hint}>(comma-separated)</span></label>
            <input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              placeholder="design, frontend, api…"
            />
          </div>

          <div className={styles.actions}>
            <button className={styles.save} onClick={save}>
              {task._new ? 'Create Task' : 'Save Changes'}
            </button>
            <button className={styles.discard} onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}
