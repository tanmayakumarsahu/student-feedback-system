import React from 'react';

export default function EmptyState({ title = 'Nothing here', description = '', action }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 text-center">
      <p className="text-lg font-semibold text-gray-900">{title}</p>
      {description ? <p className="text-sm text-gray-600 mt-2">{description}</p> : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
