import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
    {
        name: "Bijal Anant",
        role: "Participant ",
        content: "A mesmerizing experience 🪐🌑..team The Matrix Club hats off for everything⛺🏕️ patience politeness food arrangements 👍🏻👍🏻👍🏻and yes the medical help given to friend in early morning thank u 😀 😊 looking forward for more events",
        rating: 5,
    },
    {
        name: "योगेश शिंदे",
        role: "Participant ",
        content: "Event खुप मस्त मॅनॅजमेण्ट केला होता. माहितीही खुप छान मिळाली. कॉन्सेप्ट छान आहे. तुमचा ग्रुप पण चांगला काम करतो. असच कायतरी innovative करत रहा. म्हणजे आम्हालाही अजून एन्जॉय करता येईल. मच्या Team Matrix ला खूप शुभेच्छा.",
        rating: 5,
    },
    {
        name: "Kusum Singh",
        role: "Participant ",
        content: "Thank you Team Matrix for organising such event… exploring nebula, star clusters, Jupiter with its finest details alongside its moons n finally the moon showing the intricate details of its craters specially along its peripheral…. Amazed! …Really enjoyed the after session banter in the chilled weather 🤩 … Later session was really memorable, Thanks!",
        rating: 5,
    },
];

export function ReviewSection() {
    return (
        <section className="py-24 relative overflow-hidden bg-white/[0.01]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-primary text-sm font-bold uppercase tracking-[0.2em] mb-4 block">
                            Testimonials
                        </span>
                        <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">
                            What Our Stargazers Say
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className="group relative p-8 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-primary/50 transition-all duration-300"
                        >
                            <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary blur-sm group-hover:blur-0 transition-all">
                                <Quote size={20} />
                            </div>

                            <div className="flex gap-1 mb-6 text-yellow-500">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={16} fill="currentColor" />
                                ))}
                            </div>

                            <p className="text-muted-foreground mb-8 italic leading-relaxed">
                                "{review.content}"
                            </p>

                            <div>
                                <h4 className="text-white font-bold text-lg">{review.name}</h4>
                                <p className="text-primary text-sm font-medium">{review.role}</p>
                            </div>

                            {/* Decorative background glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
