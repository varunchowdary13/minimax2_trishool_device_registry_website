import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, authAPI } from '../lib/supabase'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Load user on mount (one-time check)
  useEffect(() => {
    async function loadUser() {
      setLoading(true)
      try {
        // Check if we have a token
        const token = localStorage.getItem('auth_token')
        if (!token) {
          setUser(null)
          return
        }

        // Verify the token with the backend
        const { user: verifiedUser } = await authAPI.verifyToken()
        setUser(verifiedUser)
      } catch (error) {
        console.error('Error verifying user:', error)
        // Token is invalid, clear it
        localStorage.removeItem('auth_token')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    loadUser()
  }, [])

  // Auth methods
  async function signIn(email: string, password: string) {
    try {
      const response = await authAPI.login(email, password)
      setUser(response.user)
      return { error: null }
    } catch (err: any) {
      console.error('Login error:', err)
      return { error: err.message || 'Login failed' }
    }
  }

  async function signOut() {
    try {
      await authAPI.logout()
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
