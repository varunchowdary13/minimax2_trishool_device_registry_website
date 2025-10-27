import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navigation from '../components/Navigation'
import { Device, deviceAPI } from '../lib/supabase'

export default function DeregisterPage() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [devices, setDevices] = useState<Device[]>([])
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([])
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)
  const [loading, setLoading] = useState(false)
  const [deregistering, setDeregistering] = useState(false)
  const [error, setError] = useState('')

  // Load all devices on component mount
  useEffect(() => {
    loadDevices()
  }, [])

  // Filter devices based on search term
  useEffect(() => {
    const performSearch = async () => {
      if (searchTerm.trim() === '') {
        setFilteredDevices([])
        setSelectedDevice(null)
        return
      }

      try {
        const response = await deviceAPI.searchDevices(searchTerm.trim())
        setFilteredDevices(response.data || [])
      } catch (err: any) {
        console.error('Search failed:', err.message)
        setFilteredDevices([])
      }
    }

    // Debounce search
    const timeoutId = setTimeout(performSearch, 300)
    return () => clearTimeout(timeoutId)
  }, [searchTerm])

  const loadDevices = async () => {
    setLoading(true)
    try {
      const response = await deviceAPI.getDevices()
      setDevices(response.data || [])
    } catch (err: any) {
      setError(`Failed to load devices: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  const handleDeviceSelect = (device: Device) => {
    setSelectedDevice(device)
    setSearchTerm(device.deviceId)
    setFilteredDevices([])
    setError('')
  }

  const handleDeregister = async () => {
    if (!selectedDevice) return

    setDeregistering(true)
    setError('')

    try {
      const response = await deviceAPI.deleteDevice(selectedDevice.deviceId)

      // Success - reset form and redirect
      setSelectedDevice(null)
      setSearchTerm('')
      setDevices(devices.filter(d => d.deviceId !== selectedDevice.deviceId))
      navigate('/dashboard')
      
    } catch (err: any) {
      setError(`Deregistration failed: ${err.message}`)
    } finally {
      setDeregistering(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString()
  }

  return (
    <div className="min-h-screen bg-white">
      <Navigation showBackButton />
      
      <div className="page-container">
        <div className="page-header">
          <h1 className="text-headline text-black">
            Device Deregistration
          </h1>
          <p className="text-body text-medium-gray mt-sm">
            Search and remove devices from the active registry
          </p>
        </div>

        <div className="deregister-container">
          {/* Search Section */}
          <div className="space-y-md mb-lg">
            <label htmlFor="deviceSearch" className="form-label required">
              Search Device
            </label>
            <input
              type="text"
              id="deviceSearch"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-field w-full"
              placeholder="Search by device ID, name, or version"
              disabled={loading}
            />
          </div>

          {/* Search Results */}
          {filteredDevices.length > 0 && (
            <div className="mb-lg">
              <p className="text-small text-medium-gray mb-sm">
                {filteredDevices.length} device{filteredDevices.length !== 1 ? 's' : ''} found
              </p>
              <div className="space-y-xs max-h-64 overflow-y-auto border border-border-gray">
                {filteredDevices.map((device) => (
                  <div
                    key={device.deviceId}
                    onClick={() => handleDeviceSelect(device)}
                    className="p-sm bg-white border border-border-gray cursor-pointer hover:bg-surface-gray transition-colors"
                  >
                    <div className="text-body font-mono text-dark-gray">
                      {device.deviceId}
                    </div>
                    <div className="text-small text-medium-gray">
                      {device.device_name} - {device.device_version}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Device Details Card */}
          {selectedDevice && (
            <div className="card mb-lg">
              <h3 className="text-subhead text-black mb-md">
                Device Details
              </h3>
              
              <div className="space-y-sm">
                <div className="flex">
                  <span className="text-small font-bold uppercase tracking-wide text-medium-gray w-32">
                    Device ID:
                  </span>
                  <span className="text-body font-mono text-dark-gray">
                    {selectedDevice.deviceId}
                  </span>
                </div>
                
                <div className="flex">
                  <span className="text-small font-bold uppercase tracking-wide text-medium-gray w-32">
                    Name:
                  </span>
                  <span className="text-body text-dark-gray">
                    {selectedDevice.device_name}
                  </span>
                </div>
                
                <div className="flex">
                  <span className="text-small font-bold uppercase tracking-wide text-medium-gray w-32">
                    Version:
                  </span>
                  <span className="text-body text-dark-gray">
                    {selectedDevice.device_version}
                  </span>
                </div>
                
                <div className="flex">
                  <span className="text-small font-bold uppercase tracking-wide text-medium-gray w-32">
                    Registered:
                  </span>
                  <span className="text-body text-dark-gray">
                    {formatDate(selectedDevice.registeredAt)}
                  </span>
                </div>
                
                <div className="flex">
                  <span className="text-small font-bold uppercase tracking-wide text-medium-gray w-32">
                    Linked Status:
                  </span>
                  <span className={`text-body ${selectedDevice.isLinked ? 'text-warning' : 'text-success'}`}>
                    {selectedDevice.isLinked ? 'Yes' : 'No'}
                  </span>
                </div>
                
                {selectedDevice.isLinked && (
                  <>
                    <div className="flex">
                      <span className="text-small font-bold uppercase tracking-wide text-medium-gray w-32">
                        Linked Date:
                      </span>
                      <span className="text-body text-dark-gray">
                        {selectedDevice.linkedAt ? formatDate(selectedDevice.linkedAt) : 'N/A'}
                      </span>
                    </div>
                    
                    <div className="flex">
                      <span className="text-small font-bold uppercase tracking-wide text-medium-gray w-32">
                        Linked User:
                      </span>
                      <span className="text-body text-dark-gray">
                        {selectedDevice.linkedToUser || 'N/A'}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Action Section */}
          {selectedDevice && (
            <div className="space-y-sm">
              <div className="bg-surface-gray p-md border border-border-gray">
                <p className="text-small text-error font-medium">
                  WARNING: This action cannot be undone
                </p>
                <p className="text-small text-medium-gray">
                  The device will be permanently removed from the registry.
                </p>
              </div>
              
              {error && (
                <div className="validation-message error">
                  {error}
                </div>
              )}
              
              <button
                onClick={handleDeregister}
                className="btn-destructive w-full"
                disabled={deregistering}
              >
                {deregistering ? 'PROCESSING...' : 'DEREGISTER DEVICE'}
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="text-center py-xl">
              <p className="text-body text-medium-gray">Loading devices...</p>
            </div>
          )}

          {/* Empty State */}
          {!loading && devices.length === 0 && (
            <div className="text-center py-xl">
              <p className="text-body text-medium-gray">
                No devices found in the registry.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
