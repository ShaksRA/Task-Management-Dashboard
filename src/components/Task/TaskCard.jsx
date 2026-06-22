import { USERS, TAG_COLORS } from '../../data/constants'
import { formatDue }          from '../../utils/dateHelpers'
import styles                  from './TaskCard.module.css'

export default function TaskCard({ task, isDragging, onEdit, onDelete, onDragStart, onDragEnd }) {
  const assignee = USERS.find((u) => u.id === task.assignee)
  const due      = formatDue(task.due)

  return (
    <div
      className={`${styles.card} ${isDragging ? styles.dragging : ''}`}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {/* Priority + Title */}
      <div className={styles.top}>
        <span className={styles.title}>{task.title}</span>
        <span className={`${styles.prio} ${styles[`prio_${task.priority}`]}`}>
          {task.priority}
        </span>
      </div>

      {/* Description */}
      {task.desc && (
        <p className={styles.desc}>
          {task.desc.length > 85 ? task.desc.slice(0, 85) + '…' : task.desc}
        </p>
      )}

      {/* Tags */}
      {task.tags?.length > 0 && (
        <div className={styles.tags}>
          {task.tags.map((t) => (
            <span key={t} className={`${styles.tag} ${TAG_COLORS[t] ? styles[TAG_COLORS[t]] : styles.tag_default}`}>
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Footer: assignee + due */}
      <div className={styles.footer}>
        <div className={styles.assignee}>
          {assignee && (
            <>
              <div
                className={styles.avatar}
                style={{ background: assignee.bg, color: assignee.color }}
              >
                {assignee.initials}
              </div>
              <span>{assignee.name.split(' ')[0]}</span>
            </>
          )}
        </div>
        {due && (
          <span className={`${styles.due} ${due.overdue ? styles.overdue : ''}`}>
            {due.label}
          </span>
        )}
      </div>

      {/* Hover actions */}
      <div className={styles.actions}>
        <button className={styles.actionBtn} onClick={(e) => { e.stopPropagation(); onEdit() }}>✎</button>
        <button className={`${styles.actionBtn} ${styles.del}`} onClick={(e) => { e.stopPropagation(); onDelete() }}>✕</button>
      </div>
    </div>
  )
}
