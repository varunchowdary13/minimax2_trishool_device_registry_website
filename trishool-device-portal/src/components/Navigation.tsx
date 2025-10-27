import React from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useNavigate, useLocation } from 'react-router-dom'

interface NavigationProps {
  showBackButton?: boolean
}

export default function Navigation({ showBackButton = false }: NavigationProps) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  const handleBackClick = () => {
    navigate('/dashboard')
  }

  return (
    <nav className="bg-white border-b border-border-gray h-16 fixed top-0 left-0 right-0 z-10">
      <div className="page-container h-full flex items-center justify-between">
        <div className="flex items-center space-x-lg">
          {showBackButton && (
            <button
              onClick={handleBackClick}
              className="btn-secondary text-sm px-sm"
            >
              BACK
            </button>
          )}
          
          <img 
            src="/trishool-logo.png" 
            alt="TRISHOOL" 
            className="h-8 w-auto"
          />
        </div>

        <div className="flex items-center space-x-lg">
          <div className="text-small text-medium-gray">
            {user?.email || 'User'}
          </div>
          
          <button
            onClick={handleSignOut}
            className="btn-secondary text-sm px-sm"
          >
            LOGOUT
          </button>
        </div>
      </div>
    </nav>
  )
}
