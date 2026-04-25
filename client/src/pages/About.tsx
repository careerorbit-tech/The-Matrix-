import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { motion } from "framer-motion";
import { Target, Lightbulb, Globe, ArrowRight, Instagram, Linkedin, Twitter } from "lucide-react";

const founders = [
  {
    name: "Vinayak More",
    role: "CEO & Founder",
    image: "/images/vinayak.jpeg",
    bio: "Visionary leader with a passion for cosmic exploration and community building."
  },
  {
    name: "Abhay Ayare",
    role: "CTO & Founder",
    image: "/images/Abhay (3).jpeg",
    bio: "Expert in astronomical instrumentation and deep-sky imaging technologies."
  },
  {
    name: "Jatin Savant",
    role: "CFO & Founder",
    image: "/images/jatin.jpeg",
    bio: "Strategic financial planner ensuring the sustainable growth of our cosmic missions."
  }
];

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      desc: "Our mission is to make astronomy simple, accessible, and exciting for everyone, while inspiring curiosity about the universe."
    },
    {
      icon: Lightbulb,
      title: "Our Vision",
      desc: "To become India's leading platform for amateur astronomy, research, and space science education."
    },
    {
      icon: Globe,
      title: "Expansion",
      desc: "Starting from Kolhapur, we are expanding our footprint to connect stargazers across the nation."
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <ParticleBackground />
      <Navbar />

      <section className="pt-28 sm:pt-40 md:pt-48 pb-16 sm:pb-24 relative overflow-hidden">
        {/* Background Nebula Effect */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full -z-10 animate-pulse" />

        <div className="container mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <span className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">Our Story</span>
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-heading font-black text-white mb-6 sm:mb-8 tracking-tighter uppercase">
              About <span className="text-white/40">The Matrix</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto font-medium tracking-wide">
              We are more than a club. We are a community of explorers looking up at the same sky, dreaming the same dreams.
            </p>
          </motion.div>
        </div>
      </section>


      <section className="py-12 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-10"
            >
              <h2 className="text-3xl md:text-4xl font-display font-black text-white tracking-tighter uppercase leading-tight italic">The <span className="text-primary">Journey</span> Begins</h2>
              <div className="space-y-8 text-white/50 text-lg leading-relaxed font-medium">
                <p>
                  "The Matrix" was born in Kolhapur out of a simple shared passion: the night sky. What started as a small group of friends with a single telescope has grown into a premier organization dedicated to astronomy.
                </p>
                <p>
                  In a world often too focused on the ground, we teach people to look up. Astronomy is the oldest science, yet it remains the most futuristic. It humbles us, inspires us, and connects us to our origins.
                </p>
                <div className="flex items-center gap-4 p-6 glass-card border-none bg-primary/5 rounded-3xl">
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center text-primary">
                    <Globe size={24} />
                  </div>
                  <p className="text-sm text-white/80 font-black uppercase tracking-widest leading-none">
                    Founded in Kolhapur, <br />Exploring the Cosmos.
                  </p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative aspect-square lg:aspect-video rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl group"
            >
              <img
                src="/images/about-telescope.png"
                alt="Team of explorers using a high-end telescope"
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-32 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {values.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="glass-card p-10 group hover:border-primary/30 transition-all duration-500"
              >
                <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-black transition-all duration-500">
                  <item.icon size={32} />
                </div>
                <h3 className="text-2xl font-display font-black text-white mb-4 tracking-tighter uppercase">{item.title}</h3>
                <p className="text-white/50 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group glass-premium p-1 rounded-[2rem] md:rounded-[4rem]"
          >
            <div className="bg-background/80 backdrop-blur-3xl rounded-[1.8rem] md:rounded-[3.8rem] p-8 sm:p-12 md:p-24 text-center relative overflow-hidden border border-white/5 shadow-2xl">
              {/* Background patterns */}
              <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />

              <div className="relative z-10 max-w-4xl mx-auto">
                <span className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-8 block">Cosmic Philosophy</span>
                <h2 className="text-2xl sm:text-4xl md:text-6xl font-display font-black text-white mb-6 sm:mb-10 tracking-tighter uppercase leading-tight italic">
                  "Astronomy compels the soul to look upwards and leads us from this world to another."
                </h2>
                <p className="text-xl text-white/50 mb-12 leading-relaxed font-medium italic">
                  — Plato
                </p>
                <p className="text-lg text-white/60 mb-12 leading-relaxed font-medium">
                  In studying the stars, we learn physics, mathematics, chemistry, and philosophy. We learn patience and perspective. At The Matrix, we believe that understanding our place in the universe makes us better caretakers of our own planet.
                </p>
                <a href="/events" className="btn-magnetic group/link inline-flex items-center gap-4 px-10 py-5 bg-white text-black font-black rounded-full hover:bg-primary hover:text-white transition-all text-xs uppercase tracking-[0.2em] shadow-2xl glass-shine">
                  <span className="relative z-10">Join the Mission</span>
                  <ArrowRight size={18} className="relative z-10 group-hover/link:translate-x-2 transition-transform" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12 md:mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <span className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">Command Center</span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-heading font-black text-white mb-6 sm:mb-8 tracking-tighter uppercase leading-[0.9]">
                Meet Our <span className="text-white/40">Founders</span>
              </h2>
              <p className="text-lg text-white/50 max-w-2xl mx-auto font-medium tracking-wide">
                The visionary minds behind The Matrix, dedicated to bringing the cosmos closer to everyone.
              </p>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Vinayak More",
                role: "CEO & Founder",
                image: "/images/vinayak.jpeg",
                bio: "Visionary leader with a passion for cosmic exploration and community building."
              },
              {
                name: "Abhay Ayare",
                role: "CTO & Founder",
                image: "/images/Abhay1.jpeg",
                bio: "Expert in astronomical instrumentation and deep-sky imaging technologies."
              },
              {
                name: "Jatin Savant",
                role: "CFO & Founder",
                image: "/images/jatin.jpeg",
                bio: "Strategic financial planner ensuring the sustainable growth of our cosmic missions."
              }
            ].map((founder, i) => (
              <motion.div
                key={founder.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="group relative bg-[#0A0A0A] rounded-[2rem] overflow-hidden border border-white/5 hover:border-primary/30 transition-all duration-500 shadow-2xl glass-shine"
              >
                {/* Image Section with Fade */}
                <div className="relative aspect-[4/3] sm:aspect-[4/4] overflow-hidden">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  {/* Top Badges (Reference Item) */}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] uppercase font-bold tracking-widest text-primary flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      Core Team
                    </div>
                  </div>

                  {/* Fade into text section */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-100" />
                </div>

                {/* Text Content Section (Apple-style) */}
                <div className="p-5 sm:p-8 pt-0 -mt-12 relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-2 group-hover:text-primary transition-colors tracking-tight">
                    {founder.name}
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-primary font-black text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.3em] brightness-125">
                      {founder.role}
                    </span>
                  </div>
                  <p className="text-white/60 text-[15px] leading-relaxed mb-8 line-clamp-3 group-hover:text-white/80 transition-colors">
                    {founder.bio}
                  </p>

                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
