import React from 'react';
import { motion } from 'framer-motion';

export default function PageHeader({ title, subtitle, icon: Icon, dataTest }) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
      <div className="flex items-center gap-4">
        {Icon ? <Icon className="w-8 h-8 text-gray-700" /> : null}
        <h1 data-testid={dataTest} className="text-4xl font-serif font-semibold text-gray-900">{title}</h1>
      </div>
      {subtitle ? <p className="text-gray-600">{subtitle}</p> : null}
    </motion.div>
  );
}
