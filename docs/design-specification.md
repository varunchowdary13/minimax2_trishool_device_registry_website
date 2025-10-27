# Design Specification - TRISHOOL Device Registration Portal

**Style:** Swiss Design (International Typographic Style)  
**Project Type:** Multi-Page Web Application (MPA)  
**Target Users:** Internal manufacturing staff, technicians, authorized personnel  
**Primary Goal:** Efficient, secure device registration/deregistration with precision and clarity

---

## 1. Direction & Rationale

**Visual Essence:** Grid-based precision with geometric clarity reflecting TRISHOOL's angular trident logo. Black/white/gray monochrome foundation (95%) with strategic tech blue accent (5%) for critical actions. Sharp 0-2px corners maintain industrial precision. Strict Helvetica typography and 8px grid system create systematic hierarchy appropriate for manufacturing device management.

**Real-World References:**
- Swiss International Airlines portal - functional clarity
- Industrial control interfaces - precision and trust
- MIT Media Lab admin tools - systematic organization

**Why This Works for TRISHOOL:**
- Geometric logo (angular trident) born from Swiss design principles - style amplifies brand DNA
- Manufacturing context demands precision, clarity, trustworthiness over decoration
- Form-heavy interfaces (registration/validation) benefit from strict grid and clear information architecture
- Internal professional users value efficiency and immediate comprehension over visual engagement
- Database-driven content requires systematic hierarchy and unambiguous states

---

## 2. Design Tokens

### 2.1 Color Palette

**Achromatic Scale (95% of interface)**

| Token Name | Hex Value | Usage | WCAG on White |
|------------|-----------|-------|---------------|
| Black | `#000000` | Primary text, strong rules, logo | 21:1 AAA |
| Charcoal | `#1A1A1A` | Secondary headings, icons | 18.7:1 AAA |
| Dark Gray | `#333333` | Body text, form labels | 12.6:1 AAA |
| Medium Gray | `#666666` | Captions, metadata, disabled text | 5.7:1 AA |
| Light Gray | `#999999` | Placeholder text, inactive states | 2.8:1 |
| Border Gray | `#CCCCCC` | Borders, dividers, input outlines | 1.6:1 |
| Surface Gray | `#E5E5E5` | Subtle backgrounds, disabled surfaces | 1.3:1 |
| Background Light | `#F5F5F5` | Page backgrounds, card surfaces | 1.07:1 |
| White | `#FFFFFF` | Primary background, input fields | - |

**Accent Color (5% of interface)**

| Token Name | Hex Value | Usage | WCAG on White |
|------------|-----------|-------|---------------|
| Tech Blue | `#0057B7` | Primary CTA, active states, focus indicators | 4.93:1 AA |
| Tech Blue Dark | `#003D82` | Hover states, pressed buttons | 7.8:1 AAA |

**Semantic Colors (Validation & Status)**

| Token Name | Hex Value | Usage |
|------------|-----------|-------|
| Success Green | `#008A00` | Successful registration, valid input |
| Error Red | `#CC0000` | Validation errors, destructive actions |
| Warning Orange | `#CC5500` | Caution messages, pending states |

