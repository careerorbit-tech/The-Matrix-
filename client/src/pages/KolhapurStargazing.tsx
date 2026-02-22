import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { motion } from "framer-motion";
import { ArrowRight, Star, Telescope, Calendar } from "lucide-react";
import { Link } from "wouter";

export default function KolhapurStargazing() {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden">
            <ParticleBackground />
            <Navbar />

            <section className="relative pt-32 pb-20 px-6 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="container mx-auto max-w-4xl"
                >
                    <span className="text-primary text-sm font-bold uppercase tracking-widest mb-4 block">Destination: The Stars</span>
                    <h1 className="text-4xl md:text-6xl font-heading font-medium text-white mb-8">
                        Experience the Best <span className="text-primary">Kolhapur Stargazing</span>
                    </h1>
                    <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                        Discover the magic of the cosmos right here in Kolhapur. Our stargazing sessions offer a professional yet accessible gateway to the stars, perfect for families, students, and astronomy enthusiasts.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        <Link href="/events">
                            <div className="px-8 py-3 bg-white text-black rounded-full font-bold cursor-pointer hover:bg-white/90 transition-all flex items-center gap-2">
                                Join Next Event <ArrowRight size={18} />
                            </div>
                        </Link>
                    </div>
                </motion.div>
            </section>

            <section className="py-20 bg-white/[0.02] border-y border-white/5">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        <div className="p-8 rounded-2xl bg-card border border-white/10">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <Telescope size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Professional Gear</h3>
                            <p className="text-muted-foreground">Observe deep-sky objects, planets, and nebulae through our high-end professional telescopes.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-card border border-white/10">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <Star size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Expert Guidance</h3>
                            <p className="text-muted-foreground">Learn from experienced astronomers who will guide you through constellations and cosmic mysteries.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-card border border-white/10">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <Calendar size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Regular Events</h3>
                            <p className="text-muted-foreground">We host monthly star parties and workshops across various locations in and around Kolhapur.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8 text-center">Why Choose Kolhapur Stargazing?</h2>
                    <div className="prose prose-invert max-w-none text-muted-foreground space-y-6 text-lg">
                        <p>
                            Kolhapur Stargazing is more than just looking through a lens. It's an immersive educational experience that brings the complexity of space into clear focus. Our mission is to inspire the next generation of space explorers in Maharashtra.
                        </p>
                        <p>
                            From the rings of Saturn to the distant Andromeda Galaxy, we provide you with the tools and knowledge to see the universe like never before. Our events are designed to be interactive, informative, and unforgettable.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
