import React from 'react';
import { NavLink } from 'react-router-dom';
import { useFeedback } from '../data/FeedbackContext';

export default function Sidebar() {
  const { userRole, logout } = useFeedback();

  if (userRole === 'student') {
    return (
      <aside className="w-64 h-screen bg-gradient-to-b from-indigo-700 to-indigo-900 text-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-8 border-b border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 text-white rounded-xl p-2 w-10 h-10 flex items-center justify-center font-bold backdrop-blur-sm">
              FS
            </div>
            <h1 className="text-xl font-bold">Feedback</h1>
          </div>
          <p className="text-indigo-200 text-xs font-medium">Student Portal</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <NavLink
            to="/student/dashboard"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-white/20 text-white font-semibold shadow-lg'
                  : 'hover:bg-white/10 text-indigo-100'
              }`
            }
          >
            📊 Dashboard
          </NavLink>
          <NavLink
            to="/student/forms"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-white/20 text-white font-semibold shadow-lg'
                  : 'hover:bg-white/10 text-indigo-100'
              }`
            }
          >
            📝 Submit Feedback
          </NavLink>
          <NavLink
            to="/student/results"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-white/20 text-white font-semibold shadow-lg'
                  : 'hover:bg-white/10 text-indigo-100'
              }`
            }
          >
            📈 View Results
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="px-4 py-6 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 px-4 rounded-full transition-all duration-200 border border-white/20 shadow-lg"
          >
            🚪 Logout
          </button>
        </div>
      </aside>
    );
  }

  if (userRole === 'admin') {
    return (
      <aside className="w-64 h-screen bg-gradient-to-b from-blue-700 to-blue-900 text-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="px-6 py-8 border-b border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 text-white rounded-xl p-2 w-10 h-10 flex items-center justify-center font-bold backdrop-blur-sm">
              AD
            </div>
            <h1 className="text-xl font-bold">Admin</h1>
          </div>
          <p className="text-blue-200 text-xs font-medium">Admin Portal</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-white/20 text-white font-semibold shadow-lg'
                  : 'hover:bg-white/10 text-blue-100'
              }`
            }
          >
            📊 Dashboard
          </NavLink>
          <NavLink
            to="/admin/create-form"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-white/20 text-white font-semibold shadow-lg'
                  : 'hover:bg-white/10 text-blue-100'
              }`
            }
          >
            ➕ Create Form
          </NavLink>
          <NavLink
            to="/admin/feedback"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-white/20 text-white font-semibold shadow-lg'
                  : 'hover:bg-white/10 text-blue-100'
              }`
            }
          >
            💬 View Feedback
          </NavLink>
          <NavLink
            to="/admin/analytics"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-white/20 text-white font-semibold shadow-lg'
                  : 'hover:bg-white/10 text-blue-100'
              }`
            }
          >
            📈 Analytics
          </NavLink>
        </nav>

        {/* Footer */}
        <div className="px-4 py-6 border-t border-white/10">
          <button
            onClick={logout}
            className="w-full bg-white/10 hover:bg-white/20 text-white font-semibold py-2.5 px-4 rounded-full transition-all duration-200 border border-white/20 shadow-lg"
          >
            🚪 Logout
          </button>
        </div>
      </aside>
    );
  }

  return null;
}
