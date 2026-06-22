// Board columns definition
export const COLUMNS = [
  { id: 'backlog',    title: 'Backlog',      color: '#5e5c6e' },
  { id: 'todo',       title: 'To Do',        color: '#60a5fa' },
  { id: 'inprogress', title: 'In Progress',  color: '#fbbf24' },
  { id: 'review',     title: 'Review',       color: '#a78bfa' },
  { id: 'done',       title: 'Done',         color: '#4ade80' },
]

// Demo team members
export const USERS = [
  { id: 'u1', name: 'Arjun Mehta',  initials: 'AM', color: '#7c6af5', bg: '#1d1a35' },
  { id: 'u2', name: 'Priya Shah',   initials: 'PS', color: '#60a5fa', bg: '#0d1729' },
  { id: 'u3', name: 'Dev Patel',    initials: 'DP', color: '#4ade80', bg: '#0d2016' },
  { id: 'u4', name: 'Riya Joshi',   initials: 'RJ', color: '#f87171', bg: '#1f0d0d' },
]

// Tag → CSS class mapping
export const TAG_COLORS = {
  design:   'tag-design',
  frontend: 'tag-frontend',
  backend:  'tag-backend',
  bug:      'tag-bug',
  research: 'tag-research',
  api:      'tag-api',
}

// Project names
export const PROJECTS = ['TaskFlow Alpha', 'Marketing Site', 'Mobile App v2']

// LocalStorage keys
export const LS_KEYS = {
  TASKS:   'tf_tasks',
  SESSION: 'tf_session',
  USERS:   'tf_users',
}

// Priority levels
export const PRIORITY_LEVELS = [
  { value: 'high', label: 'High' },
  { value: 'med',  label: 'Medium' },
  { value: 'low',  label: 'Low' },
]
