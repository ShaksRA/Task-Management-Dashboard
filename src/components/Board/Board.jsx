import { useState } from 'react'
import { useTasks }    from '../../hooks/useTasks'
import { useDragDrop } from '../../hooks/useDragDrop'
import { COLUMNS, PROJECTS, USERS } from '../../data/constants'
import Header    from './Header'
import Toolbar   from './Toolbar'
import Column    from './Column'
import TaskModal from '../Task/TaskModal'
import styles    from './Board.module.css'

export default function Board({ user, onLogout, notify }) {
  const { tasks, createTask, updateTask, deleteTask, moveTask, resetBoard } = useTasks()
  const { draggingId, overColumnId, handleDragStart, handleDragEnd,
          handleDragOver, handleDragLeave, handleDrop } = useDragDrop(
    (id, colId) => {
      moveTask(id, colId)
      notify(`Moved to ${COLUMNS.find((c) => c.id === colId)?.title}`)
    }
  )

  const [modalTask, setModalTask]   = useState(null)  // null = closed
  const [addingInCol, setAddingInCol] = useState(null)
  const [search, setSearch]         = useState('')
  const [filterPrio, setFilterPrio] = useState('all')
  const [filterUser, setFilterUser] = useState('all')
  const [project, setProject]       = useState(PROJECTS[0])

  // --- filtered view ---
  const filtered = tasks.filter((t) => {
    const q = search.toLowerCase()
    if (q && !t.title.toLowerCase().includes(q) && !(t.desc || '').toLowerCase().includes(q)) return false
    if (filterPrio !== 'all' && t.priority !== filterPrio) return false
    if (filterUser !== 'all' && t.assignee !== filterUser) return false
    return true
  })

  // --- column counts (always from all tasks, not filtered) ---
  const counts = COLUMNS.reduce((acc, c) => {
    acc[c.id] = tasks.filter((t) => t.column === c.id).length
    return acc
  }, {})

  // --- task CRUD handlers ---
  const handleSaveModal = (data) => {
    if (data._new) {
      const { _new, ...clean } = data
      createTask(clean)
      notify('Task created')
    } else {
      updateTask(data.id, data)
      notify('Task updated')
    }
    setModalTask(null)
  }

  const handleDelete = (id) => {
    deleteTask(id)
    notify('Task deleted')
  }

  const openNewTask = (colId = 'todo') => {
    setModalTask({
      _new: true,
      id: `t_${Date.now()}`,
      title: '',
      desc: '',
      column: colId,
      priority: 'med',
      tags: [],
      assignee: user?.id || USERS[0].id,
      due: '',
      created: Date.now(),
    })
  }

  const handleReset = () => {
    resetBoard()
    notify('Board reset to demo data')
  }

  return (
    <div className={styles.app}>
      <Header
        user={user}
        project={project}
        onProjectChange={setProject}
        onNewTask={() => openNewTask()}
        onLogout={onLogout}
        onReset={handleReset}
      />

      <Toolbar
        search={search}
        onSearch={setSearch}
        filterPrio={filterPrio}
        onFilterPrio={setFilterPrio}
        filterUser={filterUser}
        onFilterUser={setFilterUser}
        counts={counts}
      />

      <main className={styles.boardArea}>
        {COLUMNS.map((col) => (
          <Column
            key={col.id}
            column={col}
            tasks={filtered.filter((t) => t.column === col.id)}
            isDragOver={overColumnId === col.id}
            draggingId={draggingId}
            addingIn={addingInCol === col.id}
            onAddStart={() => setAddingInCol(col.id)}
            onAddCancel={() => setAddingInCol(null)}
            onAddTask={(data) => { createTask(data); setAddingInCol(null); notify('Task created') }}
            onEditTask={setModalTask}
            onDeleteTask={handleDelete}
            onDragOver={handleDragOver(col.id)}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop(col.id)}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onNewTask={() => openNewTask(col.id)}
          />
        ))}
      </main>

      {modalTask && (
        <TaskModal
          task={modalTask}
          onSave={handleSaveModal}
          onClose={() => setModalTask(null)}
        />
      )}
    </div>
  )
}
