import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Html5Qrcode } from 'html5-qrcode'
import Navigation from '../components/Navigation'
import { validateIMEI, deviceAPI } from '../lib/supabase'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [deviceId, setDeviceId] = useState('')
  const [deviceName, setDeviceName] = useState('trishool')
  const [deviceVersion, setDeviceVersion] = useState('version one')
  const [imeiValid, setImeiValid] = useState(false)
  const [imeiError, setImeiError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showScanner, setShowScanner] = useState(false)
  const [scanning, setScanning] = useState(false)
  
  const scannerRef = useRef<Html5Qrcode | null>(null)

  const handleDeviceIdChange = (value: string) => {
    setDeviceId(value)
    if (value.trim() === '') {
      setImeiValid(false)
      setImeiError('')
      return
    }
    
    if (validateIMEI(value)) {
      setImeiValid(true)
      setImeiError('')
    } else {
      setImeiValid(false)
      setImeiError('Invalid IMEI format. Must be: deviceid-A2025001')
    }
  }

  const handleScanQRCode = async () => {
    setShowScanner(true)
    setScanning(true)
    
    try {
      // Small delay to ensure DOM is ready
      await new Promise(resolve => setTimeout(resolve, 100))
      
      const html5QrCode = new Html5Qrcode("qr-reader")
      scannerRef.current = html5QrCode

      const config = { 
        fps: 10, 
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      }

      await html5QrCode.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          // Success callback
          handleDeviceIdChange(decodedText)
          stopScanner()
        },
        (errorMessage) => {
          // Error callback - ignore continuous errors
          console.log('QR scan error:', errorMessage)
        }
      )
    } catch (err) {
      console.error('QR Scanner error:', err)
      setImeiError('Failed to access camera. Please enable camera permissions.')
      setShowScanner(false)
      setScanning(false)
    }
  }

  const stopScanner = async () => {
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop()
        scannerRef.current = null
      } catch (err) {
        console.error('Error stopping scanner:', err)
      }
    }
    setShowScanner(false)
    setScanning(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!imeiValid) {
      return
    }

    setLoading(true)
    
    try {
      const response = await deviceAPI.registerDevice({
        deviceId: deviceId.trim(),
        device_name: deviceName,
        device_version: deviceVersion,
        isLinked: false,
        linkedAt: null,
        linkedToUser: null
      })

      if (!response.data) {
        throw new Error('No data returned from registration')
      }

      // Success - reset form and redirect
      setDeviceId('')
      setImeiValid(false)
      setImeiError('')
      navigate('/dashboard')
      
    } catch (err: any) {
      setImeiError(`Registration failed: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation showBackButton />
      
      <div className="page-container">
        <div className="page-header">
          <h1 className="text-headline text-black">
            Device Registration
          </h1>
          <p className="text-body text-medium-gray mt-sm">
            Register new TRISHOOL devices with validated IMEI format
          </p>
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit} className="space-y-lg">
            {/* Device Information Section */}
            <div className="space-y-md">
              <h2 className="text-subhead text-black">
                Device Information
              </h2>

              <div>
                <label htmlFor="deviceId" className="form-label required">
                  Device ID (IMEI)
                </label>
                <div className="flex space-x-sm">
                  <input
                    type="text"
                    id="deviceId"
                    value={deviceId}
                    onChange={(e) => handleDeviceIdChange(e.target.value)}
                    className={`input-field flex-1 ${
                      imeiValid ? 'success' : imeiError ? 'error' : ''
                    }`}
                    placeholder="deviceid-A2025001"
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={handleScanQRCode}
                    className="btn-secondary whitespace-nowrap px-lg"
                    disabled={loading || scanning}
                  >
                    SCAN QR CODE
                  </button>
                </div>
                {imeiError && (
                  <div className="validation-message error">
                    {imeiError}
                  </div>
                )}
                {imeiValid && !imeiError && (
                  <div className="validation-message success">
                    Valid IMEI format
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="deviceName" className="form-label required">
                  Device Name
                </label>
                <select
                  id="deviceName"
                  value={deviceName}
                  onChange={(e) => setDeviceName(e.target.value)}
                  className="input-field w-full"
                  disabled={loading}
                  required
                >
                  <option value="trishool">trishool</option>
                </select>
              </div>

              <div>
                <label htmlFor="deviceVersion" className="form-label required">
                  Device Version
                </label>
                <select
                  id="deviceVersion"
                  value={deviceVersion}
                  onChange={(e) => setDeviceVersion(e.target.value)}
                  className="input-field w-full"
                  disabled={loading}
                  required
                >
                  <option value="version one">version one</option>
                </select>
              </div>
            </div>

            {/* Registration Section */}
            <div className="space-y-sm pt-lg border-t border-border-gray">
              <p className="text-small text-medium-gray">
                All fields are required. Device ID must follow the specified IMEI format.
              </p>
              
              <button
                type="submit"
                className="btn-primary w-full"
                disabled={!imeiValid || loading}
              >
                {loading ? 'PROCESSING...' : 'REGISTER DEVICE'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* QR Scanner Modal */}
      {showScanner && (
        <div className="qr-scanner-overlay" onClick={stopScanner}>
          <div className="qr-scanner-container" onClick={(e) => e.stopPropagation()}>
            <div className="bg-white p-lg rounded-none max-w-sm mx-auto">
              <h3 className="text-subhead text-black text-center mb-md">
                Scan QR Code
              </h3>
              <p className="text-body text-medium-gray text-center mb-lg">
                Position the QR code within the viewfinder
              </p>
              
              <div id="qr-reader" className="w-full h-64 bg-black"></div>
              
              <div className="text-center mt-lg">
                <button
                  onClick={stopScanner}
                  className="btn-secondary w-full"
                >
                  CANCEL
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
