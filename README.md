# Career Path AI Advisor 🚀

> AI-powered career guidance platform built for hackathon MVP

A full-stack web application that provides personalized career recommendations using AI-driven insights. Built with React, Express.js, and Firebase for rapid deployment and scalability.

## 🌟 Features

- **AI-Powered Career Assessment** - Smart questionnaire analyzing skills, interests, and goals
- **Personalized Recommendations** - Tailored career paths based on user profile
- **Interactive Dashboard** - Track progress and view career insights
- **User Profile Management** - Comprehensive profile with skills and interests
- **Responsive Design** - Mobile-first design with Tailwind CSS
- **Firebase Integration** - Authentication and real-time database

## 🏗️ Project Structure

```
career-path-ai-advisor/
├── frontend/                 # React application
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   ├── App.js          # Main app component
│   │   └── index.js        # Entry point
│   ├── package.json
│   └── tailwind.config.js
├── backend/                 # Express.js API
│   ├── src/
│   │   ├── controllers/    # Route controllers
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── middleware/     # Custom middleware
│   │   └── app.js          # Express app setup
│   ├── package.json
│   └── .env.example
├── shared/                 # Shared configurations
│   └── config/
│       └── firebase-admin.js
├── package.json            # Root package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)
- Firebase account (optional for basic functionality)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gyanchandra2910/career-path-ai-advisor.git
   cd career-path-ai-advisor
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   
   **Backend (.env):**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your configuration
   ```

   **Frontend (.env.local):**
   ```bash
   cd ../frontend
   cp .env.local.example .env.local
   # Edit .env.local with your Firebase config
   ```

4. **Start development servers**
   ```bash
   cd ..
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

## 📦 Available Scripts

### Root Level
- `npm run dev` - Start both frontend and backend in development mode
- `npm start` - Start both frontend and backend in production mode
- `npm run install:all` - Install dependencies for all packages
- `npm run build` - Build frontend for production
- `npm test` - Run tests for both frontend and backend

### Frontend
- `npm start` - Start React development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Lint code

### Backend
- `npm run dev` - Start with nodemon (auto-restart)
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Lint code

## 🔧 Configuration

### Firebase Setup (Optional)

1. Create a Firebase project at https://console.firebase.google.com
2. Enable Authentication and Firestore
3. Get your configuration from Project Settings
4. Update environment variables in both frontend and backend

### Environment Variables

**Backend (.env):**
```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
API_KEY=your_api_key_here
FIREBASE_PROJECT_ID=your_project_id
# ... other Firebase config
```

**Frontend (.env.local):**
```env
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
# ... other Firebase config
```

## 🎯 API Endpoints

### Health Check
- `GET /health` - Server health status

### Career Routes
- `POST /api/career/advice` - Get AI career advice
- `GET /api/career/profile/:userId` - Get user profile
- `POST /api/career/profile` - Create user profile
- `PUT /api/career/profile/:userId` - Update user profile
- `GET /api/career/paths` - Get available career paths
- `POST /api/career/analyze` - Analyze user skills

## 🎨 UI Components

- **Header** - Navigation with responsive mobile menu
- **Footer** - Links and contact information
- **Home** - Landing page with hero section and features
- **Dashboard** - User analytics and recommendations
- **CareerAssessment** - Multi-step form for career evaluation
- **Profile** - User profile management

## 🛠️ Technology Stack

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Firebase** - Authentication and database
- **Axios** - HTTP client

### Backend
- **Express.js** - Web framework
- **Firebase Admin** - Server-side Firebase integration
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security middleware
- **Morgan** - HTTP request logger

### Development Tools
- **Concurrently** - Run multiple scripts
- **Nodemon** - Auto-restart server
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 🚀 Deployment

### Frontend (Netlify/Vercel)
1. Build the project: `npm run build:frontend`
2. Deploy the `frontend/build` folder
3. Set environment variables in your deployment platform

### Backend (Heroku/Railway/DigitalOcean)
1. Set environment variables
2. Deploy from the `backend` folder
3. Ensure `npm start` command is configured

### Full Stack (Railway/Render)
1. Use the root `package.json`
2. Set build command: `npm run build`
3. Set start command: `npm start`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 🐛 Troubleshooting

### Common Issues

**Firebase Configuration Errors:**
- Ensure all Firebase environment variables are set correctly
- Check if Firebase services are enabled in your project

**CORS Issues:**
- Verify frontend URL is correctly set in backend CORS configuration
- Check if API endpoint URLs are correct

**Build Failures:**
- Run `npm run clean` and reinstall dependencies
- Check Node.js and npm versions meet requirements

### Development Tips

- Use `npm run dev` for concurrent development
- Check browser console and server logs for errors
- Ensure all environment variables are set before starting

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built for hackathon rapid development
- Inspired by modern career guidance needs
- Thanks to the open-source community

## 📞 Support

For support, email gyanchandra2910@example.com or create an issue in the repository.

---

**Happy Coding! 🎉**
