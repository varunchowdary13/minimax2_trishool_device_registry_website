# Content Structure Plan - TRISHOOL Device Registration Portal

## 1. Material Inventory

**Visual Assets:**
- `user_input_files/icon_t.png` - TRISHOOL logo (geometric trident, white on black)

**Database Schema (SQLite):**
- Fields: deviceId, device_name, device_version, registeredAt, isLinked, linkedAt, linkedToUser
- Validation: IMEI format (deviceid-A2025001)
- Restrictions: device_name="trishool", device_version="version one"

**Technical Files:**
- Firebase/Firestore connection files (prepared for future deployment)
- QR code scanner integration (device box barcodes)

**Functional Requirements:**
- Restricted authentication (no signup)
- Device registration with format validation
- Device deregistration with search functionality
- Logout capability

## 2. Website Structure

**Type:** MPA (Multi-Page Application)

**Reasoning:** 
- 4 distinct functional pages with separate purposes (authentication, navigation, registration, deregistration)
- Different user goals per page (login → dashboard navigation → specific actions)
- Form-heavy interfaces requiring dedicated layouts
- Clear separation between authentication and application states

## 3. Page Breakdown

### Page 1: Login (`/login`)
**Purpose:** Secure authentication for predetermined users

**Content Mapping:**

| Section | Component Pattern | Data Source | Content to Extract | Visual Asset |
|---------|------------------|-------------|-------------------|--------------|
| Header | Centered Logo Block | - | TRISHOOL branding | `icon_t.png` |
| Login Form | Form Pattern | User authentication system | Login fields (username/password) | - |
| Footer | Minimal Footer | - | System info text | - |

### Page 2: Home Dashboard (`/dashboard`)
**Purpose:** Primary navigation hub for registration/deregistration functions

**Content Mapping:**

| Section | Component Pattern | Data Source | Content to Extract | Visual Asset |
|---------|------------------|-------------|-------------------|--------------|
| Navigation Bar | Top Navigation | Session data | User info, logout button | `icon_t.png` |
| Hero Header | Page Header | - | Welcome message, system status | - |
| Action Grid | 2-Column Card Grid | - | Register/Deregister options | - |
| Footer | Minimal Footer | - | System info, version | - |

### Page 3: Device Registration (`/register`)
**Purpose:** Register new devices with validation and QR scanning

**Content Mapping:**

| Section | Component Pattern | Data Source | Content to Extract | Visual Asset |
|---------|------------------|-------------|-------------------|--------------|
| Navigation Bar | Top Navigation | Session data | User info, back button, logout | `icon_t.png` |
| Page Header | Page Title Block | - | "Device Registration" heading | - |
| Registration Form | Multi-Input Form + QR Scanner | Database schema | Device ID (IMEI), device name dropdown, device version dropdown, QR scan button | - |
| Validation Display | Inline Validation | Form validation logic | Error/success messages | - |
| Submit Section | Primary CTA Button | - | Register button (enabled on valid input) | - |

**Form Fields:**
- Device ID: Text input with IMEI format validation (deviceid-A2025001)
- Device Name: Dropdown (restricted to "trishool")
- Device Version: Dropdown (restricted to "version one")
- QR Scanner: Integration button for barcode scanning

### Page 4: Device Deregistration (`/deregister`)
**Purpose:** Search and deregister existing devices with full detail display

**Content Mapping:**

| Section | Component Pattern | Data Source | Content to Extract | Visual Asset |
|---------|------------------|-------------|-------------------|--------------|
| Navigation Bar | Top Navigation | Session data | User info, back button, logout | `icon_t.png` |
| Page Header | Page Title Block | - | "Device Deregistration" heading | - |
| Search Section | Search Input + Results | Database query | Device search field | - |
| Device Details Card | Data Display Card | Database record | All device fields (deviceId, device_name, device_version, registeredAt, isLinked, linkedAt, linkedToUser) | - |
| Action Section | Destructive CTA Button | - | Deregister button | - |

**Data Display Fields:**
- Device ID (primary identifier)
- Device Name
- Device Version
- Registration Date/Time
- Link Status (isLinked boolean)
- Link Date/Time (if applicable)
- Linked User (if applicable)

## 4. Content Analysis

**Information Density:** Medium
- Functional application with form-heavy interfaces
- Database-driven content display
- Minimal marketing/explanatory text
- Focus on data input/output and validation

**Content Balance:**
- Images: 1 (logo only) (5%)
- Data/Forms: Primary content (75%)
- Text: Minimal labels/instructions (20%)
- Content Type: Data-driven application interface

**User Flow:**
1. Login authentication → Dashboard
2. Dashboard → Select Register OR Deregister
3. Register → Input/scan device data → Validate → Submit → Dashboard
4. Deregister → Search device → Display details → Confirm deregistration → Dashboard
5. Logout from any authenticated page
