# FSAD-PS33: Student Feedback & Evaluation System

A professional full-stack frontend system for managing student feedback and course evaluations. Built with React, Vite, Tailwind CSS, and Recharts.

## 🎯 Project Overview

This is a modern, responsive web application designed for educational institutions to collect, manage, and analyze student feedback about courses and instructors. The system supports two user roles: **Students** and **Admins** (Teachers/Institution), with completely separate dashboards and features for each.

### Key Features

#### 👨‍🎓 Student Features
- **View Feedback Forms**: Browse all available courses for evaluation
- **Submit Feedback**: Rate courses with 1-5 stars and provide detailed comments
- **View Results**: See aggregated feedback results and statistics
- **Personal Dashboard**: Track all submitted feedback

#### 👨‍💼 Admin Features
- **Create Feedback Forms**: Add new courses and instructors for evaluation
- **View All Feedback**: Monitor all student submissions in detail
- **Advanced Analytics**: Visual charts and insights (bar charts, pie charts)
- **Performance Metrics**: Track highest/lowest rated courses and instructor rankings

## 🏗️ Project Structure

```
src/
├── components/          # Reusable React components
│   ├── Sidebar.jsx      # Navigation sidebar
│   ├── ProtectedRoute.jsx # Route protection component
│   ├── StatCard.jsx     # Statistical card display
│   └── RatingStars.jsx  # Interactive star rating component
├── pages/               # Page components for routing
│   ├── Login.jsx        # Authentication page
│   ├── StudentDashboard.jsx      # Student home
│   ├── SubmitFeedback.jsx        # Feedback submission form
│   ├── ViewFeedbackResults.jsx   # Student analytics view
│   ├── AdminDashboard.jsx        # Admin home
│   ├── CreateFeedbackForm.jsx    # Form creation page
│   ├── ViewFeedback.jsx          # Admin feedback viewer
│   └── AdminAnalytics.jsx        # Advanced analytics dashboard
├── data/                # State management & data
│   ├── FeedbackContext.jsx  # Global state with hooks
│   └── dummyData.js         # Mock data & utility functions
├── App.jsx              # Main app router and layout
├── main.jsx             # Entry point
└── index.css            # Global styles & Tailwind CSS
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. **Navigate to project directory**
   ```bash
   cd feedback-system
   ```

2. **Install dependencies** (already done)
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   
   The app will be available at `http://localhost:5174`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## 🔐 Authentication

The system uses **mock authentication** (no backend required). You can log in with any credentials:

### Demo Credentials
- **Student Login**: Any email/password (e.g., `student@test.com` / `password`)
- **Admin Login**: Any email/password (e.g., `admin@test.com` / `password`)

**Note**: The role selection on the login page determines access (Student or Admin)

## 🎨 Technology Stack

| Technology | Purpose |
|---|---|
| **React 19** | UI framework with hooks |
| **Vite 8** | Fast build tool & dev server |
| **React Router DOM 7** | Client-side routing |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **Recharts 3** | Data visualization charts |
| **PostCSS** | CSS processing |

## 📋 User Flows

### Student User Flow
1. Login with role selection → Student
2. View Dashboard (submissions overview)
3. Navigate to "Submit Feedback"
4. Select course and instructor
5. Provide rating and comments
6. View aggregated results in "View Results"

### Admin User Flow
1. Login with role selection → Admin
2. View Dashboard (overview stats & recent submissions)
3. Create new feedback forms
4. View all feedback submissions with filters
5. Analyze data with advanced charts and metrics

## 🎯 Pages & Routes

### Public Routes
- `/` - Redirect to login
- `/login` - Authentication page

### Student Protected Routes
- `/student/dashboard` - Dashboard with submission history
- `/student/forms` - Submit new feedback
- `/student/results` - View feedback results

### Admin Protected Routes
- `/admin/dashboard` - Admin dashboard
- `/admin/create-form` - Create feedback forms
- `/admin/feedback` - View all feedback submissions
- `/admin/analytics` - Detailed analytics dashboard

## 🎨 Design System

### Colors
- **Primary**: Indigo (#4F46E5) - Student theme
- **Secondary**: Blue (#2563EB) - Admin theme
- **Accent colors**: Green, Purple, Orange for various UI elements

### Component Styles
- **Cards**: Rounded corners with shadow and hover effects
- **Buttons**: Gradient backgrounds with smooth transitions
- **Inputs**: Clean border-based design with focus states
- **Charts**: Professional Recharts components

### Responsive Design
- Mobile-first approach
- Sidebar collapses on smaller screens
- Grid layouts adapt to screen size
- All pages are fully responsive

## 📊 Sample Data

The project includes dummy data for:
- 4 sample feedback forms with courses and instructors
- 6 sample feedback submissions with ratings and comments
- Realistic statistics and analytics

You can modify `src/data/dummyData.js` to change the sample data.

## 🔧 Core Features Explained

### Context API (Global State)
The `FeedbackContext` manages:
- Current user and role
- All feedback submissions
- All feedback forms
- Methods to submit feedback and create forms

Usage:
```jsx
const { currentUser, feedbacks, submitFeedback } = useFeedback();
```

### Protected Routes
The `ProtectedRoute` component ensures:
- Only authenticated users can access protected pages
- Users can only access pages for their role
- Unauthenticated users are redirected to login

### Real-time Analytics
- Automatic calculation of statistics
- Group feedbacks by course and instructor
- Generate rating distributions
- Calculate averages and trends

## 📈 Charts & Visualizations

### Student View
- **Pie Chart**: Rating distribution across all courses
- **Bar Chart**: Average ratings by course
- **Instructor Rankings**: Individual instructor performance

### Admin View
- **Rating Distribution**: Pie chart of feedback ratings
- **Course Ratings**: Bar chart of average ratings
- **Instructor Rankings**: Ranked list with performance metrics
- **Detailed Statistics**: Course-wise and instructor-wise breakdowns

## 💾 Persistence

Currently, all data is stored in React Context (in-memory). When you refresh the page:
- The dummy data is reloaded
- Any submitted feedback during the session is lost

To add persistence, integrate with:
- **Local Storage**: Browser-based storage
- **Backend API**: Database storage
- **Firebase**: Cloud storage

## 🧪 Testing

Test the application with different scenarios:
1. **Login**: Try different roles (Student/Admin)
2. **Student Workflow**: Submit feedback and view results
3. **Admin Workflow**: Create forms and analyze feedback
4. **Filtering**: Use the filter options in feedback viewer
5. **Responsive Design**: Resize browser to test mobile view

## 📝 Best Practices Implemented

✅ **Component Structure**: Modular, single-responsibility components  
✅ **State Management**: Context API for global state  
✅ **Routing**: Protected routes with role-based access  
✅ **CSS**: Tailwind utility classes for consistency  
✅ **Accessibility**: Semantic HTML and proper labels  
✅ **Performance**: Lazy loading and code splitting ready  
✅ **Code Organization**: Clear folder structure and naming  
✅ **User Experience**: Loading states, error handling, feedback

## 🚀 Future Enhancements

- [ ] Backend API integration
- [ ] Database (MongoDB, PostgreSQL)
- [ ] User authentication (JWT)
- [ ] Real email notifications
- [ ] File uploads
- [ ] Advanced filtering and sorting
- [ ] PDF export reports
- [ ] Dark mode
- [ ] Multi-language support
- [ ] Real-time notifications

## 📄 License

This project is created for academic purposes (FSAD-PS33: Student Feedback and Evaluation System).
