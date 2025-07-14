import React, { ReactNode, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import GlobalChatButton from '../AIChat/GlobalChatButton';
import { ChevronLeft, ChevronRight, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if we're on mobile based on screen width
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarCollapsed(true);
      }
    };

    // Run on mount
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900 overflow-hidden">
      {/* Mobile menu toggle button */}
      {isMobile && (
        <button
          onClick={toggleMobileMenu}
          className="fixed top-2 left-2 z-50 p-2 rounded-full bg-white shadow-md text-primary-600 hover:bg-gray-100"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}
      
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-40 bg-primary-600 text-white shadow-lg ${
          isMobile 
            ? `w-[280px] transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`
            : sidebarCollapsed ? 'w-16 translate-x-0' : 'w-64 translate-x-0'
        } transition-all duration-300 ease-in-out`}
      >
        <Sidebar collapsed={isMobile ? false : sidebarCollapsed} />
      </div>

      {/* Sidebar toggle button - desktop only */}
      {!isMobile && (
        <button
          onClick={toggleSidebar}
          className="fixed left-0 bottom-5 ml-4 z-40 rounded-full bg-primary-500 p-1.5 text-white shadow-md hover:bg-primary-700 transition-all duration-300 ease-in-out hidden md:block"
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <ChevronRight size={20} />
          ) : (
            <ChevronLeft size={20} />
          )}
        </button>
      )}

      {/* Main content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
          isMobile 
            ? 'ml-0 w-full' // No margin for mobile, full width
            : sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <Navbar isMobile={isMobile} toggleMobileMenu={toggleMobileMenu} />
        <main className="flex-1 p-2 sm:p-4 md:p-6 overflow-y-auto scrollbar-thin">
          {children}
        </main>
      </div>
      
      {/* Global Chat AI Button - Hidden when mobile menu is open */}
      {!mobileMenuOpen && <GlobalChatButton />}

      {/* Mobile menu backdrop */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close mobile menu"
        ></div>
      )}
    </div>
  );
};

export default Layout;