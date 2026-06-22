import { USERS } from '../../data/constants'
import styles from './Toolbar.module.css'

export default function Toolbar({
  search, onSearch,
  filterPrio, onFilterPrio,
  filterUser, onFilterUser,
  counts,
}) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.searchWrap}>
        <span className={styles.searchIcon}>⌕</span>
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search tasks…"
        />
      </div>

      <select className={styles.select} value={filterPrio} onChange={(e) => onFilterPrio(e.target.value)}>
        <option value="all">All priorities</option>
        <option value="high">High</option>
        <option value="med">Medium</option>
        <option value="low">Low</option>
      </select>

      <select className={styles.select} value={filterUser} onChange={(e) => onFilterUser(e.target.value)}>
        <option value="all">All members</option>
        {USERS.map((u) => <option key={u.id} value={u.id}>{u.name}</option>)}
      </select>

      <div className={styles.stats}>
        <span className={styles.chip}>
          <span className={styles.dot} style={{ background: '#60a5fa' }} />
          {counts.todo ?? 0} todo
        </span>
        <span className={styles.chip}>
          <span className={styles.dot} style={{ background: '#fbbf24' }} />
          {counts.inprogress ?? 0} active
        </span>
        <span className={styles.chip}>
          <span className={styles.dot} style={{ background: '#4ade80' }} />
          {counts.done ?? 0} done
        </span>
      </div>
    </div>
  )
}
