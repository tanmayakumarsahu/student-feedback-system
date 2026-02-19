import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, MessageSquare, BookOpen, User } from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useFeedback } from '../data/FeedbackContext';
import { pageVariants, containerVariants, itemVariants, buttonVariants } from '../animations/variants';
import RatingStars from '../components/RatingStars';

export default function SubmitFeedback() {
  const navigate = useNavigate();
  const { feedbackForms, submitFeedback } = useFeedback();
  const [selectedForm, setSelectedForm] = useState(null);
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedForm || rating === 0 || !comments.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const feedback = {
      courseName: selectedForm.courseName,
      instructorName: selectedForm.instructorName,
      rating,
      comments,
    };

    submitFeedback(feedback);
    setSuccessMessage('✅ Feedback submitted successfully!');
    setSelectedForm(null);
    setRating(0);
    setComments('');

    setTimeout(() => {
      setSuccessMessage('');
      navigate('/student/dashboard');
    }, 2000);
  };

  return (
    <motion.div
      initial="hidden"
      animate="show"
      exit="exit"
      variants={pageVariants}
      className="space-y-12"
    >
      {/* Header */}
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-2">
        <PageHeader dataTest="submit-feedback-header" icon={MessageSquare} title="Submit Feedback" subtitle="Share your experience with courses and instructors" />
      </motion.div>

      {/* Success Message */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="p-4 bg-green-50 border border-green-300 rounded-lg text-green-700 text-center font-medium"
        >
          {successMessage}
        </motion.div>
      )}

      {/* Form Container */}
      {feedbackForms.length > 0 ? (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Course Selection */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <BookOpen size={20} />
              Select Course
            </h2>
            <div className="space-y-2">
              {feedbackForms.map((form) => (
                <motion.button
                  key={form.id}
                  onClick={() => setSelectedForm(form)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    selectedForm?.id === form.id
                      ? 'border-gray-900 bg-gray-900 text-white shadow-md'
                      : 'border-gray-200 hover:border-gray-400 bg-white'
                  }`}
                >
                  <p className="font-semibold text-sm">{form.courseName}</p>
                  <p className="text-xs opacity-70 mt-1">{form.instructorName}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Feedback Form */}
          {selectedForm ? (
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl shadow-sm p-8 space-y-6"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{selectedForm.courseName}</h3>
                <p className="text-gray-500 text-sm flex items-center gap-2">
                  <User size={16} />
                  {selectedForm.instructorName}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rating */}
                <div>
                  <label className="block text-gray-900 text-sm font-semibold mb-3">Rate This Course</label>
                  <div className="flex gap-3">
                    {[1, 2, 3, 4, 5].map((r) => (
                      <motion.button
                        key={r}
                        type="button"
                        onClick={() => setRating(r)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`text-3xl transition-all ${rating >= r ? 'opacity-100' : 'opacity-30'}`}
                      >
                        ⭐
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Comments */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                  <label className="block text-gray-900 text-sm font-semibold mb-3">Your Feedback</label>
                  <motion.textarea
                    whileFocus={{ scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Share your thoughts about the course and instructor..."
                    rows="6"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all text-gray-900 placeholder-gray-400"
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                  className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={18} />
                  Submit Feedback
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2 bg-gray-50 border border-gray-200 rounded-2xl shadow-sm p-12 text-center flex flex-col items-center justify-center min-h-64"
            >
              <p className="text-gray-500 text-lg">Select a course to begin</p>
            </motion.div>
          )}
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="bg-white border border-gray-200 rounded-2xl shadow-sm p-12 text-center"
        >
          <p className="text-gray-600 mb-6">No feedback forms available yet</p>
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={() => navigate('/student/dashboard')}
            className="bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            Back to Dashboard
          </motion.button>
        </motion.div>
      )}

      {/* Tips Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="bg-gray-50 border border-gray-200 rounded-2xl p-8"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Tips for Better Feedback</h3>
        <motion.ul className="space-y-2 text-gray-600 text-sm">
          {[
            'Be specific and constructive',
            'Focus on the learning experience',
            'Mention strengths and areas for improvement',
            'Be respectful and professional',
            'Your feedback is anonymous and valuable'
          ].map((tip, idx) => (
            <motion.li
              key={idx}
              variants={itemVariants}
              className="flex items-start gap-3"
            >
              <span className="text-gray-900 font-bold mt-0.5">•</span>
              {tip}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
}
