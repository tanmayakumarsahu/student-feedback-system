import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useFeedback } from '../data/FeedbackContext';
import { pageVariants, containerVariants, itemVariants } from '../animations/variants';
import { MessageSquare, Search, Award, TrendingUp } from 'lucide-react';
import PageHeader from '../components/PageHeader';

export default function ViewFeedback() {
  const { feedbacks } = useFeedback();
  const [filterCourse, setFilterCourse] = useState('all');
  const [filterRating, setFilterRating] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique courses
  const uniqueCourses = [...new Set(feedbacks.map((f) => f.courseName))];

  // Filter feedbacks
  let filtered = feedbacks;

  if (filterCourse !== 'all') {
    filtered = filtered.filter((f) => f.courseName === filterCourse);
  }

  if (filterRating !== 'all') {
    filtered = filtered.filter((f) => f.rating === parseInt(filterRating));
  }

  if (searchTerm) {
    filtered = filtered.filter(
      (f) =>
        f.comments.toLowerCase().includes(searchTerm.toLowerCase()) ||
        f.instructorName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Stats for filtered data
  const avgRating =
    filtered.length > 0
      ? (filtered.reduce((sum, f) => sum + f.rating, 0) / filtered.length).toFixed(2)
      : 0;

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={pageVariants}
    >
      {/* Header Section */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-2">
        <PageHeader dataTest="view-feedback-header" title="View All Feedback" subtitle="Review and analyze student feedback submissions" />
      </motion.div>

      {/* Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {[
          { icon: MessageSquare, label: 'Total Feedback', value: feedbacks.length },
          { icon: Search, label: 'Showing Results', value: filtered.length },
          { icon: Award, label: 'Average Rating', value: avgRating }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 200, damping: 10 } }}
              className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-500 text-sm font-medium mb-2">{stat.label}</p>
                  <p className="text-4xl font-serif font-semibold text-gray-900">
                    {typeof stat.value === 'number' && stat.value % 1 !== 0
                      ? stat.value
                      : stat.value}
                  </p>
                </div>
                <Icon className="w-8 h-8 text-gray-400" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Filters */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8"
      >
        <motion.h2
          variants={itemVariants}
          className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-3"
        >
          <Search className="w-5 h-5 text-gray-700" />
          Filter Results
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Search */}
          <motion.div variants={itemVariants}>
            <label className="block text-gray-700 font-medium text-sm mb-3">
              Search Comments
            </label>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search feedback..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-all text-gray-900 placeholder-gray-500"
            />
          </motion.div>

          {/* Course Filter */}
          <motion.div variants={itemVariants}>
            <label className="block text-gray-700 font-medium text-sm mb-3">
              Filter by Course
            </label>
            <select
              value={filterCourse}
              onChange={(e) => setFilterCourse(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-all text-gray-900"
            >
              <option value="all">All Courses</option>
              {uniqueCourses.map((course) => (
                <option key={course} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Rating Filter */}
          <motion.div variants={itemVariants}>
            <label className="block text-gray-700 font-medium text-sm mb-3">
              Filter by Rating
            </label>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-all text-gray-900"
            >
              <option value="all">All Ratings</option>
              <option value="5">⭐⭐⭐⭐⭐ 5 Stars</option>
              <option value="4">⭐⭐⭐⭐ 4 Stars</option>
              <option value="3">⭐⭐⭐ 3 Stars</option>
              <option value="2">⭐⭐ 2 Stars</option>
              <option value="1">⭐ 1 Star</option>
            </select>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Feedback List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden"
      >
        <motion.div
          variants={itemVariants}
          className="border-b border-gray-200 px-8 py-6"
        >
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-3">
            <MessageSquare className="w-5 h-5 text-gray-700" />
            Feedback Submissions
          </h2>
          <p className="text-gray-500 text-sm mt-2">{filtered.length} matching feedback found</p>
        </motion.div>

        {filtered.length === 0 ? (
          <motion.div
            variants={itemVariants}
            className="p-12 text-center"
          >
            <p className="text-gray-500 text-lg font-medium">No feedback found matching your filters</p>
            <p className="text-gray-400 text-sm mt-2">Try adjusting your search criteria</p>
          </motion.div>
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="divide-y divide-gray-200"
          >
            {filtered.map((feedback, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-8 hover:bg-gray-50/50 transition-colors border-l-4 border-transparent hover:border-gray-900"
              >
                {/* Header Row */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feedback.courseName}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {feedback.instructorName}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-600 mb-2">
                      {'⭐'.repeat(feedback.rating)}{'☆'.repeat(5 - feedback.rating)}
                    </p>
                    <span className="inline-block bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">
                      {feedback.rating}/5
                    </span>
                  </div>
                </div>

                {/* Comments */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 my-4">
                  <p className="text-gray-700 leading-relaxed">
                    "{feedback.comments}"
                  </p>
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 text-sm text-gray-600">
                  <span>Student ID: {feedback.studentId}</span>
                  <span className="text-gray-500">Submitted: {feedback.timestamp}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Summary Stats */}
      {filtered.length > 0 && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Rating Distribution */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8, transition: { type: "spring", stiffness: 200, damping: 10 } }}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-gray-700" />
              Rating Breakdown
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-4"
            >
              {[5, 4, 3, 2, 1].map((rating, index) => {
                const count = filtered.filter((f) => f.rating === rating).length;
                const percentage = ((count / filtered.length) * 100).toFixed(0);
                return (
                  <motion.div key={rating} variants={itemVariants}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-gray-700">
                        {'⭐'.repeat(rating)} ({rating})
                      </span>
                      <span className="text-gray-600 font-medium">
                        {count} ({percentage}%)
                      </span>
                    </div>
                    <motion.div
                      className="w-full bg-gray-200 rounded-full h-2"
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                    >
                      <motion.div
                        className="bg-gray-900 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Instructor Summary */}
          <motion.div
            variants={itemVariants}
            whileHover={{ y: -8, transition: { type: "spring", stiffness: 200, damping: 10 } }}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-3">
              <Award className="w-5 h-5 text-gray-700" />
              Instructor Performance
            </h3>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-3"
            >
              {[...new Set(filtered.map((f) => f.instructorName))].map(
                (instructor, idx) => {
                  const instFeedbacks = filtered.filter(
                    (f) => f.instructorName === instructor
                  );
                  const avgRating = (
                    instFeedbacks.reduce((sum, f) => sum + f.rating, 0) /
                    instFeedbacks.length
                  ).toFixed(2);
                  return (
                    <motion.div
                      key={instructor}
                      variants={itemVariants}
                      className="flex justify-between items-center p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-medium text-gray-900">
                        {instructor}
                      </span>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{avgRating}</p>
                        <p className="text-xs text-gray-500">
                          {instFeedbacks.length} response{instFeedbacks.length !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </motion.div>
                  );
                }
              )}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}
