# SubSmart – OTT Subscription Manager Specification

## 1. Concept & Vision

SubSmart is a premium fintech-style subscription management platform that empowers users to track, analyze, and optimize their OTT subscriptions. The app features a sleek dark theme with glassmorphism cards, creating an investor-ready prototype that feels like a professional financial product. The experience should evoke trust and sophistication while being intuitive and engaging.

## 2. Design Language

### Aesthetic Direction
Inspired by Paytm, Cred, and Robinhood - modern fintech with dark backgrounds, glass effects, and vibrant accent colors. Premium, trustworthy, and data-rich.

### Color Palette
```
--bg-primary: #0a0a0f (Deep black)
--bg-secondary: #12121a (Charcoal)
--bg-card: rgba(255, 255, 255, 0.05) (Glassmorphism)
--bg-card-hover: rgba(255, 255, 255, 0.08)
--accent-primary: #6366f1 (Indigo)
--accent-secondary: #8b5cf6 (Purple)
--accent-gradient: linear-gradient(135deg, #6366f1, #8b5cf6)
--success: #10b981 (Emerald)
--warning: #f59e0b (Amber)
--danger: #ef4444 (Red)
--text-primary: #ffffff
--text-secondary: #94a3b8 (Slate)
--text-muted: #64748b
--border-color: rgba(255, 255, 255, 0.1)
```

### Typography
- Headings: Inter (700, 600)
- Body: Inter (400, 500)
- Monospace: JetBrains Mono (for numbers/amounts)
- Scale: 12px, 14px, 16px, 20px, 24px, 32px, 48px

### Spatial System
- Base unit: 4px
- Card padding: 24px
- Section gaps: 32px
- Border radius: 12px (cards), 8px (buttons), 16px (modals)

### Motion Philosophy
- Transitions: 200ms ease for interactions, 300ms ease-out for page transitions
- Hover: Scale 1.02 with shadow lift
- Page load: Fade in + slide up, staggered 50ms
- Charts: Draw-in animation 600ms
- Success states: Pulse + checkmark animation

### Visual Assets
- Icons: Lucide Icons (via CDN)
- Platform logos: Custom SVG icons for each platform
- Charts: Chart.js with custom dark theme
- Decorative: Gradient orbs, subtle grid patterns

## 3. Layout & Structure

### Page Structure
- **Sidebar Navigation** (desktop): Fixed left, 280px width
- **Bottom Navigation** (mobile): Fixed bottom, 5 items
- **Main Content**: Fluid width with max-width 1400px
- **Page transitions**: Smooth fade between pages

### Responsive Breakpoints
- Desktop: > 1024px (sidebar visible)
- Tablet: 768px - 1024px (collapsed sidebar)
- Mobile: < 768px (bottom nav, stacked layouts)

### Visual Pacing
- Hero metrics: Large numbers with gradient text
- Card grids: 3 columns desktop, 2 tablet, 1 mobile
- Detail pages: Single column with generous whitespace

## 4. Features & Interactions

### Authentication
- **Login Page**:
  - Email + Password fields with validation
  - Demo credentials: demo@user.com / 123456
  - Loading state with spinner on submit
  - Error state with shake animation + red border
  - Redirect to dashboard on success

- **Signup Page**:
  - Email, Password, Confirm Password fields
  - Password strength indicator
  - Terms checkbox
  - Validation: email format, password min 6 chars, match

### Dashboard
- **Metrics Cards** (animated counters):
  - Total Monthly Spending (₹)
  - Total Yearly Spending (₹)
  - Active Subscriptions count
  
- **Charts**:
  - Monthly spending bar chart (last 6 months)
  - Yearly trend line chart
  - Animated on scroll into view

- **Upcoming Renewals**:
  - Countdown timers for next 5 renewals
  - Days remaining badge
  - Quick action to view details

### Add Subscription
- **Form Fields**:
  - Platform dropdown (Netflix, Prime, Hotstar, Spotify, YouTube Premium)
  - Cost input (₹) with currency formatting
  - Billing cycle toggle (Monthly/Yearly)
  - Next renewal date picker
  - Subscription type (Basic/Premium)
  - Payment method (UPI/Card/Wallet)
  - Auto-renew toggle
  
- **Behavior**:
  - Save → success animation → redirect to subscriptions
  - Validation with inline error messages
  - Cost auto-calculation for yearly to monthly

### Subscriptions List
- **Card Layout**:
  - Platform logo + name
  - Cost prominently displayed
  - Renewal date with countdown
  - Status badge (Active/Expiring Soon/Expired)
  
- **Actions**:
  - Click card → detail page
  - Edit button (pencil icon)
  - Delete button (trash icon) with confirmation
  
- **Features**:
  - Search by platform name
  - Sort by: Price, Renewal Date, Name
  - Filter by: Status, Platform, Billing Cycle

### Subscription Detail
- **Header**: Large logo, platform name, status badge
- **Info Grid**:
  - Platform Name, Type, Status
  - Cost, Billing Cycle
  - Next Renewal, Last Payment, Start Date
  - Days Remaining (live countdown)
  - Total Duration, Total Spent
  
- **AI Insights Panel**:
  - Usage frequency (Frequent/Rare)
  - Days since last use notification
  - Recommendation (Keep/Cancel)
  - Savings if cancelled
  
- **Payment Info**:
  - Payment method with icon
  - Auto-renew toggle (visual only)
  
- **Mini Analytics**:
  - Spending trend for this subscription
  
- **Actions**:
  - Edit button → edit modal
  - Delete button → confirmation modal
  - "How to Cancel" guide → expandable section

