import React, { useState } from 'react';

export default function RatingStars({ value, onChange, interactive = true, size = 'md' }) {
  const [hover, setHover] = useState(0);

  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => interactive && onChange?.(star)}
          onMouseEnter={() => interactive && setHover(star)}
          onMouseLeave={() => setHover(0)}
          className={`${sizeClasses[size]} transition-transform cursor-pointer ${
            interactive ? 'hover:scale-110' : ''
          }`}
          disabled={!interactive}
          type="button"
        >
          {star <= (hover || value) ? '⭐' : '☆'}
        </button>
      ))}
    </div>
  );
}
