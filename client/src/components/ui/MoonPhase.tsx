import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface MoonPhaseProps {
    className?: string;
    size?: "sm" | "md" | "lg";
    showDetails?: boolean;
}

export const LUNAR_MONTH = 29.530588853;
export const NEW_MOON_REFERENCE = new Date("2000-01-06T18:14:00Z").getTime();

export function MoonPhase({ className, size = "md", showDetails = false }: MoonPhaseProps) {
    const currentPhase = useMemo(() => {
        const now = new Date().getTime();
        const diff = (now - NEW_MOON_REFERENCE) / (1000 * 60 * 60 * 24);
        const phase = (diff % LUNAR_MONTH) / LUNAR_MONTH;
        return phase < 0 ? phase + 1 : phase;
    }, []);

    const getPhaseData = (phase: number) => {
        if (phase < 0.02 || phase > 0.98) return { name: "New Moon", illumination: 0 };
        if (phase < 0.23) return { name: "Waxing Crescent", illumination: phase * 100 };
        if (phase < 0.27) return { name: "First Quarter", illumination: 50 };
        if (phase < 0.48) return { name: "Waxing Gibbous", illumination: phase * 100 };
        if (phase < 0.52) return { name: "Full Moon", illumination: 100 };
        if (phase < 0.73) return { name: "Waning Gibbous", illumination: (1 - phase) * 100 };
        if (phase < 0.77) return { name: "Last Quarter", illumination: 50 };
        return { name: "Waning Crescent", illumination: (1 - phase) * 100 };
    };

    const { name, illumination } = getPhaseData(currentPhase);

    const sizeClasses = {
        sm: "w-10 h-10",
        md: "w-20 h-20",
        lg: "w-48 h-48 md:w-64 md:h-64",
    };

    const renderMoon = () => {
        return (
            <div
                className={cn("group relative rounded-full select-none transition-transform duration-700", sizeClasses[size])}
            >
                {/* External Atmospheric Glow */}
                <div className="absolute inset-[-20%] rounded-full bg-primary/10 blur-[40px] opacity-40 group-hover:opacity-60 transition-opacity" />
                <div className="absolute inset-[-5%] rounded-full bg-white/5 blur-[20px] pointer-events-none" />

                <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <defs>
                        <radialGradient id="moonBase" cx="65%" cy="35%" r="60%">
                            <stop offset="0%" stopColor="#f8f9fa" />
                            <stop offset="40%" stopColor="#e5e7eb" />
                            <stop offset="80%" stopColor="#9ca3af" />
                            <stop offset="100%" stopColor="#4b5563" />
                        </radialGradient>

                        <mask id="moonMask">
                            <circle cx="50" cy="50" r="48" fill="white" />
                        </mask>
                    </defs>

                    {/* Dark Background */}
                    <circle cx="50" cy="50" r="48" fill="#030712" />

                    {/* The Moon Body */}
                    <g mask="url(#moonMask)">
                        <circle cx="50" cy="50" r="48" fill="url(#moonBase)" />

                        <circle cx="35" cy="40" r="15" fill="#4b5563" opacity="0.4" filter="blur(8px)" />
                        <circle cx="65" cy="60" r="12" fill="#374151" opacity="0.3" filter="blur(6px)" />
                        <circle cx="50" cy="25" r="8" fill="#4b5563" opacity="0.3" filter="blur(5px)" />

                        <circle cx="25" cy="45" r="2" fill="#000" opacity="0.2" />
                        <circle cx="70" cy="30" r="1.5" fill="#000" opacity="0.2" />
                        <circle cx="45" cy="70" r="3" fill="#000" opacity="0.15" />

                        {/* Terminator Shadow */}
                        <motion.path
                            initial={false}
                            animate={{
                                d: currentPhase <= 0.5
                                    ? `M 50 2 A 48 48 0 0 1 50 98 A ${Math.abs(50 - currentPhase * 200)} 48 0 0 ${currentPhase > 0.25 ? 1 : 0} 50 2`
                                    : `M 50 2 A 48 48 0 0 0 50 98 A ${Math.abs(currentPhase * 200 - 150)} 48 0 0 ${currentPhase > 0.75 ? 0 : 1} 50 2`
                            }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            fill="#030712"
                            fillOpacity="0.95"
                        />
                    </g>

                    <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" />
                </svg>

                <div className="absolute inset-0 rounded-full shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.6),inset_5px_5px_15px_rgba(255,255,255,0.2)] pointer-events-none" />
            </div>
        );
    };

    return (
        <div className={cn("flex flex-col items-center gap-4", className)}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="cursor-help"
                        >
                            {renderMoon()}
                        </motion.div>
                    </TooltipTrigger>
                    <TooltipContent className="bg-background/90 backdrop-blur-xl border-white/10 text-white p-4 shadow-2xl">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                <span className="font-display font-medium text-white uppercase tracking-wider text-xs">{name}</span>
                            </div>
                            <div className="h-px bg-white/10 w-full" />
                            <span className="text-[11px] text-muted-foreground font-heading">Illumination: {Math.round(illumination)}%</span>
                        </div>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>

            {showDetails && (
                <div className="text-center space-y-1">
                    <h4 className="text-lg md:text-xl font-display font-bold text-white uppercase tracking-[0.2em]">{name}</h4>
                    <p className="text-[10px] md:text-xs text-primary/80 font-heading uppercase tracking-[0.3em] font-medium">Lunar Visibility — {Math.round(illumination)}%</p>
                </div>
            )}
        </div>
    );
}
