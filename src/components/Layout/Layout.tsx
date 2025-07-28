import React, { ReactNode, useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import GlobalChatButton from '../AIChat/GlobalChatButton';
import { Menu, X } from 'lucide-react';

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
    <div className="flex h-screen text-white overflow-hidden relative">
      {/* Background overlay for better contrast */}
      <div className="absolute inset-0 bg-black/10 pointer-events-none" />
      
      {/* Mobile menu toggle button */}
      {isMobile && (
        <button
          onClick={toggleMobileMenu}
          className="fixed top-3 left-3 z-50 p-2.5 rounded-full glass hover:glass-card transition-all duration-300 text-white shadow-lg"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      )}
      
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-40 glass-sidebar text-white shadow-2xl ${
          isMobile 
            ? `w-[280px] transform ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`
            : sidebarCollapsed ? 'w-16 translate-x-0' : 'w-64 translate-x-0'
        } transition-all duration-300 ease-in-out`}
      >
        <Sidebar 
          collapsed={isMobile ? false : sidebarCollapsed} 
          onToggleCollapse={!isMobile ? toggleSidebar : undefined}
        />
      </div>

      {/* Main content */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300 ease-in-out ${
          isMobile 
            ? 'ml-0 w-full' // No margin for mobile, full width
            : sidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}
      >
        <Navbar isMobile={isMobile} toggleMobileMenu={toggleMobileMenu} />
        <main className="flex-1 p-0.5 sm:p-1 md:p-2 lg:p-4 overflow-y-auto scrollbar-thin relative">
          <div className="glass-card rounded-lg sm:rounded-xl md:rounded-2xl p-2 sm:p-3 md:p-4 lg:p-6 m-0.5 sm:m-1 md:m-2 min-h-full">
            {/* Mobile content padding to avoid menu button overlap */}
            <div className={`${isMobile ? 'pt-12' : ''}`}>
              {children}
            </div>
          </div>
        </main>
      </div>
      
      {/* Global Chat AI Button - Hidden when mobile menu is open */}
      {!mobileMenuOpen && <GlobalChatButton />}

      {/* Mobile menu backdrop */}
      {isMobile && mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close mobile menu"
        ></div>
      )}
    </div>
  );
};

export default Layout;