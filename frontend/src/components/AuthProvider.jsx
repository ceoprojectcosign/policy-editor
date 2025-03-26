import { createContext, useContext } from 'react'

// Simulate a different user per browser tab
const randomNames = ['Emily', 'Alex', 'Jordan', 'Taylor', 'Morgan']
const randomColors = ['#f87171', '#34d399', '#60a5fa', '#fbbf24', '#a78bfa']

const user = {
  name: randomNames[Math.floor(Math.random() * randomNames.length)],
  color: randomColors[Math.floor(Math.random() * randomColors.length)],
}

const AuthContext = createContext(user)

export const useUser = () => useContext(AuthContext)

const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
