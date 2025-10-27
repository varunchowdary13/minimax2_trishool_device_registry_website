import React from 'react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/Navigation'

export default function DashboardPage() {
  const navigate = useNavigate()

  const handleRegisterDevice = () => {
    navigate('/register')
  }

  const handleDeregisterDevice = () => {
    navigate('/deregister')
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      {/* Page Header */}
      <div className="page-container pt-20">
        <div className="page-header text-center">
          <h1 className="text-display text-black mb-md">
            Device Management
          </h1>
          <p className="text-body-large text-medium-gray">
            System Active
          </p>
        </div>

        {/* Action Grid */}
        <div className="swiss-grid swiss-grid-2 max-w-4xl mx-auto">
          <div 
            className="card-dashboard"
            onClick={handleRegisterDevice}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleRegisterDevice()
              }
            }}
          >
            <div className="text-center">
              <h2 className="text-subhead text-black mb-md">
                Register Device
              </h2>
              <p className="text-body text-dark-gray">
                Register new TRISHOOL devices with IMEI validation and QR code scanning
              </p>
            </div>
            <div className="text-center mt-lg">
              <button className="btn-primary">
                REGISTER DEVICE
              </button>
            </div>
          </div>

          <div 
            className="card-dashboard"
            onClick={handleDeregisterDevice}
            tabIndex={0}
            role="button"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleDeregisterDevice()
              }
            }}
          >
            <div className="text-center">
              <h2 className="text-subhead text-black mb-md">
                Deregister Device
              </h2>
              <p className="text-body text-dark-gray">
                Search and remove devices from the active registry
              </p>
            </div>
            <div className="text-center mt-lg">
              <button className="btn-primary">
                DEREGISTER DEVICE
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-caption text-medium-gray">
            TRISHOOL Manufacturing Portal v1.0
          </p>
        </div>
      </div>
    </div>
  )
}
