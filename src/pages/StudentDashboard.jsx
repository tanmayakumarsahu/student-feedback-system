import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileText, Star, BarChart3, Send, TrendingUp, MessageSquare, Calendar } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useFeedback } from '../data/FeedbackContext';
import { getFeedbackStats } from '../data/dummyData';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { feedbacks, currentUser } = useFeedback();
  const stats = getFeedbackStats(feedbacks || []);

  const avgRatingFormatted = (stats && stats.averageRating !== undefined && !Number.isNaN(Number(stats.averageRating)))
    ? Number(stats.averageRating).toFixed(1)
    : '0';

  const userFeedbacks = (feedbacks || []).filter((f) => f?.studentId === currentUser?.id);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const statCards = [
    { 
      icon: FileText, 
      label: 'Submissions',
      value: userFeedbacks?.length || 0,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      icon: Star, 
      label: 'Avg Rating',
      value: avgRatingFormatted,
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50'
    },
    { 
      icon: BarChart3, 
      label: 'Total Feedback',
      value: stats?.totalFeedback || 0,
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-12"
    >
      {/* Header */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-3">
        <PageHeader dataTest="student-dashboard-header" title="Student Dashboard" subtitle="Track your feedback submissions and explore course evaluations" />
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-8 hover:shadow-xl transition-all duration-300"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              <div className="relative space-y-4">
                <div className={`${stat.bgColor} w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon size={28} className={`bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-4xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Submissions Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="lg:col-span-2 space-y-6"
        >
          {userFeedbacks && userFeedbacks.length > 0 ? (
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="border-b border-gray-200 px-8 py-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <FileText size={24} className="text-indigo-600" />
                  </div>
                  Your Submissions
                </h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Course</th>
                      <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Instructor</th>
                      <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rating</th>
                      <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {userFeedbacks.map((feedback, idx) => (
                      <motion.tr
                        key={idx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-8 py-4 text-sm font-medium text-gray-900">{feedback?.courseName || '-'}</td>
                        <td className="px-8 py-4 text-sm text-gray-600">{feedback?.instructorName || '-'}</td>
                        <td className="px-8 py-4 text-sm">
                          <div className="flex items-center gap-2">
                            <span className="text-yellow-400">{'⭐'.repeat(feedback?.rating || 0)}</span>
                            <span className="font-medium text-gray-900">{feedback?.rating || 0}/5</span>
                          </div>
                        </td>
                        <td className="px-8 py-4 text-sm text-gray-500 flex items-center gap-2">
                          <Calendar size={16} />
                          {feedback?.timestamp || '-'}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          ) : (
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl border border-gray-200 p-16 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-2xl mb-4">
                <FileText size={32} className="text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No submissions yet</h3>
              <p className="text-gray-600 mb-6">Start sharing your course feedback to help improve your institution</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/student/forms')}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors duration-200 inline-flex items-center gap-2"
              >
                <Send size={18} />
                Submit Your First Feedback
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {/* Action Card 1 */}
          <motion.button
            variants={itemVariants}
            whileHover={{ y: -8 }}
            onClick={() => navigate('/student/forms')}
            className="w-full bg-white rounded-2xl border border-gray-200 p-8 text-left hover:shadow-lg transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Send size={24} className="text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Submit Feedback</h3>
            <p className="text-sm text-gray-600">Share your course experience</p>
            <div className="mt-4 text-indigo-600 font-medium text-sm flex items-center gap-2">
              Continue
              <TrendingUp size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>

          {/* Action Card 2 */}
          <motion.button
            variants={itemVariants}
            whileHover={{ y: -8 }}
            onClick={() => navigate('/student/results')}
            className="w-full bg-white rounded-2xl border border-gray-200 p-8 text-left hover:shadow-lg transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 size={24} className="text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">View Results</h3>
            <p className="text-sm text-gray-600">Explore feedback analytics</p>
            <div className="mt-4 text-emerald-600 font-medium text-sm flex items-center gap-2">
              Analyze
              <TrendingUp size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.button>

          {/* Info Card */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-8"
          >
            <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
              <MessageSquare size={20} className="text-blue-600" />
              Did you know?
            </h3>
            <p className="text-sm text-gray-700">
              Your feedback helps instructors improve their teaching methods and creates a better learning environment for everyone.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
