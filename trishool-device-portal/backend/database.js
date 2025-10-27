const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

// Database file path
const dbPath = path.join(__dirname, 'trishool_devices.json');

// Default data structure
const defaultData = {
  users: [],
  devices: []
};

class FileDatabase {
  constructor() {
    this.data = this.loadData();
    this.initializeDefaultAdmin();
  }

  // Load data from file
  loadData() {
    try {
      if (fs.existsSync(dbPath)) {
        const fileContent = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(fileContent);
      } else {
        this.saveData(defaultData);
        return { ...defaultData };
      }
    } catch (error) {
      console.error('Error loading database:', error);
      return { ...defaultData };
    }
  }

  // Save data to file
  saveData(data = null) {
    try {
      const dataToSave = data || this.data;
      fs.writeFileSync(dbPath, JSON.stringify(dataToSave, null, 2));
    } catch (error) {
      console.error('Error saving database:', error);
    }
  }

  // Initialize default admin user
  initializeDefaultAdmin() {
    const adminExists = this.data.users.some(user => user.email === 'admin@trishool.com');
    
    if (!adminExists) {
      const adminUser = {
        id: 1,
        email: 'admin@trishool.com',
        password_hash: bcrypt.hashSync('admin123', 10),
        role: 'admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      this.data.users.push(adminUser);
      this.saveData();
      console.log('Default admin user created: admin@trishool.com');
    }
  }

  // User authentication functions
  async findUserByEmail(email) {
    return this.data.users.find(user => user.email === email);
  }

  async verifyPassword(password, hash) {
    return bcrypt.compare(password, hash);
  }

  // Device management functions
  async registerDevice(deviceData, userId) {
    // Check if device ID already exists
    const existingDevice = this.data.devices.find(device => device.deviceId === deviceData.deviceId);
    if (existingDevice) {
      throw new Error('Device ID already exists');
    }

    const newDevice = {
      ...deviceData,
      registeredAt: new Date().toISOString(),
      registeredBy: userId
    };

    this.data.devices.push(newDevice);
    this.saveData();
    return newDevice;
  }

  async getAllDevices() {
    return this.data.devices.sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt));
  }

  async deleteDevice(deviceId) {
    const index = this.data.devices.findIndex(device => device.deviceId === deviceId);
    if (index === -1) {
      throw new Error('Device not found');
    }

    this.data.devices.splice(index, 1);
    this.saveData();
    return { changes: 1 };
  }

  async searchDevices(searchTerm) {
    const term = searchTerm.toLowerCase();
    return this.data.devices.filter(device =>
      device.deviceId.toLowerCase().includes(term) ||
      device.device_name.toLowerCase().includes(term) ||
      device.device_version.toLowerCase().includes(term)
    ).sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt));
  }

  // Get next user ID
  getNextUserId() {
    return Math.max(...this.data.users.map(user => user.id), 0) + 1;
  }
}

// Initialize database
const db = new FileDatabase();

module.exports = {
  db,
  findUserByEmail: db.findUserByEmail.bind(db),
  verifyPassword: db.verifyPassword.bind(db),
  registerDevice: db.registerDevice.bind(db),
  getAllDevices: db.getAllDevices.bind(db),
  deleteDevice: db.deleteDevice.bind(db),
  searchDevices: db.searchDevices.bind(db)
};