### AI Insights Page
- **Total Spending Analysis**:
  - Monthly vs Yearly comparison
  - Biggest expense highlight
  
- **Savings Suggestions**:
  - Unused subscriptions (no activity > 30 days)
  - Potential savings amount
  
- **Recommendations**:
  - Keep list with usage stats
  - Cancel list with reasons

### Calendar View
- **Monthly Calendar**:
  - Grid layout with renewal dates marked
  - Color coded by platform
  - Click date → subscriptions renewing that day
  
- **Upcoming List**:
  - Chronological list below calendar
  - Days remaining for each

### Settings
- **Profile Section**:
  - Avatar (initials)
  - Email display
  - Account type
  
- **Preferences**:
  - Currency (₹ default)
  - Notification settings
  
- **Actions**:
  - Logout button (clears session)

### Notifications
- **Bell Icon**:
  - Badge with count
  - Dropdown panel on click
  
- **Notification Types**:
  - Upcoming renewal reminders
  - Unused subscription warnings
  - Price change alerts

## 5. Component Inventory

### Button
- **States**: Default, Hover (scale + glow), Active (pressed), Disabled (opacity 0.5), Loading (spinner)
- **Variants**: Primary (gradient), Secondary (outline), Ghost, Danger

### Input
- **States**: Default, Focus (glow border), Error (red border + message), Disabled
- **Types**: Text, Email, Password, Number, Date

### Card
- **Default**: Glass background, subtle border
- **Hover**: Lift effect, border glow
- **Active**: Selected state with accent border

### Modal
- **Backdrop**: Dark overlay with blur
- **Content**: Glass card, centered
- **Animation**: Fade in + scale up

### Badge
- **Variants**: Success (green), Warning (amber), Danger (red), Info (blue), Neutral (gray)

### Toast
- **Types**: Success, Error, Warning, Info
- **Behavior**: Slide in from top-right, auto-dismiss 3s

### Chart
- **Theme**: Dark background, gradient fills, white text
- **Animation**: Draw in on load

### Skeleton
- **Shimmer**: Gradient animation left to right
- **Shapes**: Rectangle, circle, text lines

## 6. Technical Approach

### Architecture
- **Single Page Application** with vanilla JavaScript
- **No framework** - pure HTML, CSS, JS for maximum performance
- **Module pattern** for code organization

### File Structure
```
/
├── index.html (main entry, auth pages)
├── dashboard.html
├── subscriptions.html
├── subscription-detail.html
├── add-subscription.html
├── insights.html
├── calendar.html
├── settings.html
├── css/
│   ├── style.css (global styles)
│   ├── dashboard.css
│   ├── subscriptions.css
│   └── components.css
├── js/
│   ├── app.js (core functions)
│   ├── auth.js (authentication)
│   ├── dashboard.js
│   ├── subscriptions.js
│   ├── data.js (localStorage management)
│   └── charts.js (Chart.js integration)
└── assets/
    └── images/
```

### Data Model
```javascript
User {
  email: string,
  name: string,
  createdAt: timestamp
}

Subscription {
  id: uuid,
  platform: string,
  cost: number,
  billingCycle: 'monthly' | 'yearly',
  nextRenewal: date,
  lastPayment: date,
  startDate: date,
  type: 'basic' | 'premium',
  paymentMethod: 'upi' | 'card' | 'wallet',
  autoRenew: boolean,
  status: 'active' | 'expiring' | 'expired',
  lastUsed: date,
  notifications: {
    renewal: boolean,
    unused: boolean
  }
}
```

### Local Storage Keys
- `subsmart_user`: Current user object
- `subsmart_subscriptions`: Array of subscriptions
- `subsmart_settings`: User preferences

### Demo Data
```javascript
[
  {
    id: '1',
    platform: 'Netflix',
    cost: 499,
    billingCycle: 'monthly',
    nextRenewal: addDays(new Date(), 5),
    lastPayment: subtractDays(new Date(), 25),
    startDate: subtractMonths(new Date(), 6),
    type: 'premium',
    paymentMethod: 'card',
    autoRenew: true,
    status: 'active',
    lastUsed: subtractDays(new Date(), 2)
  },
  {
    id: '2',
    platform: 'Prime',
    cost: 1499,
    billingCycle: 'yearly',
    nextRenewal: addDays(new Date(), 45),
    lastPayment: subtractDays(new Date(), 320),
    startDate: subtractMonths(new Date(), 12),
    type: 'premium',
    paymentMethod: 'upi',
    autoRenew: true,
    status: 'active',
    lastUsed: subtractDays(new Date(), 7)
  },
  {
    id: '3',
    platform: 'Hotstar',
    cost: 299,
    billingCycle: 'monthly',
    nextRenewal: addDays(new Date(), 12),
    lastPayment: subtractDays(new Date(), 18),
    startDate: subtractMonths(new Date(), 3),
    type: 'basic',
    paymentMethod: 'wallet',
    autoRenew: true,
    status: 'active',
    lastUsed: subtractDays(new Date(), 45)
  }
]
```

### Platform Icons & Colors
- Netflix: #E50914 (Red)
- Prime: #00A8E1 (Blue)
- Hotstar: #1F80E0 (Disney Blue)
- Spotify: #1DB954 (Green)
- YouTube Premium: #FF0000 (YouTube Red)

### Chart.js Configuration
- Dark theme background
- Gradient fills using platform colors
- Custom tooltip styling
- Responsive sizing
- Animation duration: 600ms
