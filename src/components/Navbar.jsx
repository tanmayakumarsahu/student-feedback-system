import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogOut, Menu, X } from 'lucide-react';
import { useFeedback } from '../data/FeedbackContext';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { userRole, logout } = useFeedback();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const navItems = {
    student: [
      { label: 'Dashboard', path: '/student/dashboard' },
      { label: 'Submit Feedback', path: '/student/forms' },
      { label: 'Results', path: '/student/results' }
    ],
    admin: [
      { label: 'Dashboard', path: '/admin/dashboard' },
      { label: 'Feedback', path: '/admin/feedback' },
      { label: 'Create Form', path: '/admin/create-form' },
      { label: 'Analytics', path: '/admin/analytics' }
    ]
  };

  const items = navItems[userRole] || [];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => navigate(userRole === 'admin' ? '/admin/dashboard' : '/student/dashboard')}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-playfair font-bold text-lg">FS</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-600 text-gray-900">Feedback</span>
              <span className="text-xs text-gray-500">System</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {items.map((item) => (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`relative font-medium text-sm transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'text-gray-900'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                whileHover={{ y: -2 }}
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {userRole && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout}
                className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
              >
                <LogOut size={16} />
                Sign Out
              </motion.button>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-200 mt-4 pt-4 pb-4 space-y-3"
          >
            {items.map((item) => (
              <motion.button
                key={item.path}
                onClick={() => {
                  navigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors duration-200 ${
                  isActive(item.path)
                    ? 'bg-indigo-100 text-indigo-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.label}
              </motion.button>
            ))}
            {userRole && (
              <motion.button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 rounded-lg text-gray-600 hover:bg-red-50 hover:text-red-600 flex items-center gap-2"
              >
                <LogOut size={16} />
                Sign Out
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
