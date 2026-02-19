import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '../animations/variants';

export function AnimatedCard({ children, delay = 0, className = '' }) {
  return (
    <motion.div
      variants={itemVariants}
      initial="hidden"
      animate="show"
      transition={{ delay }}
      whileHover={{ y: -8, transition: { type: "spring", stiffness: 200, damping: 10 } }}
      className={`bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedButton({ children, onClick, className = '', icon: Icon = null, ...props }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.2 }}
      className={`flex items-center gap-2 transition-all duration-300 ${className}`}
      {...props}
    >
      {Icon && <Icon size={18} />}
      {children}
    </motion.button>
  );
}

export function AnimatedInputField({ label, icon: Icon = null, error = false, ...inputProps }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      {label && (
        <label className="block text-gray-900 text-sm font-semibold mb-3 flex items-center gap-2">
          {Icon && <Icon size={16} />}
          {label}
        </label>
      )}
      <motion.input
        whileFocus={{ scale: 1.01, boxShadow: '0 0 0 2px rgba(156, 163, 175, 0.3)' }}
        transition={{ type: 'spring', stiffness: 300 }}
        className={`w-full px-4 py-3 border rounded-lg focus:outline-none transition-all text-gray-900 placeholder-gray-400 ${
          error
            ? 'border-red-300 focus:ring-2 focus:ring-red-200'
            : 'border-gray-200 focus:ring-2 focus:ring-gray-300'
        }`}
        {...inputProps}
      />
    </motion.div>
  );
}
