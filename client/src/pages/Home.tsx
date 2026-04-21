import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { ArrowRight, Star, Users, Telescope, Calendar } from "lucide-react";
import { Link } from "wouter";
import { ReviewSection } from "@/components/sections/ReviewSection";
import { useEffect, useState, useMemo } from "react";
import { MoonPhase, LUNAR_MONTH, NEW_MOON_REFERENCE } from "@/components/ui/MoonPhase";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const aboutY = useTransform(scrollY, [200, 1200], [0, -100]);
  const aboutSpringY = useSpring(aboutY, { stiffness: 100, damping: 30 });

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
    { label: "Professional Telescopes", value: "4", icon: Telescope },
    { label: "Successful Sessions", value: "12+", icon: Star },
    { label: "Observation Hours", value: "150+ hrs", icon: Calendar },
  ];


  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden selection:bg-primary/30">
      <ParticleBackground />
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
        {/* Background Image with Overlay */}
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2 }}
          style={{ x: mousePos.x * 0.5, y: springY.get() + mousePos.y * 0.5 }}
        >
          <motion.img
            src="/images/hero-nebula.png"
            alt="Nebula"
            className="w-full h-full object-cover opacity-30 scale-110 nebula-drift"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
        </motion.div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              <span className="inline-block py-2 px-6 rounded-full bg-white/5 border border-white/10 text-primary text-[10px] font-black tracking-[0.3em] uppercase backdrop-blur-3xl relative z-10 shadow-2xl">
                ✨ The Matrix Astronomy Club
              </span>

              {/* Professional Sliding Info Badge */}
              <motion.div
                initial="initial"
                whileHover="hover"
                className="group flex items-center bg-white/[0.03] border border-white/5 rounded-full pl-2 pr-6 py-2 backdrop-blur-3xl shadow-2xl hover:border-primary/30 transition-all cursor-help relative overflow-hidden h-[48px] min-w-[200px]"
              >
                <div className="relative z-10">
                  <MoonPhase size="sm" className="scale-90" />
                </div>

                <div className="relative flex flex-col items-start ml-4 h-full justify-center flex-1">
                  {/* Default State: Tonight's Sky */}
                  <motion.div
                    variants={{
                      initial: { x: 0, opacity: 1, filter: "blur(0px)" },
                      hover: { x: -20, opacity: 0, filter: "blur(4px)" }
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-start leading-tight absolute inset-0 justify-center"
                  >
                    <span className="text-[10px] text-white/90 font-black uppercase tracking-[0.1em] whitespace-nowrap">Tonight's Sky</span>
                    <span className="text-[8px] text-primary font-bold uppercase tracking-widest mt-0.5 whitespace-nowrap">
                      Kolhapur, Maharashtra
                    </span>
                  </motion.div>

                  {/* Hover State: Dynamic Moon Data */}
                  <motion.div
                    variants={{
                      initial: { x: 20, opacity: 0, filter: "blur(4px)" },
                      hover: { x: 0, opacity: 1, filter: "blur(0px)" }
                    }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-start leading-tight"
                  >
                    <span className="text-[10px] text-primary font-black uppercase tracking-[0.05em] whitespace-nowrap">
                      {moonData.name}
                    </span>
                    <span className="text-[8px] text-white/70 font-bold uppercase tracking-widest mt-0.5 whitespace-nowrap">
                      {Math.round(moonData.illumination)}% Visibility
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-8xl font-heading font-black text-white mb-8 leading-[1.1] tracking-tight"
              style={{ x: mousePos.x * -0.2, y: mousePos.y * -0.2 }}
            >
              Kolhapur Stargazing & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-primary to-purple-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                Astronomy Experience
              </span>
            </motion.h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 font-medium leading-relaxed tracking-wide">
              The Matrix Club is an Astronomy & Space exploration hub, enabling you to discover, collaborate, and conquer the cosmos like never before.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/events">
                <div className="btn-magnetic w-full sm:w-auto px-12 py-5 bg-white text-black hover:bg-primary hover:text-white rounded-full font-black transition-all shadow-2xl flex items-center justify-center gap-3 group cursor-pointer text-sm uppercase tracking-widest relative overflow-hidden glass-shine">
                  <span className="relative z-10">Explore Cosmos</span>
                  <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-muted-foreground/30"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        </motion.div>
      </section>


      {/* Stats Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-10">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                className="glass-card p-8 group hover:scale-105 glass-shine"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-black transition-all duration-500">
                  <stat.icon size={28} />
                </div>
                <h3 className="text-4xl lg:text-5xl font-display font-black text-white mb-2 tracking-tighter">
                  {stat.value}
                </h3>
                <p className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] font-black group-hover:text-primary transition-colors">
                  {stat.label}
                </p>
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
              style={{ y: aboutSpringY }}
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
              <h2 className="text-2xl md:text-4xl font-display font-black text-white mb-6 uppercase tracking-tighter leading-tight">
                From Kolhapur to the <br /><span className="text-primary italic">Cosmos</span>
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

      {/* Featured Event Preview */}
      <section className="py-32 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-primary text-xs font-black uppercase tracking-[0.4em] mb-4 block">Seasonal Spotlight</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black text-white tracking-tighter leading-[0.9] uppercase">
                Featured <br /><span className="text-white/40">Cosmic Event</span>
              </h2>
            </div>
            <Link href="/events">
              <div className="group flex items-center gap-4 text-white font-black text-xs uppercase tracking-widest cursor-pointer">
                <span className="pb-1 border-b-2 border-white/10 group-hover:border-primary transition-all">Explore All Schedule</span>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary group-hover:text-black transition-all">
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          </div>

          <motion.div
            className="glass-premium rounded-[3rem] overflow-hidden group"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="grid lg:grid-cols-2">
              <div className="h-80 lg:h-full overflow-hidden relative">
                <img
                  src="/images/event-starparty.png"
                  alt="Star Party"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent hidden lg:block" />
              </div>
              <div className="p-10 lg:p-20 flex flex-col justify-center relative">
                <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 group-hover:scale-110 transition-all duration-1000">
                  <Star size={200} />
                </div>

                <div className="inline-flex items-center gap-3 text-accent text-xs font-black uppercase tracking-[0.2em] mb-8">
                  <Calendar size={18} />
                  <span>April 25, 2026</span>
                </div>

                <h3 className="text-3xl md:text-5xl font-display font-black text-white mb-6 tracking-tighter leading-tight group-hover:text-primary transition-colors uppercase">
                  Star Gazing <br />Event
                </h3>

                <div className="flex flex-wrap items-center gap-4 mb-10">
                  <Badge variant="destructive" className="bg-red-500/10 text-red-500 border-red-500/20 px-4 py-2 font-black uppercase text-[10px] tracking-widest animate-pulse">
                    🏆 Biggest Offer of the Year
                  </Badge>
                  <div className="text-primary font-black text-2xl tracking-tighter">₹999 <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Registration</span></div>
                </div>

                <div className="space-y-6 mb-12">
                  <p className="text-white/60 text-lg leading-relaxed font-medium">
                    Hey there, cosmic dreamer! Get ready to drift beyond the ordinary and step into a night filled with celestial magic. Join Team Matrix for an unforgettable evening under the stars where we’ll explore the moon’s mysteries and spot constellations.
                  </p>
                </div>

                <Link href="/events">
                  <div className="inline-flex w-fit items-center justify-center px-10 py-5 bg-white text-black hover:bg-primary hover:text-white rounded-full font-black text-sm uppercase tracking-widest transition-all duration-500 shadow-2xl group/btn cursor-pointer">
                    Secure Your Seat
                    <ArrowRight size={20} className="ml-3 group-hover/btn:translate-x-2 transition-transform" />
                  </div>
                </Link>
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
