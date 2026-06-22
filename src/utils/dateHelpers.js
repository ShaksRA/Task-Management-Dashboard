/**
 * Formats a due date string into a human-readable label.
 * Returns { label: string, overdue: boolean } or null.
 */
export function formatDue(dateStr) {
  if (!dateStr) return null

  const due = new Date(dateStr)
  const now = new Date()
  due.setHours(0, 0, 0, 0)
  now.setHours(0, 0, 0, 0)

  const diffDays = Math.round((due - now) / 86_400_000)

  if (diffDays < 0)  return { label: `${Math.abs(diffDays)}d ago`, overdue: true }
  if (diffDays === 0) return { label: 'Today',     overdue: false }
  if (diffDays === 1) return { label: 'Tomorrow',  overdue: false }
  if (diffDays <= 7)  return { label: `${diffDays}d left`, overdue: false }

  return { label: dateStr, overdue: false }
}

/**
 * Returns an ISO date string for today (YYYY-MM-DD).
 */
export function todayISO() {
  return new Date().toISOString().split('T')[0]
}
