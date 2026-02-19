import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';
import { pageVariants } from '../animations/variants';

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-[#f8f6f2] flex flex-col">
      <Navbar />
      <motion.main
        initial="hidden"
        animate="show"
        exit="exit"
        variants={pageVariants}
        className="flex-1 overflow-auto"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-12 space-y-12">
          {children}
        </div>
      </motion.main>
    </div>
  );
}
