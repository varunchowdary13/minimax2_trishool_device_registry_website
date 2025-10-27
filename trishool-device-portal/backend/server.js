const express = require('express');
const cors = require('cors');
const {
  findUserByEmail,
  verifyPassword,
  registerDevice,
  getAllDevices,
  deleteDevice,
  searchDevices
} = require('./database');
const {
  generateToken,
  verifyToken,
  authenticateToken,
  requireAdmin
} = require('./auth');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://*.space.minimax.io'],
  credentials: true
}));
app.use(express.json());

console.log('TRISHOOL Device Registration API server starting...');
console.log('Using file-based database');

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Authentication routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate token
    const token = generateToken(user);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Verify token endpoint
app.get('/api/auth/verify', authenticateToken, (req, res) => {
  res.json({
    user: {
      id: req.user.id,
      email: req.user.email,
      role: req.user.role
    }
  });
});

// Device management routes (all require authentication)
app.post('/api/devices', authenticateToken, async (req, res) => {
  try {
    const { deviceId, device_name, device_version, isLinked = false, linkedAt = null, linkedToUser = null } = req.body;

    // Validate required fields
    if (!deviceId || !device_name || !device_version) {
      return res.status(400).json({ error: 'Device ID, name, and version are required' });
    }

    // Validate IMEI format
    const imeiPattern = /^deviceid-A2025001$/;
    if (!imeiPattern.test(deviceId)) {
      return res.status(400).json({ error: 'Invalid IMEI format. Must be: deviceid-A2025001' });
    }

    // Validate device name and version
    if (device_name !== 'trishool') {
      return res.status(400).json({ error: 'Device name must be "trishool"' });
    }

    if (device_version !== 'version one') {
      return res.status(400).json({ error: 'Device version must be "version one"' });
    }

    const deviceData = {
      deviceId: deviceId.trim(),
      device_name,
      device_version,
      isLinked,
      linkedAt,
      linkedToUser
    };

    const device = await registerDevice(deviceData, req.user.id);

    res.status(201).json({
      data: device
    });
  } catch (error) {
    console.error('Device registration error:', error);
    if (error.message === 'Device ID already exists') {
      res.status(409).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Get all devices
app.get('/api/devices', authenticateToken, async (req, res) => {
  try {
    const devices = await getAllDevices();
    
    // Remove sensitive fields and format response
    const formattedDevices = devices.map(device => ({
      deviceId: device.deviceId,
      device_name: device.device_name,
      device_version: device.device_version,
      registeredAt: device.registeredAt,
      isLinked: device.isLinked,
      linkedAt: device.linkedAt,
      linkedToUser: device.linkedToUser
    }));

    res.json({ data: formattedDevices });
  } catch (error) {
    console.error('Get devices error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Search devices
app.get('/api/devices/search', authenticateToken, async (req, res) => {
  try {
    const { q } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const devices = await searchDevices(q);
    
    // Remove sensitive fields and format response
    const formattedDevices = devices.map(device => ({
      deviceId: device.deviceId,
      device_name: device.device_name,
      device_version: device.device_version,
      registeredAt: device.registeredAt,
      isLinked: device.isLinked,
      linkedAt: device.linkedAt,
      linkedToUser: device.linkedToUser
    }));

    res.json({ data: formattedDevices });
  } catch (error) {
    console.error('Search devices error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete device
app.delete('/api/devices/:deviceId', authenticateToken, async (req, res) => {
  try {
    const { deviceId } = req.params;

    if (!deviceId) {
      return res.status(400).json({ error: 'Device ID is required' });
    }

    const result = await deleteDevice(deviceId);

    if (result.changes === 0) {
      return res.status(404).json({ error: 'Device not found' });
    }

    res.json({ message: 'Device deregistered successfully' });
  } catch (error) {
    console.error('Delete device error:', error);
    if (error.message === 'Device not found') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`TRISHOOL Device Registration API server running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  process.exit(0);
});

module.exports = app;
