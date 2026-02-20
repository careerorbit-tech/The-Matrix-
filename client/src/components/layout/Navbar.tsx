import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-background/80 backdrop-blur-md border-white/10 py-4" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shadow-lg shadow-primary/10 group-hover:shadow-primary/30 transition-all duration-300">
              <img
                src="/favicon.png"
                alt="Matrix Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-display font-bold text-xl tracking-wider text-white group-hover:text-primary transition-colors">
              THE MATRIX
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.path}>
              <div
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors hover:text-primary relative py-1 cursor-pointer",
                  location === link.path ? "text-white" : "text-muted-foreground"
                )}
              >
                {link.name}
                {location === link.path && (
                  <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                  />
                )}
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.path}>
                  <div
                    className={cn(
                      "text-2xl font-heading font-medium cursor-pointer",
                      location === link.path ? "text-primary" : "text-white/70"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
