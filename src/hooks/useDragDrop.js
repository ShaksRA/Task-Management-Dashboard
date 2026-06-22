import { useState } from 'react'

/**
 * useDragDrop — manages HTML5 drag-and-drop state for the Kanban board.
 * Returns handlers to attach to draggable cards and droppable columns.
 */
export function useDragDrop(onMove) {
  const [draggingId, setDraggingId]   = useState(null)
  const [overColumnId, setOverColumnId] = useState(null)

  const handleDragStart = (taskId) => (e) => {
    e.dataTransfer.effectAllowed = 'move'
    setDraggingId(taskId)
  }

  const handleDragEnd = () => {
    setDraggingId(null)
    setOverColumnId(null)
  }

  const handleDragOver = (columnId) => (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setOverColumnId(columnId)
  }

  const handleDragLeave = () => {
    setOverColumnId(null)
  }

  const handleDrop = (columnId) => (e) => {
    e.preventDefault()
    if (draggingId) {
      onMove(draggingId, columnId)
    }
    setDraggingId(null)
    setOverColumnId(null)
  }

  return {
    draggingId,
    overColumnId,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
  }
}
