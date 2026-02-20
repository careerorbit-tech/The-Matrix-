import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { motion } from "framer-motion";

export default function PrivacyPolicy() {
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
                            Privacy <span className="text-primary">Policy</span>
                        </h1>

                        <div className="glass-card p-8 md:p-12 rounded-3xl space-y-8 text-muted-foreground leading-relaxed">
                            <section>
                                <h2 className="text-2xl font-display font-bold text-white mb-4">1. Information We Collect</h2>
                                <p>
                                    We collect information you provide directly to us when you register for events, subscribe to our newsletter, or contact us. This may include your name, email address, and any other information you choose to provide.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-display font-bold text-white mb-4">2. How We Use Your Information</h2>
                                <p>
                                    We use the information we collect to provide, maintain, and improve our services, to communicate with you about events and updates, and to respond to your comments and questions.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-display font-bold text-white mb-4">3. Data Security</h2>
                                <p>
                                    We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-display font-bold text-white mb-4">4. Cookies</h2>
                                <p>
                                    We use cookies and similar technologies to track your activity on our website and hold certain information to improve your experience.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-display font-bold text-white mb-4">5. Contact Us</h2>
                                <p>
                                    If you have any questions about this Privacy Policy, please contact us at privacy@thematrixclub.com.
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
