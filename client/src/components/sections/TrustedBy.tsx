import { motion } from "framer-motion";
import { Star, Telescope, Atom, Cpu, Globe, Rocket, Satellite, Microscope } from "lucide-react";

const partners = [
    { name: "Stellar University", icon: Star, color: "#60A5FA" },
    { name: "Nova Observatory", icon: Telescope, color: "#F87171" },
    { name: "Galactic Science", icon: Atom, color: "#A78BFA" },
    { name: "Quantum Tech", icon: Cpu, color: "#FBBF24" },
    { name: "Astronomy Global", icon: Globe, color: "#34D399" },
    { name: "NASA", icon: Rocket, color: "#EF4444" },
    { name: "ESA", icon: Satellite, color: "#3B82F6" },
    { name: "ISRO", icon: Microscope, color: "#F59E0B" },
];

export function TrustedBy() {
    // Duplicate the list to ensure seamless infinite scroll
    const scrollingPartners = [...partners, ...partners];

    return (
        <section className="py-20 bg-background overflow-hidden relative">
            <div className="container mx-auto px-6 mb-12 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-2xl md:text-3xl font-display font-bold text-white tracking-widest uppercase"
                >
                    Trusted By
                </motion.h2>
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "100px" }}
                    viewport={{ once: true }}
                    className="h-1 bg-primary mx-auto mt-4 rounded-full"
                />
            </div>

            <div className="relative group">
                {/* Gradient edge masks */}
                <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
                <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

                <div className="flex overflow-hidden">
                    <motion.div
                        className="flex gap-12 md:gap-24 items-center whitespace-nowrap"
                        animate={{
                            x: ["0%", "-50%"],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: "loop",
                                duration: 30,
                                ease: "linear",
                            },
                        }}
                        whileHover={{ animationPlayState: "paused" }}
                    >
                        {scrollingPartners.map((partner, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-4 group/logo cursor-pointer px-4"
                            >
                                <div
                                    className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center grayscale group-hover/logo:grayscale-0 group-hover/logo:scale-110 transition-all duration-500"
                                    style={{ color: partner.color }}
                                >
                                    <partner.icon size={32} />
                                </div>
                                <span className="text-muted-foreground group-hover/logo:text-white font-heading font-medium tracking-wider text-sm md:text-base grayscale group-hover/logo:grayscale-0 transition-all duration-500">
                                    {partner.name}
                                </span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
