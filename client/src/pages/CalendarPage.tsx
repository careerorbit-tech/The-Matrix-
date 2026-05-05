import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import AstroCalendar from "@/components/AstroCalendar/AstroCalendar";
import { motion } from "framer-motion";

const HIGHLIGHT_EVENTS = [
    {
        date: "May 12",
        emoji: "🩸",
        name: "Total Lunar Eclipse",
        nameHindi: "पूर्ण चंद्रग्रहण",
        desc: "The most spectacular event of 2026 — a Blood Moon fully visible from Kolhapur for 69 minutes.",
        color: "#e63946",
        bg: "rgba(230,57,70,0.08)",
        border: "rgba(230,57,70,0.25)",
    },
    {
        date: "Dec 13",
        emoji: "☄️",
        name: "Geminid Meteor Shower",
        nameHindi: "",
        desc: "~120 meteors/hr — the year's most reliable and spectacular shower peaking in dark skies.",
        color: "#ff6b35",
        bg: "rgba(255,107,53,0.08)",
        border: "rgba(255,107,53,0.25)",
    },
    {
        date: "Oct 29",
        emoji: "🪐",
        name: "Jupiter at Opposition",
        nameHindi: "बृहस्पति",
        desc: "Jupiter at closest & brightest — all four Galilean moons visible in simple binoculars.",
        color: "#a78bfa",
        bg: "rgba(167,139,250,0.08)",
        border: "rgba(167,139,250,0.25)",
    },
    {
        date: "May 05",
        emoji: "☄️",
        name: "Eta Aquariids Peak",
        nameHindi: "",
        desc: "Halley's Comet debris. Southern India gets the world's best view of this shower.",
        color: "#ff6b35",
        bg: "rgba(255,107,53,0.08)",
        border: "rgba(255,107,53,0.25)",
    },
];

const STATS = [
    { value: "54", label: "Astronomy Events", emoji: "🌌" },
    { value: "24", label: "Moon Phases", emoji: "🌕" },
    { value: "11", label: "Meteor Showers", emoji: "☄️" },
    { value: "4", label: "Eclipses (Solar & Lunar)", emoji: "🌑" },
];

export default function CalendarPage() {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
            <ParticleBackground />
            <Navbar />

            {/* ── Hero ────────────────────────────────────────────────────────── */}
            <section className="relative pt-32 pb-16 px-6 overflow-hidden">
                {/* Background blobs */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-gradient-to-b from-blue-900/20 to-transparent rounded-full blur-3xl" />
                    <div className="absolute top-20 left-[15%] w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />
                    <div className="absolute top-20 right-[15%] w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
                </div>

                <div className="container mx-auto text-center relative z-10 max-w-3xl">
                    {/* Label */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold tracking-[0.25em] uppercase text-cyan-400 mb-6"
                    >
                        <span>☄️</span> Astronomical Calendar 2026
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-5xl md:text-7xl font-heading font-black tracking-tight leading-[1.07] mb-4"
                    >
                        <span className="text-white">Sky</span>{" "}
                        <span
                            style={{
                                background: "linear-gradient(135deg, #00d4ff 0%, #a78bfa 60%, #e63946 100%)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                                backgroundClip: "text",
                            }}
                        >
                            Calendar
                        </span>
                        <br />
                        <span className="text-white/30 text-3xl md:text-4xl font-bold tracking-normal">
                            खगोलीय कैलेंडर २०२६
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto mb-10"
                    >
                        Every major astronomical event of 2026 — from meteor showers and eclipses to planetary oppositions —
                        presented with <span className="text-cyan-400 font-semibold">IST timings</span> and
                        <span className="text-amber-400 font-semibold"> Indian naming conventions</span> (Purnima/Amavasya).
                        Optimized for <span className="text-white font-semibold">Kolhapur observers</span>.
                    </motion.p>
                </div>
            </section>

            {/* ── Stats row ────────────────────────────────────────────────────── */}
            <section className="px-6 pb-10">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                        {STATS.map((s, i) => (
                            <div
                                key={i}
                                className="flex flex-col items-center gap-1 py-5 px-3 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10 transition-all"
                            >
                                <span className="text-2xl">{s.emoji}</span>
                                <span className="text-2xl font-black text-white tracking-tight">{s.value}</span>
                                <span className="text-[11px] text-muted-foreground text-center leading-tight font-medium">{s.label}</span>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ── Highlight Events ─────────────────────────────────────────────── */}
            <section className="px-6 pb-14">
                <div className="container mx-auto max-w-5xl">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="h-px flex-1 bg-white/5" />
                        <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-muted-foreground">Don't Miss in 2026</span>
                        <div className="h-px flex-1 bg-white/5" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {HIGHLIGHT_EVENTS.map((ev, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 * i }}
                                className="relative rounded-2xl p-5 overflow-hidden group cursor-default"
                                style={{ background: ev.bg, border: `1px solid ${ev.border}` }}
                            >
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{ background: `radial-gradient(ellipse at 50% 100%, ${ev.color}18 0%, transparent 70%)` }} />
                                <div className="relative z-10">
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-2xl">{ev.emoji}</span>
                                        <span className="text-[11px] font-bold tracking-wider px-3 py-1 rounded-full"
                                            style={{ background: `${ev.color}22`, color: ev.color, border: `1px solid ${ev.color}44` }}>
                                            {ev.date}
                                        </span>
                                    </div>
                                    <div className="font-heading font-bold text-sm text-white leading-tight mb-0.5">{ev.name}</div>
                                    {ev.nameHindi && <div className="text-xs mb-2" style={{ color: ev.color }}>{ev.nameHindi}</div>}
                                    <div className="text-[11px] text-muted-foreground leading-relaxed">{ev.desc}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Calendar ─────────────────────────────────────────────────────── */}
            <section className="px-6 pb-20">
                <div className="container mx-auto max-w-4xl">
                    <AstroCalendar />
                </div>
            </section>

            {/* ── Info strip ─────────────────────────────────────────── */}
            <section className="px-6 pb-20">
                <div className="container mx-auto max-w-4xl">
                    <div
                        className="rounded-2xl p-8 border relative overflow-hidden"
                        style={{
                            background: "linear-gradient(135deg, rgba(0,212,255,0.05) 0%, rgba(167,139,250,0.04) 50%, transparent 100%)",
                            borderColor: "rgba(0,212,255,0.15)",
                        }}
                    >
                        <div className="absolute top-0 right-0 text-[8rem] opacity-[0.04] select-none pointer-events-none leading-none">🔭</div>
                        <div className="grid md:grid-cols-2 gap-8 relative z-10">
                            <div>
                                <h3 className="text-lg font-heading font-black text-white mb-3 flex items-center gap-2">
                                    <span>🌕</span> Indian Naming
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    While we follow astronomical standards, we include Indian names for clarity.
                                    <strong className="text-amber-400">Purnima</strong> refers to the Full Moon, while
                                    <strong className="text-amber-400">Amavasya</strong> is the New Moon.
                                    These phases are critical for both observation and deep-sky astrophotography.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-lg font-heading font-black text-white mb-3 flex items-center gap-2">
                                    <span>🔭</span> Viewing from Kolhapur
                                </h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    Kolhapur (16.7°N) is ideally situated for observing the Milky Way core and southern constellations like Scorpius.
                                    <br /><br />
                                    Best dark-sky sites: <strong className="text-cyan-400">Panhala outskirts</strong>,
                                    <strong className="text-cyan-400"> Dajipur forest</strong>, and
                                    <strong className="text-cyan-400"> Radhanagari backwaters</strong>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
