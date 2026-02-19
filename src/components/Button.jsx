import React from 'react';

export default function Button({ children, variant = 'primary', onClick, className = '', ...rest }) {
  const base = 'px-4 py-2 rounded-lg font-medium inline-flex items-center justify-center';
  const styles = {
    primary: 'bg-gradient-to-br from-[#6366F1] to-[#4F46E5] text-white shadow-md',
    secondary: 'bg-white border border-gray-200 text-gray-900',
    outline: 'bg-transparent border border-gray-300 text-gray-900',
  };
  return (
    <button onClick={onClick} className={`${base} ${styles[variant] || styles.primary} ${className}`} {...rest}>
      {children}
    </button>
  );
}
