# PayApp - Digital Wallet Frontend

A beautiful, modern payment application built with React, TypeScript, and Tailwind CSS.

## Features

### 🔐 Authentication
- **Sign Up**: Create new account with email and password
- **Sign In**: Secure login with JWT token authentication
- **Profile Management**: Update personal information

### 💰 Payment Features
- **Dashboard**: View account balance and quick actions
- **Send Money**: Transfer funds to other users
- **User Search**: Find recipients by name
- **Balance Display**: Real-time balance updates

### 🎨 Beautiful UI/UX
- Modern gradient designs
- Responsive layout for all devices
- Smooth animations and transitions
- Intuitive user interface

## Pages

1. **Signup** (`/signup`) - Create new account
2. **Signin** (`/signin`) - Login to existing account
3. **Dashboard** (`/` or `/dashboard`) - Main overview page
4. **Send Money** (`/send`) - Transfer money to other users
5. **Profile** (`/profile`) - Manage account settings

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Icons**: Heroicons (SVG)
- **Build Tool**: Vite

## API Integration

The frontend connects to the backend API with the following endpoints:

- `POST /api/v1/signup` - User registration
- `POST /api/v1/login` - User authentication
- `GET /api/v1/balance` - Get account balance
- `POST /api/v1/transaction` - Transfer money
- `GET /api/v1/bulk` - Search users
- `POST /api/v1/update` - Update profile

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

## Authentication Flow

1. Users must sign up with email, password, first name, and last name
2. After successful signup, users are redirected to signin
3. Upon signin, JWT token is stored in localStorage
4. Protected routes check for valid token
5. Users can access dashboard, send money, and profile features

## Design Philosophy

- **Clean & Modern**: Minimalist design with focus on usability
- **Responsive**: Works seamlessly on desktop, tablet, and mobile
- **Accessible**: Proper contrast ratios and keyboard navigation
- **Fast**: Optimized performance with modern React patterns

## Component Structure

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx      # Enhanced button with gradients
│   ├── Heading.tsx     # Page headings
│   ├── InputBox.tsx    # Form inputs with validation
│   └── Subheading.tsx  # Subtitle component
├── pages/              # Route components  
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Profile.tsx     # User profile management
│   ├── SendMoney.tsx   # Money transfer flow
│   ├── Signin.tsx      # Authentication
│   └── Signup.tsx      # User registration
└── App.tsx            # Main app with routing
```

## Color Scheme

- **Primary**: Blue to Purple gradients
- **Secondary**: Green for money actions
- **Neutral**: Gray tones for text and backgrounds
- **Accent**: Pink and purple for profile sections

## Security Features

- Password fields are properly masked
- JWT tokens stored securely in localStorage  
- API calls include proper authorization headers
- Form validation on all inputs
- Error handling for failed requests

---

Built with ❤️ using modern web technologies
