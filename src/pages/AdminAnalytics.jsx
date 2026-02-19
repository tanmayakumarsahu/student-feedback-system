import React from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useFeedback } from '../data/FeedbackContext';
import { getFeedbackStats } from '../data/dummyData';
import { pageVariants, containerVariants, itemVariants } from '../animations/variants';
import { BarChart3, PieChart as PieChartIcon, Award, TrendingUp } from 'lucide-react';
import PageHeader from '../components/PageHeader';

export default function AdminAnalytics() {
  const { feedbacks } = useFeedback();
  const stats = getFeedbackStats(feedbacks);

  // Data for pie chart
  const pieData = Object.entries(stats.ratingDistribution).map(([rating, count]) => ({
    name: `${rating} Star${rating !== '1' ? 's' : ''}`,
    value: count,
  }));

  const COLORS = ['#ef4444', '#f97316', '#eab308', '#84cc16', '#22c55e'];

  // Data for bar chart - Course ratings
  const barData = Object.entries(stats.byCourse).map(([course, data]) => ({
    course: course.substring(0, 12) + (course.length > 12 ? '...' : ''),
    average: parseFloat(data.avg),
    responses: data.count,
  }));

  // Data for instructor comparison
  const instructorData = Object.entries(stats.byInstructor)
    .map(([instructor, data]) => ({
      name: instructor.split(' ').slice(-1)[0],
      rating: parseFloat(data.avg),
      fullName: instructor,
    }))
    .sort((a, b) => b.rating - a.rating);

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={pageVariants}
    >
      {/* Header Section */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-2">
        <PageHeader dataTest="admin-analytics-header" title="Feedback Results" subtitle="Comprehensive feedback analysis and insights" />
      </motion.div>

      {/* Overview Stats */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
      >
        {[
          { icon: BarChart3, label: 'Total Submissions', value: stats.totalFeedback },
          { icon: Award, label: 'Average Ratings', value: stats.averageRating },
          { icon: PieChartIcon, label: 'Courses Evaluated', value: Object.keys(stats.byCourse).length },
          { icon: TrendingUp, label: 'Instructors Rated', value: Object.keys(stats.byInstructor).length }
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

      {/* Charts Row 1 */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Rating Distribution */}
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
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="mt-6 grid grid-cols-5 gap-2"
          >
            {[1, 2, 3, 4, 5].map((rating) => (
              <motion.div
                key={rating}
                variants={itemVariants}
                className="text-center p-3 bg-gray-50 border border-gray-200 rounded-xl"
              >
                <p className="text-sm font-semibold text-gray-900">
                  {stats.ratingDistribution[rating]}
                </p>
                <p className="text-xs text-gray-500 mt-1">{rating}★</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Course Ratings */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -8, transition: { type: "spring", stiffness: 200, damping: 10 } }}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-gray-700" />
            Course Ratings Overview
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
              <XAxis dataKey="course" angle={-45} textAnchor="end" height={80} />
              <YAxis domain={[0, 5]} />
              <Tooltip
                formatter={(value) => [value.toFixed(2), 'Rating']}
                labelFormatter={(label) => `Course: ${label}`}
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

      {/* Charts Row 2 */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        {/* Instructor Rankings */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -8, transition: { type: "spring", stiffness: 200, damping: 10 } }}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <Award className="w-5 h-5 text-gray-700" />
            Instructor Rankings
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {instructorData.map((instructor, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-white transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-900 flex items-center gap-2">
                    <span className="bg-gray-900 text-white w-8 h-8 rounded-full inline-flex items-center justify-center text-xs font-bold">
                      {idx + 1}
                    </span>
                    {instructor.fullName}
                  </span>
                  <span className="font-semibold text-gray-900">
                    {instructor.rating.toFixed(2)}/5
                  </span>
                </div>
                <motion.div
                  className="w-full bg-gray-200 rounded-full h-2"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: idx * 0.1 + 0.3, duration: 0.5 }}
                >
                  <motion.div
                    className="bg-gray-900 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${(instructor.rating / 5) * 100}%` }}
                    transition={{ delay: idx * 0.1 + 0.4, duration: 0.6 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Detailed Stats */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -8, transition: { type: "spring", stiffness: 200, damping: 10 } }}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-3">
            <PieChartIcon className="w-5 h-5 text-gray-700" />
            Detailed Statistics
          </h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            {Object.entries(stats.byCourse)
              .sort((a, b) => b[1].avg - a[1].avg)
              .map(([course, data], idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-white transition-colors"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900 text-sm">{course}</h3>
                    <span className="text-xs font-medium text-white bg-gray-900 px-2.5 py-1 rounded-full">
                      {data.count} response{data.count !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <p className="text-2xl font-serif font-semibold text-gray-900">
                    {parseFloat(data.avg).toFixed(1)}/5
                  </p>
                </motion.div>
              ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Summary Insights */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {/* Top Performer */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -8, transition: { type: "spring", stiffness: 200, damping: 10 } }}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8"
        >
          <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-gray-700" />
            Top Performer
          </h3>
          <p className="text-3xl font-serif font-semibold text-gray-900 mb-2">
            {instructorData[0]?.fullName || 'N/A'}
          </p>
          <p className="text-lg font-semibold text-gray-900 mb-2">
            {instructorData[0]?.rating.toFixed(2)}/5 ⭐
          </p>
          <p className="text-gray-500 text-sm">Highest rated instructor</p>
        </motion.div>

        {/* Most Reviewed Course */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -8, transition: { type: "spring", stiffness: 200, damping: 10 } }}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8"
        >
          <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
            <PieChartIcon className="w-5 h-5 text-gray-700" />
            Most Reviewed
          </h3>
          {Object.entries(stats.byCourse).sort((a, b) => b[1].count - a[1].count)[0] && (
            <>
              <p className="text-lg font-semibold text-gray-900 mb-2">
                {
                  Object.entries(stats.byCourse).sort(
                    (a, b) => b[1].count - a[1].count
                  )[0][0]
                }
              </p>
              <p className="text-lg font-semibold text-gray-900 mb-2">
                {
                  Object.entries(stats.byCourse).sort(
                    (a, b) => b[1].count - a[1].count
                  )[0][1].count
                }{' '}
                responses
              </p>
              <p className="text-gray-500 text-sm">Most feedback received</p>
            </>
          )}
        </motion.div>

        {/* Overall Performance */}
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -8, transition: { type: "spring", stiffness: 200, damping: 10 } }}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8"
        >
          <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gray-700" />
            Overall Rating
          </h3>
          <p className="text-3xl font-serif font-semibold text-gray-900 mb-2">
            {stats.averageRating}/5
          </p>
          <p className="text-gray-500 text-sm">
            Based on <span className="font-semibold text-gray-900">{stats.totalFeedback}</span> submissions
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
