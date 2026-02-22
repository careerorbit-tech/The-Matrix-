import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { motion } from "framer-motion";
import { ArrowRight, Globe, Rocket, Users } from "lucide-react";
import { Link } from "wouter";

export default function AstronomyInKolhapur() {
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
                    <span className="text-primary text-sm font-bold uppercase tracking-widest mb-4 block">Education & Exploration</span>
                    <h1 className="text-4xl md:text-6xl font-heading font-medium text-white mb-8">
                        The Future of <span className="text-primary">Astronomy in Kolhapur</span>
                    </h1>
                    <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
                        Join the movement that's bringing world-class astronomy education and cosmic exploration to Kolhapur. We are building a community of space enthusiasts and explorers.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        <Link href="/about">
                            <div className="px-8 py-3 bg-white/5 border border-white/10 rounded-full font-bold cursor-pointer hover:bg-white/10 transition-all">
                                Learn About Our Mission
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
                                <Globe size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Community Focused</h3>
                            <p className="text-muted-foreground">Connecting local astronomy lovers through workshops, meetups, and shared observations.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-card border border-white/10">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <Rocket size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Inspiring Youth</h3>
                            <p className="text-muted-foreground">Special programs for schools and colleges to foster interest in STEM and space science.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-card border border-white/10">
                            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                                <Users size={24} />
                            </div>
                            <h3 className="text-xl font-bold text-white mb-4">Collaborative Learning</h3>
                            <p className="text-muted-foreground">A shared platform for astronomers to collaborate on projects and knowledge sharing.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-8 text-center">Astronomy Hub Kolhapur</h2>
                    <div className="prose prose-invert max-w-none text-muted-foreground space-y-6 text-lg">
                        <p>
                            Astronomy in Kolhapur is reaching new heights. Our club serves as a central hub for anyone interested in the night sky, from casual observers to serious astrophotographers.
                        </p>
                        <p>
                            We provide resources, training, and community support to help you navigate the stars. Join our workshops to learn how to operate telescopes, identify constellations, and capture the beauty of the cosmos.
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
