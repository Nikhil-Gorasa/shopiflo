# Shopiflo - E-Commerce Application

A modern, full-featured e-commerce platform built with Next.js 14, TypeScript, Redux Toolkit, and TailwindCSS. Features include user authentication, product browsing with advanced filters, shopping cart, favorites management, and a complete checkout flow with geolocation support.

## ✨ Features

### 🔐 Authentication

- User registration and login with form validation
- Password visibility toggle
- Secure password hashing with bcryptjs
- Protected routes with automatic redirects
- Multi-user support with isolated data

### 🛍️ Shopping Experience

- Product catalog with category-based filtering
- Advanced filtering by price range and ratings
- Search functionality|
- Product details with reviews and specifications
- Add to cart with quantity management
- Favorites/wishlist functionality
- Real-time cart and favorites count badges

### 📦 Checkout Process

- Multi-step checkout flow (Address → Payment → Confirm)
- Personal information management
- Geolocation-powered address auto-fill
- International phone number support with country codes
- Payment card details with validation
- Form data persistence across sessions

### 🎨 UI/UX

- Responsive design (mobile, tablet, desktop)
- Loading skeletons and states
- Error boundaries for graceful error handling
- Toast notifications for user feedback
- Smooth animations and transitions
- Mobile bottom navigation

### ⚡ Performance

- Lazy loading for heavy components
- Code splitting with Next.js App Router
- Image optimization with next/image
- Static and dynamic rendering
- Production-ready build optimization

## 🚀 Tech Stack

- **Framework:** Next.js 14.2.35 (App Router)
- **Language:** TypeScript 5
- **Styling:** TailwindCSS 3.4
- **State Management:** Redux Toolkit 2.11
- **Form Management:** React Hook Form 7.71
- **Icons:** Heroicons 2.2
- **Notifications:** React Hot Toast 2.6
- **Authentication:** bcryptjs 3.0

## 📁 Project Structure

```
shopiflo/
├── src/
│   ├── _components/          # Reusable components
│   │   ├── cart/            # Cart-related components
│   │   ├── CategoriesBar/   # Category navigation
│   │   ├── checkout/        # Checkout flow components
│   │   ├── footer/          # Footer component
│   │   ├── Loader/          # Loading states
│   │   ├── Navbar/          # Navigation components
│   │   ├── ProductOverview/ # Product detail components
│   │   ├── products/        # Product listing components
│   │   └── Sidebar/         # Filter sidebar
│   ├── _utils/              # Utility functions
│   │   ├── constants/       # App constants
│   │   ├── context/         # React contexts
│   │   └── helpers/         # Helper functions
│   ├── app/                 # Next.js App Router pages
│   │   ├── checkout/        # Checkout pages
│   │   ├── dashboard/       # Protected dashboard pages
│   │   ├── login/           # Login page
│   │   └── sign-up/         # Registration page
│   ├── hooks/               # Custom React hooks
│   ├── redux/               # Redux store and slices
│   │   └── Slices/
│   │       ├── auth/        # Authentication state
│   │       ├── cart/        # Shopping cart state
│   │       ├── checkout/    # Checkout state
│   │       └── favourites/  # Favorites state
│   └── types/               # TypeScript type definitions
├── public/                  # Static assets
└── Configuration files
```

## 🛠️ Installation

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Setup

1. **Clone the repository**

    ```bash
    git clone <repository-url>
    cd shopiflo
    ```

2. **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3. **Run development server**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

4. **Open the application**
    - Navigate to [http://localhost:3000](http://localhost:3000)

5. **Build for production**
    ```bash
    npm run build
    npm start
    ```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build production-ready application
- `npm start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🔑 Key Features Implementation

### Redux State Management

- **Auth Slice:** User authentication state with async thunks
- **Cart Slice:** Shopping cart with localStorage persistence
- **Favorites Slice:** Wishlist management per user
- **Checkout Slice:** Multi-step checkout data storage

### Form Validation

- Email pattern validation
- Password strength requirements (8+ chars, uppercase, lowercase, number, special char)
- Phone number validation (7-15 digits)
- Card details validation (16-digit card number, 3-digit CVV, MM/YY expiry)
- Alphabetic-only name validation

### Geolocation Integration

- Browser geolocation API
- Reverse geocoding with BigDataCloud API
- Auto-fill address fields from coordinates
- Error handling for location permissions

### Protected Routes

- Custom `useProtectedRoute` hook
- Automatic redirect to login for unauthenticated users
- Redirect to products after login

### Error Handling

- Route-level error boundaries (`error.tsx`)
- Global error boundary (`global-error.tsx`)
- User-friendly error messages
- Reset and retry functionality

## 🎯 User Flow

1. **Registration/Login** → Sign up or log in with credentials
2. **Browse Products** → View products by categories with filters
3. **Product Details** → View detailed information, reviews, specs
4. **Add to Cart/Favorites** → Save items for purchase or later
5. **Checkout - Address** → Enter shipping details (with auto-fill)
6. **Checkout - Payment** → Enter payment card details
7. **Checkout - Confirm** → Review and confirm order

## 🌐 API Integration

- **Products API:** DummyJSON API for product data
- **Geolocation:** BigDataCloud reverse geocoding API
- **Authentication:** Local storage-based auth system

## 🎨 Design Highlights

- Clean, modern UI with consistent color scheme
- Responsive breakpoints: mobile (< 768px), tablet (768px-1024px), desktop (> 1024px)
- Consistent spacing and typography using TailwindCSS utilities
- Accessibility-focused form inputs with proper labels
- Loading states and skeletons for better UX

## 🔒 Security Features

- Password hashing with bcryptjs
- Client-side form validation
- Protected route authentication
- Secure local storage data management
- No sensitive data in URLs

## 📱 Responsive Design

- Mobile-first approach
- Bottom navigation for mobile devices
- Collapsible sidebar filters
- Touch-friendly interactive elements
- Optimized images for all screen sizes

## 🚦 Performance Optimizations

- Lazy loading with React.lazy() and Suspense
- Code splitting at route level (Next.js automatic)
- Component-level code splitting for heavy components
- Image optimization with next/image
- Memoization with useMemo where needed
- Efficient Redux state updates

## 🐛 Error Boundaries

- **Route-level errors:** Caught by `error.tsx` in each route
- **Global errors:** Caught by `global-error.tsx` at root level
- User-friendly error messages
- Retry functionality
- Navigation to safe pages

## 📦 Build Output

Production build generates:

- Optimized static pages
- Dynamic server-rendered pages
- Code-split chunks for optimal loading
- Minimized CSS and JavaScript
- Compressed assets
