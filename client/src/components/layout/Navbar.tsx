import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { MoonPhase } from "@/components/ui/MoonPhase";

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
    { name: "Sky Calendar", path: "/calendar" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        scrolled
          ? "bg-background/40 backdrop-blur-2xl border-b border-white/5 py-3 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.5)]"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden bg-white/5 border border-white/10 group-hover:border-primary/50 transition-all duration-500 group-hover:scale-110">
              <img
                src="/favicon.png"
                alt="Matrix Logo"
                className="w-full h-full object-contain p-1.5"
              />
            </div>
            <span className="font-display font-bold text-xl tracking-[0.15em] text-white group-hover:text-primary transition-all duration-500 bg-clip-text">
              THE MATRIX
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.path}>
              <div
                className={cn(
                  "text-[13px] font-bold tracking-widest uppercase transition-all duration-300 hover:text-primary relative py-1 cursor-pointer group/link",
                  location === link.path ? "text-primary" : "text-white/70"
                )}
              >
                {link.name}
                <div className={cn(
                  "absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300",
                  location === link.path ? "w-full" : "w-0 group-hover/link:w-full"
                )} />
              </div>
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-8">
          <MoonPhase size="sm" className="hidden lg:flex" />
          <Link href="/events">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-magnetic px-6 py-2 bg-white text-black hover:bg-primary hover:text-white rounded-full font-black text-[10px] uppercase tracking-widest transition-all duration-500 cursor-pointer shadow-lg shadow-white/5 glass-shine"
            >
              <span className="relative z-10">Explore Cosmos</span>
            </motion.div>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="md:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-3xl border-b border-white/5 overflow-hidden shadow-2xl"
          >
            <div className="container mx-auto px-6 py-10 flex flex-col gap-8">
              {navLinks.map((link) => (
                <Link key={link.name} href={link.path}>
                  <div
                    className={cn(
                      "text-3xl font-heading font-black tracking-tight cursor-pointer transition-colors",
                      location === link.path ? "text-primary" : "text-white"
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </div>
                </Link>
              ))}
              <div className="pt-8 border-t border-white/5 flex flex-col gap-6">
                <MoonPhase size="md" showDetails={true} className="items-start" />
                <Link href="/events">
                  <div onClick={() => setIsOpen(false)} className="w-full py-4 bg-primary text-black font-black text-center rounded-xl uppercase tracking-widest">
                    Start Exploring
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
