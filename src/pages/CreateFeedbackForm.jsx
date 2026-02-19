import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useFeedback } from '../data/FeedbackContext';
import { pageVariants, containerVariants, itemVariants, buttonVariants } from '../animations/variants';
import { BookOpen, User, CheckCircle, Plus } from 'lucide-react';
import PageHeader from '../components/PageHeader';

export default function CreateFeedbackForm() {
  const navigate = useNavigate();
  const { createFeedbackForm, feedbackForms } = useFeedback();
  const [courseName, setCourseName] = useState('');
  const [instructorName, setInstructorName] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!courseName.trim() || !instructorName.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const newForm = createFeedbackForm({
      courseName: courseName.trim(),
      instructorName: instructorName.trim(),
    });

    setSuccessMessage(
      `Feedback form "${newForm.courseName}" created successfully!`
    );
    setCourseName('');
    setInstructorName('');

    setTimeout(() => {
      setSuccessMessage('');
      navigate('/admin/dashboard');
    }, 2000);
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={pageVariants}
    >
      {/* Header Section */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-2">
        <PageHeader dataTest="create-form-header" title="Create Feedback Form" subtitle="Add new courses for student evaluation" />
      </motion.div>

      {/* Success Message */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="bg-white border border-gray-200 border-l-4 border-l-green-600 rounded-2xl p-6 mb-8"
        >
          <p className="text-gray-900 font-semibold text-lg flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            {successMessage}
          </p>
        </motion.div>
      )}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Form Section */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-2"
        >
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8">
            <form onSubmit={handleSubmit}>
              {/* Course Name */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="mb-8"
              >
                <motion.label
                  variants={itemVariants}
                  className="block text-gray-900 font-semibold text-base mb-3 flex items-center gap-2"
                >
                  <BookOpen className="w-5 h-5 text-gray-700" />
                  Course Name
                </motion.label>
                <motion.input
                  variants={itemVariants}
                  type="text"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  placeholder="e.g., Advanced React Development"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-all text-gray-900 placeholder-gray-500"
                />
                <motion.p
                  variants={itemVariants}
                  className="text-gray-500 text-sm mt-2"
                >
                  Full name of the course being evaluated
                </motion.p>
              </motion.div>

              {/* Instructor Name */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="mb-10"
              >
                <motion.label
                  variants={itemVariants}
                  className="block text-gray-900 font-semibold text-base mb-3 flex items-center gap-2"
                >
                  <User className="w-5 h-5 text-gray-700" />
                  Instructor Name
                </motion.label>
                <motion.input
                  variants={itemVariants}
                  type="text"
                  value={instructorName}
                  onChange={(e) => setInstructorName(e.target.value)}
                  placeholder="e.g., Dr. Sarah Johnson"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900/10 transition-all text-gray-900 placeholder-gray-500"
                />
                <motion.p
                  variants={itemVariants}
                  className="text-gray-500 text-sm mt-2"
                >
                  Full name of the course instructor
                </motion.p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="flex gap-4"
              >
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  type="submit"
                  className="flex-1 py-3 px-6 rounded-lg font-semibold text-white bg-gray-900 hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Create Form
                </motion.button>
                <motion.button
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  type="button"
                  onClick={() => navigate('/admin/dashboard')}
                  className="flex-1 py-3 px-6 rounded-lg font-semibold text-gray-900 bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </motion.button>
              </motion.div>
            </form>
          </div>
        </motion.div>

        {/* Sidebar - Active Forms */}
        <motion.div
          variants={itemVariants}
        >
          <motion.div
            whileHover={{ y: -8, transition: { type: "spring", stiffness: 200, damping: 10 } }}
            className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sticky top-8"
          >
            <h2 className="text-base font-semibold text-gray-900 mb-5 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gray-700" />
              Active Forms
            </h2>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-3 max-h-96 overflow-y-auto"
            >
              {feedbackForms.map((form, idx) => (
                <motion.div
                  key={form.id}
                  variants={itemVariants}
                  className="p-4 bg-gray-50 border border-gray-200 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <p className="font-medium text-gray-900 text-sm">
                    {form.courseName.substring(0, 20)}
                    {form.courseName.length > 20 ? '...' : ''}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {form.instructorName}
                  </p>
                </motion.div>
              ))}
            </motion.div>
            <motion.div
              variants={itemVariants}
              className="mt-6 pt-6 border-t border-gray-200 text-center"
            >
              <p className="text-sm text-gray-600">
                <span className="text-3xl font-serif font-semibold text-gray-900 block">{feedbackForms.length}</span>
                <span className="text-xs text-gray-500 mt-1 block">Active Forms</span>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Information Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10"
      >
        <motion.div
          variants={itemVariants}
          whileHover={{ y: -8, transition: { type: "spring", stiffness: 200, damping: 10 } }}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8"
        >
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-base">
            <CheckCircle className="w-5 h-5 text-gray-700" />
            Form Details
          </h3>
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="text-gray-600 text-sm space-y-2"
          >
            {[
              'Each form must have a unique course name',
              'Instructor names identify who teaches the course',
              'Once created, forms are available for student feedback',
              'Forms are assigned to the current semester automatically'
            ].map((item, idx) => (
              <motion.li
                key={idx}
                variants={itemVariants}
                className="flex gap-2"
              >
                <span className="text-gray-400 font-semibold">•</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <motion.div
          variants={itemVariants}
          whileHover={{ y: -8, transition: { type: "spring", stiffness: 200, damping: 10 } }}
          className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8"
        >
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2 text-base">
            <CheckCircle className="w-5 h-5 text-gray-700" />
            Best Practices
          </h3>
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="text-gray-600 text-sm space-y-2"
          >
            {[
              'Use clear, descriptive course names',
              'Include course code if applicable',
              'Provide full formal names for instructors',
              'Organize forms by semester/section'
            ].map((item, idx) => (
              <motion.li
                key={idx}
                variants={itemVariants}
                className="flex gap-2"
              >
                <span className="text-gray-400 font-semibold">•</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
