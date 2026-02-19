import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useFeedback } from "../data/FeedbackContext";
import { BarChart3, FileText, BookOpen, Users, TrendingUp, AlertCircle, CheckCircle, Plus } from "lucide-react";
import PageHeader from '../components/PageHeader';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { feedbacks = [], feedbackForms = [] } = useFeedback() || {};

  const totalFeedback = feedbacks.length;
  const averageRating = totalFeedback > 0
    ? (feedbacks.reduce((sum, f) => sum + Number(f.rating || 0), 0) / totalFeedback).toFixed(1)
    : "0.0";

  const instructors = [...new Set(feedbacks.map((f) => f.instructorName))].length;
  const courses = feedbackForms.length;

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
      label: "Total Submissions",
      value: totalFeedback,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: BookOpen,
      label: "Active Courses",
      value: courses,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: TrendingUp,
      label: "Average Rating",
      value: averageRating,
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50"
    },
    {
      icon: Users,
      label: "Instructors",
      value: instructors,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const recentSubmissions = feedbacks.slice(0, 5);
  const highestRated = feedbacks.length > 0 ? feedbacks.reduce((max, f) => (f.rating > max.rating) ? f : max) : null;

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
        <PageHeader dataTest="admin-dashboard-header" title="Admin Dashboard" subtitle="Manage forms, track submissions, and analyze feedback insights" />
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-8 hover:shadow-xl transition-all duration-300"
            >
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
        {/* Left Column */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="lg:col-span-2 space-y-8"
        >
          {/* Top Performers */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="border-b border-gray-200 px-8 py-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <TrendingUp size={24} className="text-emerald-600" />
                </div>
                Highest Rated
              </h2>
            </div>
            <div className="p-8">
              {highestRated ? (
                <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">{highestRated.courseName}</p>
                    <p className="text-sm text-gray-600">By {highestRated.instructorName}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-emerald-600">{highestRated.rating}</p>
                    <p className="text-sm text-gray-600">/5 rating</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No rating data</p>
              )}
            </div>
          </motion.div>

          {/* Recent Submissions */}
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="border-b border-gray-200 px-8 py-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileText size={24} className="text-blue-600" />
                </div>
                Recent Submissions
              </h2>
            </div>
            {recentSubmissions.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Course</th>
                      <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Instructor</th>
                      <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rating</th>
                      <th className="px-8 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Feedback</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentSubmissions.map((submission, idx) => (
                      <motion.tr
                        key={idx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-8 py-4 text-sm font-medium text-gray-900">{submission.courseName}</td>
                        <td className="px-8 py-4 text-sm text-gray-600">{submission.instructorName}</td>
                        <td className="px-8 py-4 text-sm">
                          <span className="font-medium">{submission.rating}/5</span>
                        </td>
                        <td className="px-8 py-4 text-sm text-gray-600 truncate max-w-xs">{submission.comments}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <p>No submissions yet</p>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Right Sidebar */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {/* Quick Actions */}
          <motion.button
            variants={itemVariants}
            whileHover={{ y: -8 }}
            onClick={() => navigate('/admin/create-form')}
            className="w-full bg-white border border-gray-200 rounded-2xl p-8 text-left hover:shadow-lg transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Plus size={24} className="text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Create Form</h3>
            <p className="text-sm text-gray-600">Add new feedback form</p>
          </motion.button>

          <motion.button
            variants={itemVariants}
            whileHover={{ y: -8 }}
            onClick={() => navigate('/admin/feedback')}
            className="w-full bg-white border border-gray-200 rounded-2xl p-8 text-left hover:shadow-lg transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <FileText size={24} className="text-purple-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">View Feedback</h3>
            <p className="text-sm text-gray-600">Review all submissions</p>
          </motion.button>

          <motion.button
            variants={itemVariants}
            whileHover={{ y: -8 }}
            onClick={() => navigate('/admin/analytics')}
            className="w-full bg-white border border-gray-200 rounded-2xl p-8 text-left hover:shadow-lg transition-all duration-300 group"
          >
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 size={24} className="text-emerald-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Analytics</h3>
            <p className="text-sm text-gray-600">View detailed charts</p>
          </motion.button>

          {/* Stats Summary */}
          <motion.div
            variants={itemVariants}
            className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-200 rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle size={20} className="text-indigo-600" />
              <h3 className="font-bold text-gray-900">System Health</h3>
            </div>
            <p className="text-sm text-gray-700 mb-4">
              {totalFeedback} submissions processed successfully.
            </p>
            <div className="w-full bg-white rounded-lg h-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-indigo-500 to-blue-500 w-5/6"></div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
