// Real backend API configuration for TRISHOOL Device Registration Portal
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api'

// Database types
export interface Device {
  deviceId: string
  device_name: string
  device_version: string
  registeredAt: string
  isLinked: boolean
  linkedAt?: string
  linkedToUser?: string
}

export interface User {
  id: number
  email: string
  role: string
}

export interface AuthResponse {
  token: string
  user: User
}

// IMEI validation pattern: deviceid-A2025001
export const IMEI_PATTERN = /^deviceid-A2025001$/

export function validateIMEI(imei: string): boolean {
  return IMEI_PATTERN.test(imei)
}

// API helper functions
class ApiClient {
  private token: string | null = null

  setToken(token: string) {
    this.token = token
    localStorage.setItem('auth_token', token)
  }

  getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('auth_token')
    }
    return this.token
  }

  async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = this.getToken()
    const url = `${API_BASE_URL}${endpoint}`
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers
    }

    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const response = await fetch(url, {
      ...options,
      headers
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Network error' }))
      throw new Error(errorData.error || `HTTP ${response.status}`)
    }

    return response.json()
  }
}

export const apiClient = new ApiClient()

// Authentication API
export const authAPI = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.makeRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    })
    
    apiClient.setToken(response.token)
    return response
  },

  async verifyToken(): Promise<{ user: User }> {
    return apiClient.makeRequest<{ user: User }>('/auth/verify')
  },

  async logout() {
    apiClient.setToken('')
    localStorage.removeItem('auth_token')
  }
}

// Device API
export const deviceAPI = {
  // Register a new device
  async registerDevice(device: Omit<Device, 'registeredAt'>): Promise<{ data: Device }> {
    return apiClient.makeRequest<{ data: Device }>('/devices', {
      method: 'POST',
      body: JSON.stringify(device)
    })
  },

  // Get all devices
  async getDevices(): Promise<{ data: Device[] }> {
    return apiClient.makeRequest<{ data: Device[] }>('/devices')
  },

  // Search devices
  async searchDevices(query: string): Promise<{ data: Device[] }> {
    return apiClient.makeRequest<{ data: Device[] }>(`/devices/search?q=${encodeURIComponent(query)}`)
  },

  // Delete a device
  async deleteDevice(deviceId: string): Promise<{ message: string }> {
    return apiClient.makeRequest<{ message: string }>(`/devices/${encodeURIComponent(deviceId)}`, {
      method: 'DELETE'
    })
  }
}

// Health check for backend
export const healthAPI = {
  async check(): Promise<{ status: string; timestamp: string }> {
    return apiClient.makeRequest<{ status: string; timestamp: string }>('/health')
  }
}

// Initialize authentication on app load
export function initializeAuth() {
  const token = apiClient.getToken()
  if (token) {
    // Token exists, user might be logged in
    // We'll verify this when needed
  }
}

// Check if API is properly configured
export const isBackendConfigured = () => {
  return API_BASE_URL !== 'http://localhost:3001/api'
}
