import { PROJECTS } from '../../data/constants'
import styles from './Header.module.css'

export default function Header({ user, project, onProjectChange, onNewTask, onLogout, onReset }) {
  const initials = user?.name
    ? user.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()
    : 'U'

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>⚡</div>
          TaskFlow
        </div>
        <select
          className={styles.projectSelect}
          value={project}
          onChange={(e) => onProjectChange(e.target.value)}
        >
          {PROJECTS.map((p) => <option key={p}>{p}</option>)}
        </select>
      </div>

      <div className={styles.right}>
        <div className={styles.syncBadge}>
          <div className={styles.syncDot} />
          <span>Live</span>
        </div>

        <button className={styles.btnGhost} onClick={onReset} title="Reset board to demo data">
          ↺ Reset
        </button>

        <button className={styles.btnAccent} onClick={onNewTask}>
          + New Task
        </button>

        <div className={styles.avatar} title={user?.name}>{initials}</div>

        <button className={styles.btnGhost} onClick={onLogout}>Sign out</button>
      </div>
    </header>
  )
}
