import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export function CosmicCube() {
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

    const rotateX = useTransform(mouseY, [-500, 500], [20, -20]);
    const rotateY = useTransform(mouseX, [-500, 500], [-20, 20]);

    // Cubic structure layers for a more "beautiful" and complex look
    const layers = [
        { size: "w-[300px] h-[300px]", opacity: "opacity-20", speed: 25, z: -100, border: "border-primary/10" },
        { size: "w-[240px] h-[240px]", opacity: "opacity-40", speed: -20, z: -50, border: "border-primary/20" },
        { size: "w-[180px] h-[180px]", opacity: "opacity-60", speed: 15, z: 0, border: "border-accent/30" },
        { size: "w-[120px] h-[120px]", opacity: "opacity-80", speed: -10, z: 50, border: "border-white/40" },
    ];

    return (
        <div className="relative w-full h-[600px] flex items-center justify-center perspective-[1200px]">
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
                {/* Main Glowing Core - More intense and multi-layered */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-tr from-primary via-purple-600 to-accent blur-[60px] opacity-40"
                    animate={{
                        scale: isHovered ? [1, 1.3, 1] : 1,
                        opacity: isHovered ? [0.4, 0.7, 0.4] : 0.4,
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                />

                <motion.div
                    className="relative w-28 h-28 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 shadow-[0_0_80px_rgba(139,92,246,0.6)] flex items-center justify-center z-10"
                    style={{ translateZ: 150 }}
                    animate={{
                        boxShadow: isHovered
                            ? ["0 0 80px rgba(139,92,246,0.6)", "0 0 120px rgba(139,92,246,0.9)", "0 0 80px rgba(139,92,246,0.6)"]
                            : "0 0 80px rgba(139,92,246,0.6)"
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-white/30 to-transparent border border-white/10 overflow-hidden relative">
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent"
                            animate={{ y: ["100%", "-100%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                    </div>
                </motion.div>

                {/* Outer Wireframe Cubes - Layered and rotating */}
                {layers.map((layer, idx) => (
                    <motion.div
                        key={idx}
                        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${layer.size} border ${layer.border} rounded-xl preserve-3d`}
                        style={{ translateZ: layer.z }}
                        animate={{
                            rotateZ: [0, 360],
                            scale: isHovered ? 1.1 : 1,
                            rotateX: isHovered ? [0, 10, 0] : 0,
                        }}
                        transition={{
                            rotateZ: { duration: Math.abs(layer.speed), repeat: Infinity, ease: "linear" },
                            scale: { duration: 0.6 },
                            rotateX: { duration: 2, repeat: Infinity }
                        }}
                    >
                        {/* Geometric complexity: Internal crosses and diagonals */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-full h-px bg-white/5 rotate-45" />
                            <div className="w-full h-px bg-white/5 -rotate-45" />
                            <div className="w-px h-full bg-white/5" />
                            <div className="w-full h-px bg-white/5" />
                        </div>

                        <div className="absolute inset-4 border border-white/10 rounded-lg -rotate-12" />
                        <div className="absolute inset-8 border border-white/5 rounded-md rotate-12" />
                    </motion.div>
                ))}

                {/* High-fidelity particles / "Stars" */}
                {[...Array(12)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1.5 h-1.5 bg-white rounded-full"
                        initial={{
                            x: (Math.random() - 0.5) * 400,
                            y: (Math.random() - 0.5) * 400,
                            z: (Math.random() - 0.5) * 400
                        }}
                        animate={{
                            y: [0, (Math.random() - 0.5) * 50, 0],
                            opacity: [0.1, 0.8, 0.1],
                            scale: [1, 1.5, 1]
                        }}
                        transition={{
                            duration: 3 + Math.random() * 3,
                            repeat: Infinity,
                            delay: Math.random() * 2
                        }}
                        style={{
                            translateZ: (Math.random() - 0.5) * 500,
                            boxShadow: "0 0 10px rgba(255,255,255,0.8)"
                        }}
                    />
                ))}
            </motion.div>

            {/* Background depth glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[150px] pointer-events-none opacity-50" />
        </div>
    );
}
