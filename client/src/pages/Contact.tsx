import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <ParticleBackground />
      <Navbar />

      <section className="pt-40 pb-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-display font-bold text-white mb-6"
            >
              Get in <span className="text-primary">Touch</span>
            </motion.h1>
            <p className="text-xl text-muted-foreground">
              Have questions about the cosmos? Want to join our next event? Reach out to us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <div className="bg-card border border-white/10 p-8 rounded-2xl hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-6">
                  <MapPin size={24} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">Visit Us</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  The Matrix Astronomy Club,<br/>
                  Near Rankala Lake,<br/>
                  Kolhapur, Maharashtra 416001,<br/>
                  India
                </p>
              </div>

              <div className="bg-card border border-white/10 p-8 rounded-2xl hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-6">
                  <Mail size={24} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">Email Us</h3>
                <p className="text-muted-foreground text-lg mb-2">
                  General Inquiries:
                </p>
                <a href="mailto:contact@thematrixclub.com" className="text-white hover:text-primary transition-colors text-xl font-medium">
                  contact@thematrixclub.com
                </a>
              </div>

              <div className="bg-card border border-white/10 p-8 rounded-2xl hover:border-primary/50 transition-colors">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-6">
                  <Phone size={24} />
                </div>
                <h3 className="text-2xl font-display font-bold text-white mb-2">Call Us</h3>
                <p className="text-muted-foreground text-lg mb-2">
                  Mon-Sat, 9am - 6pm
                </p>
                <a href="tel:+919876543210" className="text-white hover:text-primary transition-colors text-xl font-medium">
                  +91 98765 43210
                </a>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="h-full min-h-[400px] rounded-2xl overflow-hidden border border-white/10 relative"
            >
               {/* Static Map Image / Embed Placeholder */}
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3821.696116812836!2d74.2223!3d16.6963!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1000cdec07a29%3A0xece8ea888bc39236!2sRankala%20Lake!5e0!3m2!1sen!2sin!4v1709999999999!5m2!1sen!2sin" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }} 
                 allowFullScreen 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
               />
               <div className="absolute inset-0 pointer-events-none border-4 border-white/5 rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
