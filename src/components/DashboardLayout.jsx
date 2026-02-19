import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-6 gap-8">
        <aside className="lg:col-span-1">
          <div className="sticky top-6">
            <Sidebar />
          </div>
        </aside>
        <main className="lg:col-span-5">{children}</main>
      </div>
    </div>
  );
}
