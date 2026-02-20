import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function CosmicOrb() {
    const [isHovered, setIsHovered] = useState(false);

    // Mouse tracking for tilt
    const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            mouseX.set(clientX - centerX);
            mouseY.set(clientY - centerY);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    const rotateX = useTransform(mouseY, [-500, 500], [15, -15]);
    const rotateY = useTransform(mouseX, [-500, 500], [-15, 15]);

    return (
        <div className="relative w-full h-[600px] flex items-center justify-center perspective-[1500px]">
            {/* Decorative background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-40" />

            <motion.div
                className="relative preserve-3d"
                style={{
                    rotateX,
                    rotateY,
                }}
                transition={{ type: "spring", stiffness: 100, damping: 30 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
            >
                {/* The Faceted Orb Structure */}
                <div className="relative w-64 h-64 preserve-3d">
                    {/* Main Sphere Glow */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-transparent blur-2xl animate-pulse" />

                    {/* Facets - Simulated with layered rotating divs */}
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute inset-0 border border-white/10 rounded-xl bg-gradient-to-br from-white/5 to-transparent backdrop-blur-[2px] overflow-hidden"
                            style={{
                                rotateX: i * 30,
                                rotateY: i * 60,
                                translateZ: 20,
                            }}
                            animate={{
                                rotateZ: [0, 360],
                            }}
                            transition={{
                                duration: 20 + i * 5,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-accent/10 opacity-50" />
                        </motion.div>
                    ))}

                    {/* Central Core Object */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-gradient-to-br from-[#d48d5e] via-[#4a90e2] to-[#1e1e1e] shadow-[inset_0_0_50px_rgba(255,b2,73,0.3)] border border-white/10 z-10"
                        style={{ translateZ: 50 }}
                        animate={{
                            scale: isHovered ? 1.05 : 1,
                        }}
                    >
                        {/* Metallic Sheen Overlay */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.2),transparent)] rounded-full" />
                    </motion.div>

                    {/* Glowing Ring / Orbit */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] rounded-full border border-white/20 blur-[1px]"
                        style={{
                            rotateX: 75,
                            rotateZ: 45,
                            translateZ: 0,
                        }}
                        animate={{
                            rotateZ: [45, 405],
                        }}
                        transition={{
                            duration: 15,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    >
                        {/* Small orbiter on the ring */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-accent rounded-full shadow-[0_0_15px_#4a90e2]" />
                    </motion.div>

                    {/* Secondary Ring */}
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180%] h-[180%] rounded-full border border-primary/10"
                        style={{
                            rotateX: -45,
                            rotateZ: -45,
                        }}
                        animate={{
                            rotateZ: [-45, -405],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                    />
                </div>

                {/* Dynamic Space Particles */}
                {[...Array(15)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full opacity-0"
                        animate={{
                            opacity: [0, 0.8, 0],
                            scale: [1, 2, 1],
                            x: [(Math.random() - 0.5) * 500, (Math.random() - 0.5) * 600],
                            y: [(Math.random() - 0.5) * 500, (Math.random() - 0.5) * 600],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 4,
                            repeat: Infinity,
                            delay: Math.random() * 5,
                        }}
                        style={{ translateZ: (Math.random() - 0.5) * 400 }}
                    />
                ))}
            </motion.div>
        </div>
    );
}
