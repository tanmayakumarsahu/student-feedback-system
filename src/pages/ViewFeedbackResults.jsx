import React from 'react';
import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useFeedback } from '../data/FeedbackContext';
import { getFeedbackStats } from '../data/dummyData';
import { pageVariants, containerVariants, itemVariants } from '../animations/variants';
import { BarChart3, PieChart as PieChartIcon, BookOpen, Award } from 'lucide-react';
import PageHeader from '../components/PageHeader';

export default function ViewFeedbackResults() {
  const { feedbacks } = useFeedback();
  const stats = getFeedbackStats(feedbacks);

  // Data for pie chart
  const pieData = Object.entries(stats.ratingDistribution).map(([rating, count]) => ({
    name: `${rating} Star${rating !== '1' ? 's' : ''}`,
    value: count,
  }));

  const COLORS = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e'];

  // Data for bar chart
  const barData = Object.entries(stats.byCourse).map(([course, data]) => ({
    course: course.substring(0, 15) + (course.length > 15 ? '...' : ''),
    average: parseFloat(data.avg),
    fullName: course,
  }));

  // Data for instructor ratings
  const instructorData = Object.entries(stats.byInstructor).map(([instructor, data]) => ({
    name: instructor.split(' ')[instructor.split(' ').length - 1],
    rating: parseFloat(data.avg),
    count: data.count,
    fullName: instructor,
  }));

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={pageVariants}
    >
      {/* Header Section */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-2">
        <PageHeader dataTest="feedback-results-header" title="Feedback Results" subtitle="View aggregated feedback and course ratings" />
      </motion.div>

      {/* Overview Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {[
          { icon: PieChartIcon, label: 'Total Feedback Submissions', value: stats.totalFeedback },
          { icon: Award, label: 'Overall Average Rating', value: stats.averageRating },
          { icon: BookOpen, label: 'Courses Evaluated', value: Object.keys(stats.byCourse).length }
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
                      ? stat.value.toFixed(1)
                      : stat.value}
                  </p>
                </div>
                <Icon className="w-8 h-8 text-gray-400" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Charts Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Rating Distribution Pie Chart */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -8, transition: { type: "spring", stiffness: 200, damping: 10 } }}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <PieChartIcon className="w-5 h-5 text-gray-700" />
            Rating Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Course Ratings Bar Chart */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -8, transition: { type: "spring", stiffness: 200, damping: 10 } }}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-gray-700" />
            Average Ratings by Course
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="course" />
              <YAxis domain={[0, 5]} />
              <Tooltip 
                formatter={(value) => value.toFixed(2)}
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Bar dataKey="average" fill="#1f2937" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </motion.div>

      {/* Course Details */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8"
      >
        <motion.h2
          variants={itemVariants}
          className="text-lg font-semibold text-gray-900 mb-8 flex items-center gap-3"
        >
          <BookOpen className="w-5 h-5 text-gray-700" />
          Course-wise Feedback Summary
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {Object.entries(stats.byCourse).map(([course, data], idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ y: -8, transition: { type: "spring", stiffness: 200, damping: 10 } }}
              className="border border-gray-200 rounded-xl p-6 bg-gray-50/50 hover:bg-white transition-colors"
            >
              <h3 className="font-semibold text-gray-900 mb-4">{course}</h3>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-4xl font-serif font-semibold text-gray-900">
                    {parseFloat(data.avg).toFixed(1)}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">out of 5</p>
                </div>
                <span className="text-sm font-medium text-gray-700 bg-gray-100 rounded-full px-3 py-1">
                  {data.count} {data.count !== 1 ? 'responses' : 'response'}
                </span>
              </div>
              <motion.div
                className="w-full bg-gray-200 rounded-full h-2"
              >
                <motion.div
                  className="bg-gray-900 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(parseFloat(data.avg) / 5) * 100}%` }}
                  transition={{ delay: idx * 0.1 + 0.4, duration: 0.6 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Instructor Ratings */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8"
      >
        <motion.h2
          variants={itemVariants}
          className="text-lg font-semibold text-gray-900 mb-8 flex items-center gap-3"
        >
          <Award className="w-5 h-5 text-gray-700" />
          Instructor Ratings
        </motion.h2>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-3"
        >
          {instructorData.sort((a, b) => b.rating - a.rating).map((instructor, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex items-center justify-between p-6 bg-gray-50/50 border border-gray-200 rounded-xl hover:bg-white transition-colors"
            >
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">
                  {instructor.fullName}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {instructor.count} {instructor.count !== 1 ? 'feedback responses' : 'feedback response'}
                </p>
              </div>
              <div className="text-right ml-4">
                <p className="text-3xl font-serif font-semibold text-gray-900">
                  {instructor.rating.toFixed(2)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {'⭐'.repeat(Math.round(instructor.rating))}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
