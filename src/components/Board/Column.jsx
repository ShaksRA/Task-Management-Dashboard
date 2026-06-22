import TaskCard      from '../Task/TaskCard'
import AddTaskForm   from '../Task/AddTaskForm'
import styles        from './Column.module.css'

export default function Column({
  column, tasks, isDragOver, draggingId,
  addingIn, onAddStart, onAddCancel, onAddTask,
  onEditTask, onDeleteTask,
  onDragOver, onDragLeave, onDrop,
  onDragStart, onDragEnd,
  onNewTask,
}) {
  return (
    <div
      className={styles.column}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.dot} style={{ background: column.color }} />
          <span className={styles.title}>{column.title}</span>
          <span className={styles.count}>{tasks.length}</span>
        </div>
        <button className={styles.addBtn} onClick={onAddStart} title="Quick add task">+</button>
      </div>

      {addingIn && (
        <AddTaskForm
          colId={column.id}
          onAdd={onAddTask}
          onCancel={onAddCancel}
        />
      )}

      <div className={`${styles.taskList} ${isDragOver ? styles.dragOver : ''}`}>
        {tasks.length === 0 && !addingIn && (
          <div className={styles.empty}>Drop tasks here</div>
        )}
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            isDragging={draggingId === task.id}
            onEdit={() => onEditTask(task)}
            onDelete={() => onDeleteTask(task.id)}
            onDragStart={onDragStart(task.id)}
            onDragEnd={onDragEnd}
          />
        ))}
      </div>
    </div>
  )
}
