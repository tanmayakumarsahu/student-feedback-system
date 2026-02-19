import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useFeedback } from '../data/FeedbackContext';
import { pageVariants, containerVariants, itemVariants, buttonVariants } from '../animations/variants';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useFeedback();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    try {
      login(email, password, role);
      navigate(role === 'admin' ? '/admin/dashboard' : '/student/dashboard');
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={pageVariants}
      className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-6"
    >
      <motion.div
        variants={containerVariants}
        className="w-full max-w-3xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
      >
        {/* Left: Marketing / Branding */}
        <motion.div variants={itemVariants} className="hidden lg:flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center shadow-xl">
              <span className="text-white font-serif text-xl">FS</span>
            </div>
            <div>
              <h2 className="text-3xl font-serif text-gray-900">Feedback System</h2>
              <p className="text-sm text-gray-500">Premium Student Evaluation Platform</p>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-md border border-gray-100 rounded-2xl p-6 shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Academic insights that scale</h3>
            <p className="text-gray-600 text-sm">Collect structured feedback, analyze trends, and improve outcomes with actionable dashboards.</p>
          </div>

          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="inline-block bg-indigo-50 text-indigo-700 rounded-full p-2">✓</span>
              <div>
                <p className="text-sm font-medium text-gray-900">Secure single-sign on</p>
                <p className="text-xs text-gray-500">Enterprise ready auth flows</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="inline-block bg-indigo-50 text-indigo-700 rounded-full p-2">✓</span>
              <div>
                <p className="text-sm font-medium text-gray-900">Beautiful analytics</p>
                <p className="text-xs text-gray-500">Charts and insights for instructors and admins</p>
              </div>
            </li>
          </ul>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          variants={itemVariants}
          className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 lg:p-10"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-serif text-gray-900">Welcome back</h1>
              <p className="text-sm text-gray-500">Sign in to continue to your dashboard</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500">
              <span className="px-2 py-1 rounded-lg bg-gray-50 border border-gray-100">Student</span>
              <span className="px-2 py-1 rounded-lg bg-gray-50 border border-gray-100">Admin</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Mail size={16} /> Email address
              </label>
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@school.edu"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Lock size={16} /> Password
              </label>
              <motion.input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200 transition"
              />
            </div>

            <div className="flex gap-3">
              {['student', 'admin'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 text-sm py-2 rounded-lg font-medium transition ${
                    role === r
                      ? 'bg-[#111827] text-white shadow-md border border-[#111827]'
                      : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {r === 'student' ? 'Student' : 'Admin'}
                </button>
              ))}
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-50 border border-red-100 rounded-md text-red-700 text-sm"
              >
                {error}
              </motion.div>
            )}

            <motion.button
              type="submit"
              whileHover={{ y: -3 }}
              className="w-full inline-flex items-center justify-center gap-3 py-3 rounded-lg font-semibold text-white bg-gradient-to-br from-[#6366F1] to-[#4F46E5] shadow-md"
            >
              <LogIn size={18} />
              Sign in
            </motion.button>
          </form>

          <div className="mt-6 bg-gray-50 border border-gray-100 rounded-lg p-4 text-xs text-gray-600">
            <p className="font-semibold text-gray-800 text-sm">Demo Credentials</p>
            <div className="flex flex-wrap gap-3 mt-2">
              <div className="text-xs bg-white border border-gray-100 rounded px-2 py-1">Student: <span className="font-mono">student</span></div>
              <div className="text-xs bg-white border border-gray-100 rounded px-2 py-1">Admin: <span className="font-mono">admin</span></div>
              <div className="text-xs bg-white border border-gray-100 rounded px-2 py-1">Password: <span className="font-mono">any</span></div>
            </div>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">FSAD-PS33 © {new Date().getFullYear()}</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
