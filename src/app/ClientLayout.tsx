'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  // 監聽滾動事件
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50); // 滾動超過 50px 時改變狀態
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // 關閉選單的函數
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* 導航欄 */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/80 backdrop-blur-sm shadow-sm' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className={`text-xl font-semibold transition-colors ${
                  isHomePage && !isScrolled ? 'text-gray-100 ' : 'text-gray-600'
                } hover:text-primary-600`}
              >
                Eason Wu
              </Link>
            </div>

            {/* 桌面版選單 - 在手機版隱藏 */}
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                href="/" 
                className={`transition-colors ${
                  isHomePage && !isScrolled ? 'text-gray-100' : 'text-gray-600'
                }  hover:text-primary-600`}
              >
                Home
              </Link>
              <Link 
                href="/about" 
                className={`transition-colors ${
                  isHomePage && !isScrolled ? 'text-gray-100' : 'text-gray-600'
                }  hover:text-primary-600`}
              >
                About
              </Link>
              <Link 
                href="/about#skills" 
                className={`transition-colors ${
                  isHomePage && !isScrolled ? 'text-gray-100' : 'text-gray-600'
                }  hover:text-primary-600`}
                onClick={(e) => {
                  if (window.location.pathname === '/about') {
                    e.preventDefault();
                    document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Skills
              </Link>
              <Link 
                href="/about#journey" 
                className={`transition-colors ${
                  isHomePage && !isScrolled ? 'text-gray-100' : 'text-gray-600'
                }  hover:text-primary-600`}
                onClick={(e) => {
                  if (window.location.pathname === '/about') {
                    e.preventDefault();
                    document.getElementById('journey')?.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Journey
              </Link>
              <Link 
                href="/projects" 
                className={`transition-colors ${
                  isHomePage && !isScrolled ? 'text-gray-100' : 'text-gray-600'
                }  hover:text-primary-600`}
              >
                Projects
              </Link>
              <Link 
                href="/contact" 
                className={`transition-colors ${
                  isHomePage && !isScrolled ? 'text-gray-100' : 'text-gray-600'
                }  hover:text-primary-600`}
              >
                Contact Me
              </Link>
            </div>

            {/* 手機版選單按鈕 - 只在手機版顯示 */}
            <div className="md:hidden">
              <button 
                onClick={toggleMenu}
                className={`p-2 rounded-md transition-colors ${
                  isHomePage && !isScrolled ? 'text-gray-100' : 'text-gray-600'
                }  hover:text-primary-600`}
                aria-label="Toggle menu"
              >
                <svg 
                  className="h-6 w-6" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  {isMenuOpen ? (
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* 手機版展開選單 */}
          <div 
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}
          >
            <div className={`px-2 pt-2 pb-3 space-y-1 rounded-lg mt-2 ${
              isScrolled ? 'bg-white/80 backdrop-blur-sm' : 'bg-black/20 backdrop-blur-sm'
            }`}>
              <Link 
                href="/"
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isHomePage && !isScrolled ? 'text-gray-100' : 'text-gray-800'
                } hover:text-primary-600`}
              >
                Home
              </Link>
              <Link 
                href="/about"
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isHomePage && !isScrolled ? 'text-gray-100' : 'text-gray-800'
                } hover:text-primary-600`}
              >
                About
              </Link>
              <Link 
                href="/about#skills"
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isHomePage && !isScrolled ? 'text-gray-100' : 'text-gray-800'
                } hover:text-primary-600`}
              >
                Skills
              </Link>
              <Link 
                href="/about#journey"
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isHomePage && !isScrolled ? 'text-gray-100' : 'text-gray-800'
                } hover:text-primary-600`}
              >
                Journey
              </Link>
              <Link 
                href="/projects"
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isHomePage && !isScrolled ? 'text-gray-100' : 'text-gray-800'
                } hover:text-primary-600`}
              >
                Projects
              </Link>
              <Link 
                href="/contact"
                onClick={closeMenu}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                  isHomePage && !isScrolled ? 'text-gray-100' : 'text-gray-800'
                } hover:text-primary-600`}
              >
                Contact Me
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 主要內容 */}
      <main>
        {children}
      </main>
    </>
  )
}
