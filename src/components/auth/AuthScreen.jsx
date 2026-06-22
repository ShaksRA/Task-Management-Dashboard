import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import styles from './AuthScreen.module.css'

export default function AuthScreen({ onLogin }) {
  const { register, signIn } = useAuth()
  const [mode, setMode]     = useState('login') // 'login' | 'signup'
  const [form, setForm]     = useState({ name: '', email: '', password: '' })
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const update = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }))

  const handleSubmit = async () => {
    setError('')
    if (!form.email || !form.password) { setError('Please fill all fields.'); return }
    if (mode === 'signup' && !form.name)  { setError('Enter your full name.'); return }

    setLoading(true)
    // Simulate async API latency
    await new Promise((r) => setTimeout(r, 400))

    const result = mode === 'signup'
      ? register({ name: form.name, email: form.email, password: form.password })
      : signIn({ email: form.email, password: form.password })

    setLoading(false)
    if (!result.success) { setError(result.error); return }

    onLogin({ name: form.name || form.email.split('@')[0], email: form.email })
  }

  const switchMode = () => { setMode((m) => m === 'login' ? 'signup' : 'login'); setError('') }

  return (
    <div className={styles.wrap}>
      <div className={styles.card}>
        <div className={styles.logo}>
          <div className={styles.logoIcon}>⚡</div>
          <span className={styles.logoText}>TaskFlow</span>
        </div>

        <h1 className={styles.title}>{mode === 'login' ? 'Welcome back' : 'Create account'}</h1>
        <p className={styles.sub}>{mode === 'login' ? 'Sign in to your workspace' : 'Get started for free'}</p>

        {mode === 'signup' && (
          <div className={styles.field}>
            <label>Full Name</label>
            <input value={form.name} onChange={update('name')} placeholder="Arjun Mehta" />
          </div>
        )}

        <div className={styles.field}>
          <label>Email</label>
          <input type="email" value={form.email} onChange={update('email')} placeholder="you@example.com" />
        </div>

        <div className={styles.field}>
          <label>Password</label>
          <input
            type="password"
            value={form.password}
            onChange={update('password')}
            placeholder="••••••••"
            onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
          />
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.btn} onClick={handleSubmit} disabled={loading}>
          {loading ? 'Please wait…' : mode === 'login' ? 'Sign In →' : 'Create Account →'}
        </button>

        <p className={styles.switchText}>
          {mode === 'login' ? 'No account? ' : 'Have an account? '}
          <span onClick={switchMode}>{mode === 'login' ? 'Sign up free' : 'Sign in'}</span>
        </p>

        <p className={styles.hint}>Demo: register with any email + password to explore.</p>
      </div>
    </div>
  )
}
