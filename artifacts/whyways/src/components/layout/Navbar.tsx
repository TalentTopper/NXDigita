import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Hexagon, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Link } from 'wouter';
import favicon from "../../../public/favicon.ico"

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  
  // Wait for mount to show theme toggle properly
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Industries', href: '#industries' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-border/50 py-3 shadow-sm' 
          : 'bg-transparent py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            {/* <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-secondary to-accent">
              <Hexagon className="text-white w-5 h-5 group-hover:rotate-12 transition-transform" />
            </div> */}
            <img src={favicon} alt="Logo" className="object-contain rounded w-8" />
            <span className="font-heading font-bold text-xl tracking-tight">NXDigita AI Technologies</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    onClick={(e) => scrollTo(e, link.href)}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-4 border-l border-border pl-6">
              {mounted && (
                <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              )}
              
              <a 
                href="#contact"
                onClick={(e) => scrollTo(e, '#contact')}
                className="px-5 py-2.5 rounded-full bg-[#E95D2A] from-secondary to-accent text-white text-sm font-medium hover:shadow-lg hover:shadow-secondary/25 transition-all hover:-translate-y-0.5"
              >
                Get Started
              </a>
<a
  href="https://onboard.nxdigita.com/"
  onClick={() => setIsMobileMenuOpen(false)}
  className="px-5 py-3 text-center rounded-full border border-[#E95D2A] text-[#E95D2A] font-semibold"
>
  Start Your Internship
</a>

            </div>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            {mounted && (
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full hover:bg-muted text-muted-foreground"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-4 py-6 space-y-4 flex flex-col">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollTo(e, link.href)}
                  className="text-lg font-medium text-foreground py-2 border-b border-border/50"
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact"
                onClick={(e) => scrollTo(e, '#contact')}
                className="mt-4 px-5 py-3 text-center rounded-full bg-gradient-to-r from-secondary to-accent text-white font-medium"
              >
                Get Started
              </a>
              <a
                href="https://onboard.nxdigita.com/"
                className="px-5 py-2.5 rounded-full border border-[#E95D2A] text-[#E95D2A] text-sm font-semibold hover:bg-[#E95D2A]/10 transition-all hover:-translate-y-0.5"
              >
                Start Your Internship
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
