import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Navigation from '../components/Navigation'

export default function LoginPage() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const { error } = await signIn(email, password)
      if (error) {
        setError('Invalid email or password')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      setError('An error occurred during login')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light">
      <div className="w-full max-w-sm">
        {/* Logo Block */}
        <div className="text-center mb-16">
          <img 
            src="/trishool-logo.png" 
            alt="TRISHOOL" 
            className="h-12 mx-auto mb-16"
          />
        </div>

        {/* Login Form */}
        <div className="card">
          <h1 className="text-display text-black text-center mb-sm">
            TRISHOOL Portal
          </h1>
          <p className="text-body text-dark-gray text-center mb-lg">
            Device Registration System
          </p>

          <form onSubmit={handleSubmit} className="space-y-md">
            <div>
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field w-full"
                placeholder="Enter your email"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field w-full"
                placeholder="Enter your password"
                required
                disabled={loading}
              />
            </div>

            {error && (
              <div className="validation-message error">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="btn-primary w-full"
              disabled={loading || !email || !password}
            >
              {loading ? 'PROCESSING...' : 'LOGIN'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-lg p-md bg-surface-gray border border-border-gray">
            <p className="text-small text-medium-gray text-center mb-sm">
              Demo Credentials:
            </p>
            <p className="text-small text-dark-gray font-mono text-center">
              admin@trishool.com / admin123
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-caption text-medium-gray">
            TRISHOOL Device Registration Portal v1.0
          </p>
        </div>
      </div>
    </div>
  )
}
