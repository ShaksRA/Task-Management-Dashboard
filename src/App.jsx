import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import AuthScreen from './components/Auth/AuthScreen'
import Board from './components/Board/Board'
import Notification from './components/UI/Notification'

function App() {
  const { user, login, logout } = useAuth()
  const [notification, setNotification] = useState('')

  const notify = (msg) => {
    setNotification(msg)
    setTimeout(() => setNotification(''), 2500)
  }

  if (!user) {
    return <AuthScreen onLogin={(u) => { login(u); notify(`Welcome, ${u.name}!`) }} />
  }

  return (
    <>
      <Board user={user} onLogout={logout} notify={notify} />
      {notification && <Notification msg={notification} onDone={() => setNotification('')} />}
    </>
  )
}

export default App
