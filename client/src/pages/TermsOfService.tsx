import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { motion } from "framer-motion";

export default function TermsOfService() {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-hidden">
            <ParticleBackground />
            <Navbar />

            <main className="pt-40 pb-20 relative z-10">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-8">
                            Terms of <span className="text-primary">Service</span>
                        </h1>

                        <div className="glass-card p-8 md:p-12 rounded-3xl space-y-8 text-muted-foreground leading-relaxed">
                            <section>
                                <h2 className="text-2xl font-display font-bold text-white mb-4">1. Acceptance of Terms</h2>
                                <p>
                                    By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-display font-bold text-white mb-4">2. Use License</h2>
                                <p>
                                    Permission is granted to temporarily download one copy of the materials on The Matrix Astronomy Club's website for personal, non-commercial transitory viewing only.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-display font-bold text-white mb-4">3. Disclaimer</h2>
                                <p>
                                    The materials on The Matrix Astronomy Club's website are provided on an 'as is' basis. The club makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-display font-bold text-white mb-4">4. Limitations</h2>
                                <p>
                                    In no event shall The Matrix Astronomy Club or its suppliers be liable for any damages arising out of the use or inability to use the materials on the website.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-display font-bold text-white mb-4">5. Revisions</h2>
                                <p>
                                    The Matrix Astronomy Club may revise these terms of service at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
                                </p>
                            </section>

                            <p className="text-sm pt-8 border-t border-white/10">
                                Last updated: February 11, 2026
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
