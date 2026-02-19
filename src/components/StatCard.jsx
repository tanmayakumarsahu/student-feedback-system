import React from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ icon: Icon, label, value, color = 'from-indigo-500 to-indigo-600', bgColor = 'bg-indigo-50' }) {
  return (
    <motion.div whileHover={{ y: -6 }} className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 p-6 hover:shadow-xl transition-all duration-300">
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
      <div className="relative flex items-start gap-4">
        <div className={`${bgColor} w-12 h-12 rounded-xl flex items-center justify-center`}> 
          {Icon ? <Icon size={20} className="text-indigo-600" /> : null}
        </div>
        <div>
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-serif font-semibold text-gray-900 mt-1">{value}</p>
        </div>
      </div>
    </motion.div>
  );
}
import React from 'react';

export default function StatCard({ icon, label, value, trend, color = 'indigo' }) {
  const colorClasses = {
    indigo: 'from-indigo-100/50 to-indigo-50/50 border-indigo-200/50',
    blue: 'from-blue-100/50 to-blue-50/50 border-blue-200/50',
    green: 'from-green-100/50 to-green-50/50 border-green-200/50',
    purple: 'from-purple-100/50 to-purple-50/50 border-purple-200/50',
  };

  const iconBgClasses = {
    indigo: 'bg-indigo-600',
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
  };

  const trendClasses = trend > 0 ? 'text-green-600' : trend < 0 ? 'text-red-600' : 'text-gray-600';

  return (
    <div
      className={`bg-gradient-to-br ${colorClasses[color]} backdrop-blur-md border rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] hover:-translate-y-1 hover:border-white/80`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="text-3xl font-bold text-gray-900 mt-3">{value}</p>
          {trend !== undefined && (
            <p className={`text-sm mt-3 font-semibold ${trendClasses}`}>
              {trend > 0 ? '↑' : trend < 0 ? '↓' : '→'} {Math.abs(trend).toFixed(1)}%
            </p>
          )}
        </div>
        <div className={`${iconBgClasses[color]} text-white rounded-xl p-3 text-2xl shadow-lg`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
