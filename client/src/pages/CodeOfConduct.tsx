import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { motion } from "framer-motion";

export default function CodeOfConduct() {
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
                            Code of <span className="text-primary">Conduct</span>
                        </h1>

                        <div className="glass-card p-8 md:p-12 rounded-3xl space-y-8 text-muted-foreground leading-relaxed">
                            <section>
                                <h2 className="text-2xl font-display font-bold text-white mb-4">Our Pledge</h2>
                                <p>
                                    In the interest of fostering an open and welcoming environment, we as members of The Matrix Astronomy Club pledge to make participation in our community a harassment-free experience for everyone, regardless of age, body size, disability, ethnicity, sex characteristics, gender identity and expression, level of experience, education, socio-economic status, nationality, personal appearance, race, religion, or sexual identity and orientation.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-2xl font-display font-bold text-white mb-4">Our Standards</h2>
                                <p>Examples of behavior that contributes to creating a positive environment include:</p>
                                <ul className="list-disc pl-6 mt-2 space-y-2">
                                    <li>Using welcoming and inclusive language</li>
                                    <li>Being respectful of differing viewpoints and experiences</li>
                                    <li>Gracefully accepting constructive criticism</li>
                                    <li>Focusing on what is best for the community</li>
                                    <li>Showing empathy towards other community members</li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-2xl font-display font-bold text-white mb-4">Enforcement</h2>
                                <p>
                                    Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the club leadership at conduct@thematrixclub.com. All complaints will be reviewed and investigated and will result in a response that is deemed necessary and appropriate to the circumstances.
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