**Color Distribution Rules:**
- Backgrounds/surfaces: White (#FFFFFF) and Light Gray (#F5F5F5) only
- Text: Black → Dark Gray for hierarchy
- Borders/rules: Border Gray (#CCCCCC) for standard, Black (#000000) for emphasis
- CTAs: Tech Blue for primary actions only (Register, Deregister, Login)
- Links: Tech Blue with underline on hover
- Status indicators: Semantic colors for validation feedback only

### 2.2 Typography

**Font Family**

| Token | Value |
|-------|-------|
| Primary | `'Helvetica Neue', Helvetica, Arial, sans-serif` |
| Monospace | `'Monaco', 'Courier New', monospace` (Device IDs only) |

**Type Scale**

| Token | Size | Weight | Line Height | Letter Spacing | Usage |
|-------|------|--------|-------------|----------------|-------|
| Display | 48px | 700 Bold | 1.1 (52.8px) | -0.02em | Page titles (Login, Dashboard headers) |
| Headline | 32px | 700 Bold | 1.2 (38.4px) | -0.01em | Section headers |
| Subhead | 20px | 500 Medium | 1.3 (26px) | 0 | Card titles, form section headers |
| Body Large | 18px | 400 Regular | 1.5 (27px) | 0 | Intro text, important instructions |
| Body | 16px | 400 Regular | 1.5 (24px) | 0 | Form labels, body text, descriptions |
| Small | 14px | 400 Regular | 1.5 (21px) | 0 | Helper text, captions, metadata |
| Caption | 12px | 400 Regular | 1.4 (16.8px) | 0.01em | Timestamps, footnotes |
| Button | 14px | 700 Bold | 1.0 | 0.05em UPPERCASE | All buttons |
| Nav Link | 12px | 700 Bold | 1.0 | 0.05em UPPERCASE | Navigation items |

**Typography Rules:**
- All text flush-left aligned (never center or justify body text)
- Device IDs displayed in monospace font for clarity
- Form labels: Body size (16px), Medium weight (500)
- Error messages: Small size (14px), Error Red color
- Success messages: Small size (14px), Success Green color

### 2.3 Spacing System (8px Grid - Strict)

| Token | Value | Usage |
|-------|-------|-------|
| xs | 8px | Icon-text gaps, inline element spacing |
| sm | 16px | Form field internal padding, related element gaps |
| md | 24px | Form field vertical spacing, paragraph gaps |
| lg | 32px | Section internal padding, card padding |
| xl | 48px | Major section spacing, page section boundaries |
| 2xl | 64px | Navigation bar height, page header spacing |
| 3xl | 96px | Dramatic section breaks, page top/bottom margins |

**Whitespace Strategy:**
- Target 50% content, 50% whitespace
- Form spacing: 24px between fields, 32px between sections
- Card padding: 32px all sides
- Page margins: 48px minimum on desktop

### 2.4 Border & Radius

| Token | Value | Usage |
|-------|-------|-------|
| Radius None | 0px | Default for all elements (cards, forms, images) |
| Radius Subtle | 2px | Buttons and inputs only (optional) |
| Border Thin | 1px | Standard borders, dividers, input outlines |
| Border Medium | 2px | Focus states, emphasized rules |
| Border Thick | 4px | Accent left-border on active cards |

### 2.5 Shadows

**Minimal Use - Swiss design prefers flat hierarchy**

| Token | Value | Usage |
|-------|-------|-------|
| Shadow Subtle | `0 1px 3px rgba(0, 0, 0, 0.12)` | Optional card elevation |
| Shadow None | `none` | Default for all elements |

### 2.6 Animation Timing

| Token | Value | Usage |
|-------|-------|-------|
| Duration Fast | 150ms | Button hover, focus states, immediate feedback |
| Duration Standard | 200ms | Form validation appearance, page transitions |
| Easing | `linear` or `ease-out` | Honest, mechanical motion |

---

## 3. Component Specifications

### 3.1 Navigation Bar

**Structure:**
- Height: 64px
- Background: White (#FFFFFF)
- Bottom border: 1px solid Border Gray (#CCCCCC)
- Horizontal padding: 48px
- Fixed position on scroll

**Layout (Grid-aligned):**
- Logo: Left-aligned, 32px height, TRISHOOL geometric trident
- Navigation links: Right-aligned, 48px spacing between items
- User info: Right section, Medium Gray text (14px)
- Logout button: Secondary button style

**States:**
- Active page: Tech Blue text with 2px bottom border
- Hover: Underline expansion animation (150ms)

**Typography:**
- Nav links: 12px Bold, UPPERCASE, 0.05em letter-spacing
- User info: 14px Regular

### 3.2 Buttons

**Primary CTA (Register, Login, Deregister)**
```
Height:          48px
Padding:         16px 32px horizontal
Background:      Tech Blue (#0057B7)
Text:            White (#FFFFFF), 14px Bold, UPPERCASE
Border:          None
Radius:          0px (sharp corners)
Letter-spacing:  0.05em

States:
- Hover:    Background → Tech Blue Dark (#003D82)
- Focus:    2px solid Black outline, 2px offset
- Disabled: Background → Light Gray (#CCCCCC), text → Medium Gray
- Active:   Background → Tech Blue Dark
```

**Secondary Button (Back, Cancel)**
```
Same dimensions as Primary
Background:      White (#FFFFFF)
Text:            Black (#000000)
Border:          2px solid Black (#000000)

States:
- Hover:    Invert (Black background, White text)
- Focus:    2px solid Black outline, 2px offset
- Disabled: Border/text → Light Gray (#CCCCCC)
```

**Destructive Button (Deregister Device)**
```
Same dimensions as Primary
Background:      Error Red (#CC0000)
Text:            White (#FFFFFF)

States:
- Hover:    Background → Darken 15%
- Requires: Confirmation modal before action
```

### 3.3 Input Fields

**Text Input (Device ID, Search)**
```
Height:          48px
Padding:         12px 16px
Background:      White (#FFFFFF)
Border:          1px solid Border Gray (#CCCCCC)
Radius:          0px
Font:            16px Regular, Dark Gray (#333333)
Placeholder:     Medium Gray (#666666)

States:
- Focus:    Border → 2px solid Black (#000000), no glow/shadow
- Error:    Border → 2px solid Error Red (#CC0000)
- Success:  Border → 2px solid Success Green (#008A00)
- Disabled: Background → Surface Gray (#E5E5E5)
```

**Dropdown Select (Device Name, Device Version)**
```
Same styling as Text Input
Icon:       8px × 8px chevron, right-aligned, 16px from edge
Dropdown:   Background White, 1px Border Gray border
Options:    48px height, 16px padding, hover → Background Light
```

**Label**
```
Font:           16px Medium (500), Dark Gray (#333333)
Position:       Above input, 8px spacing
Required mark:  Red asterisk (*) if mandatory
```

**Helper Text / Error Message**
```
Font:       14px Regular
Position:   Below input, 8px spacing
Color:      Medium Gray (helper) or Error Red (error)
```

### 3.4 Cards

**Dashboard Action Card (Register/Deregister Options)**
```
Background:   White (#FFFFFF)
Border:       1px solid Border Gray (#CCCCCC)
Radius:       0px
Padding:      32px
Shadow:       None
Min-height:   200px

Layout:
- Icon:       32px, top center (optional)
- Title:      20px Medium, Black, centered
- Description: 16px Regular, Dark Gray, centered
- Button:     Primary CTA, bottom

States:
- Hover:  Border → 2px solid Black (#000000)
- Focus:  4px solid Tech Blue left-border accent
```

**Device Details Card (Deregistration Page)**
```
Same base styling as Action Card
Padding:      32px
Layout:       Left-aligned text (flush-left)

Content Structure:
- Field labels: 14px Bold, UPPERCASE, 0.05em spacing
- Field values: 16px Regular, Monospace for Device ID
- Spacing:      16px between field rows
- Dividers:     1px Border Gray between major sections
```

### 3.5 Form Validation Display

**Inline Validation (Real-time)**
```
Position:   Below input field, 8px spacing
Icon:       16px × 16px (success checkmark / error X)
Text:       14px Regular
Color:      Success Green or Error Red
Animation:  Fade in (200ms) when validation state changes
```

**IMEI Format Validation Rules:**
- Pattern: `deviceid-A2025001` format
- Real-time validation on input
- Green checkmark when valid
- Red error message when invalid
- Register button disabled until valid

**Modal Validation (Submit confirmation)**
```
Overlay:    rgba(0, 0, 0, 0.5)
Modal:      White background, centered
Width:      480px max
Padding:    48px
Border:     2px solid Black (#000000)

Content:
- Title:    32px Bold, Black
- Message:  16px Regular, Dark Gray
- Actions:  Primary + Secondary buttons, 16px gap
```

### 3.6 QR Code Scanner Integration

**Scanner Button**
```
Style:      Secondary button
Icon:       24px QR code icon (SVG outline)
Text:       "SCAN QR CODE"
Position:   Adjacent to Device ID input (right side)
Width:      Auto (fit content)

Behavior:
- Opens camera/scanner interface
- Auto-populates Device ID field on successful scan
- Shows success message on completion
- Error handling for invalid QR codes
```

**Scanner Overlay (Active State)**
```
Fullscreen overlay
Background: Black (#000000)
Camera feed: Centered viewfinder
Guide box:  White border, centered
Cancel:     Secondary button, top-right
Instructions: White text, 16px, centered above viewfinder
```

---

## 4. Layout & Responsive

### 4.1 Layout Patterns Overview

**Reference:** See content-structure-plan.md for page structure details. Below are LAYOUT PATTERNS for each page type.

### 4.2 Page 1: Login (`/login`) - Centered Authentication Pattern

**Layout Structure:**
- Full viewport height centering
- Logo block → Form → Footer (vertical stack)
- Single-column layout, 400px max width, centered

**Visual Hierarchy:**
1. **Logo Block (Primary)**: 96px spacing top, logo 48px height, centered
2. **Login Form (Focus)**: 32px padding card, 400px width, centered
3. **Footer (Minimal)**: 16px spacing bottom, 12px caption text

**Grid Strategy:**
- 12-column grid, content occupies 4 columns (center)
- Mobile: Full width minus 32px margins

**Component Pattern:**
```
Vertical Stack (Centered):
  - Logo (48px height)
  - Spacing: 64px
  - Card:
    - Title: Display (48px) "TRISHOOL Portal"
    - Subtitle: Body (16px) "Device Registration System"
    - Spacing: 32px
    - Username Input (48px height)
    - Spacing: 24px
    - Password Input (48px height)
    - Spacing: 32px
    - Login Button (Primary CTA, full width)
  - Spacing: 48px
  - Footer text: Caption (12px), centered
```

### 4.3 Page 2: Dashboard (`/dashboard`) - Action Grid Pattern

**Layout Structure:**
- Navigation bar (64px) + Page header (200px) + Action grid + Footer
- 2-column card grid at desktop (3-4-3 column split)
- Container: 1200px max width, 48px horizontal padding

**Visual Hierarchy:**
1. **Navigation Bar**: Standard nav pattern (§3.1)
2. **Page Header (200px)**: Display title (48px) + status text (18px)
3. **Action Grid**: 2-column equal split, 32px gap
4. **Footer**: System info, 48px top spacing

**Grid Strategy:**
- Desktop: 2 columns (6-6 grid split), 32px gap
- Tablet: 2 columns maintained
- Mobile: Single column stack, 24px gap

**Component Pattern:**
```
Dashboard Layout:
  - Nav Bar: Height 64px (§3.1)
  - Page Header:
    - Title: "Device Management" (48px Display)
    - Status: "System Active" (16px, Medium Gray)
    - Spacing: 64px
  
  - Action Grid (2-column):
    - Card 1: "Register Device" (§3.4 Action Card)
    - Card 2: "Deregister Device" (§3.4 Action Card)
    - Gap: 32px horizontal
  
  - Footer: 48px spacing top
```

### 4.4 Page 3: Registration Form (`/register`) - Form-Focused Pattern

**Layout Structure:**
- Navigation bar + Page header + Form container (centered) + Footer
- Single-column form, 600px max width, centered
- Left-aligned form fields (flush-left within container)

**Visual Hierarchy:**
1. **Page Header**: 32px Bold title + 16px description
2. **Form Sections**: Grouped fields with 48px section spacing
3. **Primary CTA**: Prominent position, full width within container
4. **Validation Feedback**: Inline with fields

**Grid Strategy:**
- 12-column grid, form occupies 6 columns (center)
- Mobile: Full width minus 32px margins
- All form fields full width within container

**Component Pattern:**
```
Registration Form Layout:
  - Nav Bar: Standard (§3.1)
  - Page Header:
    - Title: "Device Registration" (32px Headline)
    - Description: Helper text (16px)
    - Spacing: 48px
  
  - Form Container (600px max, centered):
    - Section 1: Device Information
      - Label: "Device ID *" (16px Medium)
      - Input: Device ID field with QR button (48px)
      - Validation: Inline feedback (14px)
      - Spacing: 24px
      
      - Label: "Device Name *"
      - Dropdown: Restricted to "trishool" (48px)
      - Spacing: 24px
      
      - Label: "Device Version *"
      - Dropdown: Restricted to "version one" (48px)
      - Spacing: 48px (section break)
    
    - Section 2: Registration
      - Help Text: Instructions (14px, Medium Gray)
      - Spacing: 16px
      - Register Button: Primary CTA, full width (48px)
      - State: Disabled until validation passes
```

### 4.5 Page 4: Deregistration (`/deregister`) - Search + Details Pattern

**Layout Structure:**
- Navigation bar + Page header + Search section + Device details card + Action section
- Single-column layout, 800px max width, centered
- Clear visual separation between search and details

**Visual Hierarchy:**
1. **Search Section**: Prominent search input with immediate results
2. **Device Details Card**: Full device information display
3. **Deregister Button**: Destructive action, requires confirmation
4. **Empty State**: Message when no device selected

**Grid Strategy:**
- 12-column grid, content occupies 8 columns (center)
- Mobile: Full width minus 32px margins
- Card full width within container

**Component Pattern:**
```
Deregistration Layout:
  - Nav Bar: Standard (§3.1)
  - Page Header:
    - Title: "Device Deregistration" (32px Headline)
    - Description: Warning text (16px)
    - Spacing: 48px
  
  - Search Section (800px max, centered):
    - Label: "Search Device" (16px Medium)
    - Search Input: With search icon (48px)
    - Spacing: 32px
  
  - Device Details Card (§3.4):
    - Conditional display (shown when device selected)
    - Field rows: Left-aligned, flush-left
      - Device ID (Monospace)
      - Device Name
      - Device Version
      - Registration Date
      - Link Status
      - Linked Date (if applicable)
      - Linked User (if applicable)
    - Spacing: 16px between rows
    - Divider: 1px Border Gray between sections
    - Spacing: 48px
  
  - Action Section:
    - Warning Text: "This action cannot be undone" (14px, Error Red)
    - Spacing: 16px
    - Deregister Button: Destructive button (48px)
```

### 4.6 Responsive Strategy

**Breakpoints:**
```
sm:  640px  (Mobile landscape)
md:  768px  (Tablet) - Maintain 2-column dashboard grid
lg:  1024px (Desktop) - Full 12-column grid active
xl:  1280px (Large desktop)
```

**Grid Adaptation:**
- **<768px**: Single column for all layouts, stack dashboard cards
- **768-1024px**: Maintain dashboard 2-column grid, forms remain centered single column
- **>1024px**: Full 12-column grid, max-width containers enforced

**Typography Scaling:**
- Display: 48px → 36px on mobile
- Headline: 32px → 24px on mobile
- Body: 16px maintained (accessibility minimum)
- All other sizes maintained or reduced proportionally

**Touch Targets:**
- All buttons: 48px minimum height
- Input fields: 48px minimum height
- Navigation links: 48px tap target (padding)
- Minimum spacing between tappable elements: 8px

**Container Widths:**
```
Login form:         400px max
Dashboard:          1200px max
Registration form:  600px max
Deregistration:     800px max
Mobile all pages:   100% width - 32px margins
```

---

## 5. Interaction & Animation

### 5.1 Animation Standards

**Timing:**
- Button hover/focus: 150ms (immediate feedback)
- Form validation appearance: 200ms (fade in)
- Page transitions: 0ms (instant - Swiss design priority)
- Modal overlay: 200ms (fade in)

**Easing:**
- Primary: `linear` (mechanical, honest)
- Acceptable: `ease-out` (slight deceleration for fades)

**Performance Rule:**
- Animate ONLY `opacity` and `transform` (GPU-accelerated)
- NEVER animate `width`, `height`, `margin`, `padding`

### 5.2 Component Interactions

**Buttons:**
```css
/* Hover state */
transition: background-color 150ms linear;

/* Focus state */
outline: 2px solid #000000;
outline-offset: 2px;
transition: outline 0ms; /* Instant visibility */
```

**Input Fields:**
```css
/* Focus border expansion */
transition: border-width 0ms, border-color 0ms;
/* Instant state change - no smooth transition */

/* Validation message appearance */
opacity: 0 → 1;
transition: opacity 200ms ease-out;
```

**Navigation Links:**
```css
/* Underline expansion on hover */
text-decoration: none;
border-bottom: 2px solid transparent;

&:hover {
  border-bottom: 2px solid #0057B7;
  transition: border-color 150ms linear;
}
```

**Cards:**
```css
/* Dashboard card hover */
transition: border-color 150ms linear, border-width 0ms;

&:hover {
  border: 2px solid #000000;
}
```

### 5.3 Form Validation Animations

**Real-time Validation:**
- Input border color change: Instant (0ms)
- Validation message fade in: 200ms opacity transition
- Success checkmark: Fade in 200ms
- Error icon: Fade in 200ms

**Register Button Enable:**
- Disabled → Enabled state: Instant (0ms)
- Background color transition: 150ms on hover only

### 5.4 QR Scanner Transitions

**Scanner Activation:**
- Overlay fade in: 200ms opacity (0 → 1)
- Camera feed: Instant appearance
- Guide box: Static (no animation)

**Scanner Completion:**
- Success message: Fade in 200ms
- Auto-close: 200ms fade out after 1500ms display
- Device ID field population: Instant

### 5.5 Modal Interactions

**Modal Open:**
- Overlay: Fade in 200ms (opacity 0 → 0.5)
- Modal box: Instant appearance (no scale/slide animation)

**Modal Close:**
- Overlay: Fade out 200ms
- Modal box: Instant removal

### 5.6 Loading States

**Form Submission:**
- Button text: "REGISTER" → "PROCESSING..."
- Button state: Disabled appearance
- Spinner: 16px, Black color, right side of button text
- Spinner animation: 1s linear rotation (exception for functional feedback)

**Search Results:**
- Loading indicator: Fade in after 300ms delay (avoid flash)
- Results appearance: Instant (no stagger/cascade)

### 5.7 Accessibility - Reduced Motion

**User Preference Support:**
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

**Impact:**
- All fades: Instant state changes
- Hover effects: Instant color changes
- Validation messages: Instant appearance
- Modal overlays: Instant display
- Maintain immediate hover feedback (critical for usability)

### 5.8 Focus Management

**Keyboard Navigation:**
- Tab order: Logical top-to-bottom, left-to-right
- Focus indicators: 2px solid Black outline, 2px offset
- Skip to content: Hidden link for screen readers
- Form submission: Focus moves to success/error message

**Focus Trapping:**
- Modal open: Focus trapped within modal
- QR scanner: Focus trapped in scanner overlay
- Modal close: Return focus to trigger element

---

## 6. Quality Checklist

### Swiss Design Compliance
- ✅ All elements align to 8px grid
- ✅ 95% achromatic colors (black/white/gray)
- ✅ 5% tech blue accent (CTAs and active states only)
- ✅ Helvetica typography throughout
- ✅ Sharp corners (0-2px radius)
- ✅ Flush-left text alignment
- ✅ Minimal shadows (flat hierarchy preferred)
- ✅ 50% whitespace ratio maintained

### WCAG Accessibility
- ✅ Text contrast ≥4.5:1 (AA minimum)
- ✅ Touch targets ≥48×48px
- ✅ Focus indicators visible (2px black outline)
- ✅ Reduced motion support
- ✅ Keyboard navigation functional
- ✅ ARIA labels for icon buttons

### TRISHOOL Brand Alignment
- ✅ Geometric precision matches angular logo
- ✅ Professional manufacturing aesthetic
- ✅ Security and trust conveyed through clarity
- ✅ Efficient workflows for internal users
- ✅ Technical validation emphasis

### Functional Requirements
- ✅ IMEI format validation (deviceid-A2025001)
- ✅ Dropdown restrictions specified
- ✅ QR scanner integration detailed
- ✅ Database schema accommodated
- ✅ Searchable deregistration flow
- ✅ Logout functionality on all authenticated pages
- ✅ Responsive tablet/desktop support

---

**Document Version:** 1.0  
**Design System:** Swiss Design (International Typographic Style)  
**Created:** 2025-10-27  
**Pages:** 4 (Login, Dashboard, Registration, Deregistration)
