// /src/components/AuthPanel.jsx
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthPanel = () => {
  const [session, setSession] = useState(null)
  const [email, setEmail] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setSession(session))
    return () => listener.subscription.unsubscribe()
  }, [])

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) alert(error.message)
    else alert('Check your email for a login link')
  }

  const handleLogout = async () => supabase.auth.signOut()

  return session ? (
    <div className="flex justify-between">
      <span>{session.user.email}</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  ) : (
    <div className="flex gap-2">
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" className="border p-1" />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}

export default AuthPanel