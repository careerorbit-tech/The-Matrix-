import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const { user: backendUser, logoutMutation } = useAuth();
  const [localUser, setLocalUser] = useState<any>(null);

  useEffect(() => {
    // Check for custom auth session
    const session = localStorage.getItem("auth_session");
    if (session) {
      try {
        setLocalUser(JSON.parse(session));
      } catch (e) {
        console.error("Failed to parse local session");
      }
    }

    // Listen for storage changes (for multi-tab sync)
    const handleStorage = () => {
      const updated = localStorage.getItem("auth_session");
      setLocalUser(updated ? JSON.parse(updated) : null);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const user = backendUser || localUser;

  const handleLogout = () => {
    if (localUser) {
      localStorage.removeItem("auth_session");
      setLocalUser(null);
      window.location.href = "/auth";
    } else {
      logoutMutation.mutate();
    }
  };

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
          {user ? (
            <div className="flex items-center gap-4">
              <Link href="/auth">
                <div className="w-10 h-10 rounded-full border-2 border-primary/50 p-0.5 hover:border-primary transition-all cursor-pointer overflow-hidden">
                  <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                    {/[\uD800-\uDBFF][\uDC00-\uDFFF]/g.test(user.avatar) ? (
                      <span className="text-xl">{user.avatar}</span>
                    ) : (
                      <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ) : (
            <Link href="/auth">
              <button className="px-6 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full text-sm font-bold tracking-wide hover:bg-primary hover:text-white transition-all duration-300">
                Join Us
              </button>
            </Link>
          )}
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
              {user ? (
                <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-white/10">
                  <Link href="/auth">
                    <div className="flex items-center gap-4 py-2" onClick={() => setIsOpen(false)}>
                      <div className="w-12 h-12 rounded-full border-2 border-primary/50 p-1 overflow-hidden shrink-0">
                        {/[\uD800-\uDBFF][\uDC00-\uDFFF]/g.test(user.avatar) ? (
                          <span className="text-2xl flex items-center justify-center h-full">{user.avatar}</span>
                        ) : (
                          <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                        )}
                      </div>
                      <span className="text-xl font-heading text-primary">
                        {user.username}
                      </span>
                    </div>
                  </Link>
                </div>
              ) : (
                <Link href="/auth">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="mt-4 w-full py-3 bg-primary/10 text-primary border border-primary/20 rounded-xl text-xl font-heading font-bold hover:bg-primary hover:text-white transition-all duration-300"
                  >
                    Join Us
                  </button>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
