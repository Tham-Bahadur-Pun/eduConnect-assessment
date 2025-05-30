import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MobileMenu } from './MobileMenu';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="h-full bg-gray-50 dark:bg-gray-800 transition-colors">
      <Header />
      <div className="flex">
        <Sidebar />
        <MobileMenu />
        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
