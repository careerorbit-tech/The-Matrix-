import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { motion } from "framer-motion";
import { ArrowRight, Eye, Moon, Zap } from "lucide-react";
import { Link } from "wouter";

export default function NightSkyKolhapur() {
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
                    <span className="text-primary text-sm font-bold uppercase tracking-widest mb-4 block">Visual Wonders</span>
                    <h1 className="text-4xl md:text-6xl font-heading font-medium text-white mb-8">
                        Professional <span className="text-primary">Night Sky Observation</span> in Kolhapur
                    </h1>
                    <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                        Witness the universe in stunning detail. Our professional night sky observation sessions in Kolhapur take you on a journey through the pillars of creation.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        <Link href="/contact">
                            <div className="px-8 py-3 bg-white text-black rounded-full font-bold cursor-pointer hover:bg-white/90 transition-all flex items-center gap-2">
                                Book a Private Session <ArrowRight size={18} />
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
                                <Moon size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Lunar Experts</h3>
                            <p className="text-muted-foreground">Detailed observations of the Moon's craters, mountains, and mare during various lunar phases.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-card border border-white/10">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <Zap size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Planetary Views</h3>
                            <p className="text-muted-foreground">See Jupiter's moons, Saturn's rings, and Mars' surface features in incredible clarity.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-card border border-white/10">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <Eye size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Deep Sky Objects</h3>
                            <p className="text-muted-foreground">Explore nebulae, star clusters, and galaxies that are invisible to the naked eye.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8 text-center">Unforgettable Night Sky Experiences</h2>
                    <div className="prose prose-invert max-w-none text-muted-foreground space-y-6 text-lg">
                        <p>
                            Night sky observation in Kolhapur offers a unique opportunity to disconnect from the city light and reconnect with the vastness of space. Our curated observation sites are chosen for their minimal light pollution and clear views.
                        </p>
                        <p>
                            Each session is accompanied by informative commentary, helping you understand what you're seeing and the science behind the celestial objects. It's a journey of discovery for all ages.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
