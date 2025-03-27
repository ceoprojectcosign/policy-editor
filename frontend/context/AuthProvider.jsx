import { createContext, useContext } from 'react'

const AuthContext = createContext({ name: 'Emily', color: '#4f46e5' }) // Example

export const AuthProvider = ({ children }) => (
  <AuthContext.Provider value={{ name: 'Emily', color: '#4f46e5' }}>
    {children}
  </AuthContext.Provider>
)

export const useUser = () => useContext(AuthContext)
