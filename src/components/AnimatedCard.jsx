import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedCard({ children, className = '' }) {
  return (
    <motion.div whileHover={{ y: -6 }} className={`bg-white border border-gray-200 rounded-2xl p-6 shadow-sm transition ${className}`}>
      {children}
    </motion.div>
  );
}
