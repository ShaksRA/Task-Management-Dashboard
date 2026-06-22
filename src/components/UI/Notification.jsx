import { useEffect } from 'react'
import styles from './Notification.module.css'

export default function Notification({ msg, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2500)
    return () => clearTimeout(t)
  }, [onDone])

  return <div className={styles.notif}>✓ {msg}</div>
}
