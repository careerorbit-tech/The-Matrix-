import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { motion } from "framer-motion";
import { Target, Lightbulb, Globe, ArrowRight } from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      desc: "To demystify the cosmos and make astronomy accessible to everyone, fostering a scientific temper in society."
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

      {/* Header */}
      <section className="pt-40 pb-20 relative">
        <div className="container mx-auto px-6 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold text-white mb-6"
          >
            About <span className="text-primary">The Matrix</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            We are more than a club. We are a community of explorers looking up at the same sky, dreaming the same dreams.
          </motion.p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">The Journey Begins</h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  "The Matrix" was born in Kolhapur out of a simple shared passion: the night sky. What started as a small group of friends with a single telescope has grown into a premier organization dedicated to astronomy.
                </p>
                <p>
                  In a world often too focused on the ground, we teach people to look up. Astronomy is the oldest science, yet it remains the most futuristic. It humbles us, inspires us, and connects us to our origins.
                </p>
                <p>
                  We organize star parties, telescope making workshops, solar observation sessions, and lectures by eminent scientists. Our goal is professional-grade amateur astronomy.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
               <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <img src="/images/about-telescope.png" alt="Team" className="w-full h-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 bg-white/[0.02] border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary mb-6">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-display font-bold text-white mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Astronomy Matters */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 rounded-3xl p-1 md:p-1">
            <div className="bg-background rounded-[22px] p-8 md:p-16 text-center relative overflow-hidden">
               {/* Background pattern */}
               <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
               
               <div className="relative z-10 max-w-4xl mx-auto">
                 <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-8">Why Astronomy Matters?</h2>
                 <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                   "Astronomy compels the soul to look upwards and leads us from this world to another." — Plato.
                   <br/><br/>
                   In studying the stars, we learn physics, mathematics, chemistry, and philosophy. We learn patience and perspective. At The Matrix, we believe that understanding our place in the universe makes us better caretakers of our own planet.
                 </p>
                 <a href="/events" className="inline-flex items-center gap-2 text-white font-bold border-b-2 border-primary hover:text-primary transition-colors pb-1">
                   Join our next observation session <ArrowRight size={18} />
                 </a>
               </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
