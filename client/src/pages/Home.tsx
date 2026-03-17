import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, Users, Telescope, Calendar } from "lucide-react";
import { Link } from "wouter";
import { ReviewSection } from "@/components/sections/ReviewSection";
import { useEffect, useState, useMemo } from "react";
import { MoonPhase, LUNAR_MONTH, NEW_MOON_REFERENCE } from "@/components/ui/MoonPhase";

export default function Home() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  const currentPhase = useMemo(() => {
    const now = new Date().getTime();
    const diff = (now - NEW_MOON_REFERENCE) / (1000 * 60 * 60 * 24);
    const phase = (diff % LUNAR_MONTH) / LUNAR_MONTH;
    return phase < 0 ? phase + 1 : phase;
  }, []);

  const getPhaseData = (phase: number) => {
    if (phase < 0.02 || phase > 0.98) return { name: "New Moon", illumination: 0 };
    if (phase < 0.23) return { name: "Waxing Crescent", illumination: phase * 100 };
    if (phase < 0.27) return { name: "First Quarter", illumination: 50 };
    if (phase < 0.48) return { name: "Waxing Gibbous", illumination: phase * 100 };
    if (phase < 0.52) return { name: "Full Moon", illumination: 100 };
    if (phase < 0.73) return { name: "Waning Gibbous", illumination: (1 - phase) * 100 };
    if (phase < 0.77) return { name: "Last Quarter", illumination: 50 };
    return { name: "Waning Crescent", illumination: (1 - phase) * 100 };
  };

  const moonData = getPhaseData(currentPhase);

  const stats = [
    { label: "Stargazers Engaged", value: "750+", icon: Users },
    { label: "Successful Night Sky Sessions", value: "8+", icon: Telescope },
    { label: "Participant Satisfaction", value: "100%", icon: Star },
    { label: "Hours of Guided Observations", value: "120+ hrs", icon: Calendar },
  ];


  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30">
      <ParticleBackground />
      <Navbar />

      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      >
        {/* Background Image with Overlay */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
        >
          <motion.img
            src="/images/hero-nebula.png"
            alt="Nebula"
            className="w-full h-full object-cover opacity-40 scale-110"
            style={{ y: springY }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/80 to-background" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="relative inline-flex items-center gap-4 mb-8">
              <span className="inline-block py-1.5 px-4 rounded-full bg-white/5 border border-white/10 text-primary text-xs font-bold tracking-widest uppercase backdrop-blur-md relative z-10 shadow-xl shadow-primary/5">
                ✨ The Matrix Astronomy Club
              </span>

              {/* Professional Sliding Info Badge */}
              <motion.div
                initial="initial"
                whileHover="hover"
                className="group flex items-center bg-black/40 border border-white/10 rounded-full pl-2 pr-5 py-1.5 backdrop-blur-xl shadow-2xl hover:border-primary/50 transition-all cursor-help relative overflow-hidden h-[46px] min-w-[170px]"
              >
                <div className="relative z-10">
                  <MoonPhase size="sm" className="scale-90" />
                </div>

                <div className="relative flex flex-col items-start ml-3 h-full justify-center flex-1">
                  {/* Default State: Tonight's Sky */}
                  <motion.div
                    variants={{
                      initial: { y: 0, opacity: 1, filter: "blur(0px)" },
                      hover: { y: -30, opacity: 0, filter: "blur(4px)" }
                    }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="flex flex-col items-start leading-tight absolute inset-0 justify-center"
                  >
                    <span className="text-[10px] text-white/90 font-bold uppercase tracking-[0.15em] whitespace-nowrap">Tonight's Sky</span>
                    <span className="text-[8px] text-primary font-medium uppercase tracking-widest mt-0.5 whitespace-nowrap">
                      Hover for info
                    </span>
                  </motion.div>

                  {/* Hover State: Dynamic Moon Data */}
                  <motion.div
                    variants={{
                      initial: { y: 30, opacity: 0, filter: "blur(4px)" },
                      hover: { y: 0, opacity: 1, filter: "blur(0px)" }
                    }}
                    transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    className="flex flex-col items-start leading-tight"
                  >
                    <span className="text-[10px] text-primary font-bold uppercase tracking-[0.1em] whitespace-nowrap">
                      {moonData.name}
                    </span>
                    <span className="text-[8px] text-white/70 font-medium uppercase tracking-widest mt-0.5 whitespace-nowrap">
                      {Math.round(moonData.illumination)}% Illumination
                    </span>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -inset-1 bg-primary/20 blur-xl rounded-full z-0"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-medium text-white mb-6 leading-tight tracking-tight">
              Kolhapur Stargazing & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-primary to-purple-400">
                Astronomy Experience
              </span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              The Matrix Club is an Astronomy & Space exploration hub, enabling you to discover, collaborate, and conquer the cosmos like never before.
            </p>



            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/events">
                <div className="w-full sm:w-auto px-10 py-4 bg-white text-black hover:bg-white/90 rounded-full font-bold transition-all shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] flex items-center justify-center gap-2 group cursor-pointer text-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <span className="relative z-10 font-heading">Explore Cosmos</span>
                  <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </div>
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
                <img
                  src="/images/about-telescope.png"
                  alt="Astromy club members observing the night sky with a telescope"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
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
                <div className="inline-flex items-center text-primary font-medium hover:text-white transition-colors gap-2 group cursor-pointer">
                  Read our story <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </div>
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
              <div className="text-muted-foreground hover:text-white transition-colors flex items-center gap-2 cursor-pointer">
                View all events <ArrowRight size={16} />
              </div>
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
                  <span>February 28, 2026</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-4 group-hover:text-primary transition-colors">
                  STARGAZING NIGHT
                </h3>

                <p className="text-muted-foreground mb-8 text-lg">
                  We’ll observe planets and deep sky objects through telescopes, learn about constellations in the night sky, and enjoy a warm dinner followed by a cozy campfire. A perfect night to relax, learn, and connect under the stars.                </p>

                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLScrnh-MI4jiXaF33P7qhs8on6dUKiqvkxflC-_cjoomytX2ow/viewform"
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

      <ReviewSection />

      <Footer />
    </div>
  );
}
