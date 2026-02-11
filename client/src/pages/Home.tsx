import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { motion } from "framer-motion";
import { ArrowRight, Star, Users, Telescope, Calendar } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const stats = [
    { label: "Active Members", value: "500+", icon: Users },
    { label: "Star Parties", value: "120+", icon: Star },
    { label: "Workshops", value: "50+", icon: Telescope },
    { label: "Years active", value: "10+", icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30">
      <ParticleBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-nebula.png" 
            alt="Nebula" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/80 to-background" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium tracking-widest uppercase mb-6 backdrop-blur-sm">
              The Matrix Astronomy Club
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight tracking-tight">
              Exploring the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-primary to-purple-400">
                Universe Beyond
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Join India's fastest growing community of stargazers, scientists, and dreamers. We bring the cosmos closer to you through observation, education, and exploration.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/events">
                <a className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary/90 text-white rounded-full font-medium transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] flex items-center justify-center gap-2 group">
                  Explore Events
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </Link>
              <Link href="/about">
                <a className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-medium transition-all backdrop-blur-sm flex items-center justify-center">
                  Our Mission
                </a>
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/50"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300">
                  <stat.icon size={24} />
                </div>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-muted-foreground text-sm uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-[4/3] rounded-2xl overflow-hidden relative z-10 border border-white/10 shadow-2xl">
                <img src="/images/about-telescope.png" alt="Club Members" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-[50px] z-0" />
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/20 rounded-full blur-[50px] z-0" />
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                From Kolhapur to the <span className="text-primary">Cosmos</span>
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                The Matrix Astronomy Club isn't just a local group—it's a movement. Founded in Kolhapur, we are dedicated to making astronomy accessible, exciting, and professional. Whether you're a beginner with curious eyes or an amateur astronomer with a telescope, there's a place for you here.
              </p>
              <Link href="/about">
                <a className="inline-flex items-center text-primary font-medium hover:text-white transition-colors gap-2 group">
                  Read our story <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </a>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Upcoming Event Preview */}
      <section className="py-24 bg-gradient-to-b from-transparent to-black/20 relative">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-accent text-sm font-bold uppercase tracking-widest mb-2 block">Don't Miss Out</span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white">Next Cosmic Event</h2>
            </div>
            <Link href="/events">
              <a className="text-muted-foreground hover:text-white transition-colors flex items-center gap-2">
                View all events <ArrowRight size={16} />
              </a>
            </Link>
          </div>

          <motion.div 
            className="group relative rounded-3xl overflow-hidden border border-white/10 bg-card hover:border-primary/50 transition-all duration-500"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-2 h-full">
              <div className="h-64 md:h-full overflow-hidden">
                <img 
                  src="/images/event-starparty.png" 
                  alt="Star Party" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center relative">
                <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                  <Star size={120} />
                </div>
                
                <div className="inline-flex items-center gap-2 text-accent text-sm font-bold uppercase tracking-wider mb-4">
                  <Calendar size={16} />
                  <span>March 15, 2026</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 group-hover:text-primary transition-colors">
                  Annual Star Gazing Camp
                </h3>
                
                <p className="text-muted-foreground mb-8 text-lg">
                  Experience the Milky Way like never before. Join us at Panhala Fort for a night of deep sky observation, telescope workshops, and cosmic storytelling.
                </p>
                
                <a 
                  href="https://forms.google.com" 
                  target="_blank" 
                  className="inline-flex w-fit items-center justify-center px-6 py-3 bg-white text-black hover:bg-white/90 rounded-full font-bold transition-all"
                >
                  Register Now
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
