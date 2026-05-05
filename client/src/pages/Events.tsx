import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Calendar, MapPin, Clock, ExternalLink, FileText, ChevronRight, AlertCircle, Star } from "lucide-react";
import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface Event {
  id: number;
  title: string;
  date: string;
  startDateIso: string;
  endDateIso: string;
  time: string;
  location: string;
  description: string;
  image: string;
  category?: "upcoming" | "past";
  originalPrice?: string;
  offerPrice?: string;
  priceCurrency: string;
  driveUrl?: string;
  mapsUrl?: string;
  highlights?: string[];
  isLimited?: boolean;
  terms?: {
    section: string;
    items: string[];
  }[];
}

const events: Event[] = [
  {
    id: 12,
    title: "Celestial Night Expedition",
    date: "May 1, 2026",
    startDateIso: "2026-05-01T18:00:00",
    endDateIso: "2026-05-02T06:00:00",
    time: "6:00 PM onwards",
    location: "Shelakewadi, Kolhapur",
    description: "A magical night exploring the mysteries of the Vaishakha sky. We observed the Flower Moon rising and tracked satellite passes across the summer constellations. A night of peace and cosmic connection for all participants.",
    image: "/images/event-may1.png",
    priceCurrency: "INR",
    driveUrl: "https://drive.google.com/drive/folders/1I8E8sn8w4pA3l4bhKUaPFhplF_ySpajU"
  },
  {
    id: 13,
    title: "Lunar Observation Workshop",
    date: "May 2, 2026",
    startDateIso: "2026-05-02T18:00:00",
    endDateIso: "2026-05-03T06:00:00",
    time: "6:00 PM onwards",
    location: "Kolhapur Stargazing Hub",
    description: "Detailed observation session focusing on lunar topography and prep for the upcoming eclipse. Participants learned how to identify major craters and seas using high-power telescopes.",
    image: "/images/event-may2.png",
    priceCurrency: "INR",
    driveUrl: "https://drive.google.com/drive/folders/15Mi0sgZ44WJ1wK4qkNcM1e4FSJNuCV12"
  },
  {
    id: 11,
    title: "Stargazing Session",
    date: "April 11, 2026",
    startDateIso: "2026-04-11T18:00:00",
    endDateIso: "2026-04-12T06:00:00",
    time: "18:00 - 06:00",
    location: "Kolhapur",
    description: "A professional stargazing session highlighting the spring sky, deep-sky objects, and guided telescope observations.",
    image: "/images/event-starparty.png",
    priceCurrency: "INR",
    driveUrl: "https://drive.google.com/drive/folders/1H4EyYbnUEkipeqvFwvecWRWRKvCLucId"
  },
  {
    id: 3,
    title: "Night Stargazing Camp",
    date: "November 8, 2025",
    startDateIso: "2025-11-08T18:00:00",
    endDateIso: "2025-11-09T06:00:00",
    time: "18:00 - 06:00",
    location: "Kolhapur",
    description: "An immersive night stargazing experience featuring telescope observations of the Moon, Saturn, Jupiter, and deep-sky objects. Included guided constellation tours and beginner-friendly astronomy sessions.",
    image: "/images/1.jpg",
    priceCurrency: "INR",
    driveUrl: "https://drive.google.com/drive/folders/1wu_j15rHaNRCCJDS9Xl8NdlNkRc6gjrk"
  },
  {
    id: 4,
    title: "Family Stargazing Night",
    date: "November 29, 2025",
    startDateIso: "2025-11-29T18:00:00",
    endDateIso: "2025-11-30T06:00:00",
    time: "18:00 - 06:00",
    location: "Kolhapur",
    description: "A community-focused astronomy event with telescope viewing, celestial storytelling, and interactive sky navigation sessions designed for families and kids.",
    image: "/images/2.jpg",
    priceCurrency: "INR",
    driveUrl: "https://drive.google.com/drive/folders/1AQ1ey9jbkT0M1--2Ar7ftPGdLS9ZuLS8kfq"
  },
  {
    id: 5,
    title: "Geminid Meteor Shower Watch",
    date: "December 13, 2025",
    startDateIso: "2025-12-13T22:00:00",
    endDateIso: "2025-12-14T04:00:00",
    time: "22:00 - 04:00",
    location: "Kolhapur",
    description: "Witnessed the spectacular Geminid meteor shower under clear winter skies. Participants observed multiple bright meteors per hour, learned about meteor origins, and enjoyed guided night sky navigation with telescope support.",
    image: "/images/3.jpg",
    priceCurrency: "INR",
    driveUrl: "https://drive.google.com/drive/folders/16tyGYFJifJ0lCPkRwYeTetlbtQaXkFCk"
  },
  {
    id: 6,
    title: "Year-End Stargazing Special",
    date: "December 27, 2025",
    startDateIso: "2025-12-27T18:00:00",
    endDateIso: "2025-12-28T06:00:00",
    time: "18:00 - 06:00",
    location: "Kolhapur",
    description: "A special year-end astronomy gathering featuring advanced telescope sessions, deep-sky object viewing, and guided discussions on celestial mechanics.",
    image: "/images/4.JPG",
    priceCurrency: "INR",
    driveUrl: "https://drive.google.com/drive/folders/1uKlkcs6Ccs1rz-G9NbaE5ELAPdBBkpad"
  },
  {
    id: 7,
    title: "New Year Sky Watch",
    date: "January 17, 2026",
    startDateIso: "2026-01-17T18:00:00",
    endDateIso: "2026-01-18T06:00:00",
    time: "18:00 - 06:00",
    location: "Kolhapur",
    description: "A premium stargazing session with detailed lunar observation, planetary viewing, and hands-on guidance on using telescopes for beginners.",
    image: "/images/5.jpg",
    priceCurrency: "INR",
    driveUrl: "https://drive.google.com/drive/folders/12E4L299x5iUWKn9Mfl-_rIkMSrGZ2JoO"
  },
];

const CountdownTimer = ({ targetDate }: { targetDate: string }) => {
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft(null);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) return null;

  return (
    <div className="flex gap-4 mb-6 p-4 bg-primary/10 border border-primary/20 rounded-2xl">
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Mins", value: timeLeft.minutes },
      ].map((item, idx) => (
        <div key={idx} className="flex-1 text-center">
          <div className="text-2xl font-display font-black text-white">{item.value.toString().padStart(2, '0')}</div>
          <div className="text-[10px] uppercase tracking-widest text-primary font-bold">{item.label}</div>
        </div>
      ))}
    </div>
  );
};

export default function Events() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 200]);
  const springY = useSpring(y, { stiffness: 100, damping: 30 });
  const now = new Date();

  const upcomingEvents = events
    .filter(e => new Date(e.startDateIso) > now)
    .sort((a, b) => new Date(a.startDateIso).getTime() - new Date(b.startDateIso).getTime());

  const pastEvents = events
    .filter(e => new Date(e.startDateIso) <= now)
    .sort((a, b) => new Date(b.startDateIso).getTime() - new Date(a.startDateIso).getTime());

  const renderSchema = (event: Event) => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Event",
      "name": event.title,
      "description": event.description,
      "image": `https://www.kolhapurstargazing.in${event.image}`,
      "startDate": event.startDateIso,
      "endDate": event.endDateIso,
      "eventStatus": "https://schema.org/EventScheduled",
      "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
      "location": {
        "@type": "Place",
        "name": event.location,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kolhapur",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        }
      },
      "offers": {
        "@type": "Offer",
        "url": "https://docs.google.com/forms/d/e/1FAIpQLScrnh-MI4jiXaF33P7qhs8on6dUKiqvkxflC-_cjoomytX2ow/viewform",
        "price": event.offerPrice || "0",
        "priceCurrency": event.priceCurrency,
        "availability": "https://schema.org/InStock",
        "validFrom": "2026-02-01T00:00"
      },
      "organizer": {
        "@type": "Organization",
        "name": "Kolhapur Stargazing",
        "url": "https://www.kolhapurstargazing.in"
      },
      "performer": {
        "@type": "Organization",
        "name": "Kolhapur Stargazing"
      }
    };

    return (
      <script
        key={`schema-${event.id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {events.map(event => renderSchema(event))}
      <ParticleBackground />
      <Navbar />

      {/* Header Section */}
      <section className="pt-28 sm:pt-40 md:pt-48 pb-16 sm:pb-24 text-center px-4 sm:px-6 relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full h-full -z-10"
          style={{ y: springY }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] md:w-[800px] h-[200px] sm:h-[300px] md:h-[400px] bg-primary/10 blur-[120px] rounded-full animate-pulse" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">The Matrix Schedule</span>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-heading font-black text-white mb-6 sm:mb-8 tracking-tighter uppercase leading-[0.9]">
            Cosmic <span className="text-white/40">Events</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-medium tracking-wide">
            Professional observation sessions, educational workshops, and cosmic expeditions.
          </p>
        </motion.div>
      </section>


      {/* Upcoming Events */}
      <section className="py-12 md:py-20 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-4 mb-16">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-primary text-[10px] font-black uppercase tracking-[0.5em] whitespace-nowrap">Upcoming Launch</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {upcomingEvents.map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="group relative flex flex-col glass-premium rounded-[1.5rem] sm:rounded-[2.5rem] md:rounded-[3rem] overflow-hidden border border-white/5 transition-all duration-500 hover:shadow-[0_0_50px_-12px_rgba(168,85,247,0.3)] glass-shine"
              >
                <div className="h-56 sm:h-72 md:h-80 overflow-hidden relative">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

                  <div className="absolute top-6 left-6 flex flex-col gap-3">
                    <div className="bg-black/60 backdrop-blur-xl px-5 py-2.5 rounded-2xl border border-white/10 w-fit">
                      <span className="text-primary font-black text-xs uppercase tracking-widest">{event.date}</span>
                    </div>
                    {event.isLimited && (
                      <div className="flex flex-col gap-2">
                        <Badge variant="destructive" className="bg-red-500/10 text-red-500 border-red-500/20 px-3 py-1.5 font-black uppercase text-[10px] tracking-widest border-none animate-pulse">
                          Limited Capacity
                        </Badge>
                        {event.id === 10 && (
                          <Badge className="bg-primary text-black border-none font-black text-[10px] tracking-widest px-3 py-1.5 animate-bounce">
                            🏆 Biggest Offer of the Year
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 sm:p-8 md:p-10 flex flex-col flex-1 text-left">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-xl sm:text-2xl font-display font-black text-white group-hover:text-primary transition-colors tracking-tighter uppercase">{event.title}</h3>
                    {event.mapsUrl && (
                      <a
                        href={event.mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 flex items-center justify-center bg-white/5 hover:bg-primary/20 rounded-2xl border border-white/5 text-primary transition-all duration-300"
                        title="View on Google Maps"
                      >
                        <MapPin size={22} />
                      </a>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-6 mb-8 text-white/50">
                    <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest">
                      <Clock size={16} className="text-primary" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest">
                      <MapPin size={16} className="text-primary" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  </div>

                  <p className="text-white/60 mb-8 leading-relaxed font-medium text-[15px] line-clamp-3">
                    {event.description}
                  </p>

                  <div className="mb-10">
                    <CountdownTimer targetDate={event.startDateIso} />
                  </div>

                  {event.highlights && (idx === 0) && (
                    <div className="mb-10 p-6 bg-white/[0.03] rounded-3xl border border-white/5">
                      <h4 className="text-[10px] uppercase tracking-[0.3em] text-primary font-black mb-5 flex items-center gap-2">
                        <AlertCircle size={14} /> Mission Highlights
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {event.highlights.slice(0, 4).map((h, i) => (
                          <li key={i} className="text-[13px] text-white/70 font-medium flex items-center gap-3 list-none">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_8px_rgba(255,255,255,0.4)]" /> {h}
                          </li>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-auto space-y-6">
                    {event.offerPrice && (
                      <div className="flex items-center justify-between p-6 rounded-3xl bg-primary/5 border border-primary/20 shadow-inner">
                        <div>
                          <p className="text-[10px] text-primary font-black uppercase tracking-[0.3em] mb-2">Special Exclusive Price</p>
                          <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-display font-black text-white tracking-tighter">₹{event.offerPrice}</span>
                            {event.originalPrice && (
                              <span className="text-xl text-white/20 line-through font-bold">₹{event.originalPrice}</span>
                            )}
                          </div>
                        </div>
                        <div className="text-right hidden sm:block">
                          <p className="text-primary font-black text-sm uppercase tracking-widest animate-pulse">Available Now</p>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSfPwS3DS2WM9GzBDiY5-xvjq9RCfKpHE0DQ3bB4DrQP9vvdVg/viewform"
                        target="_blank"
                        className="btn-magnetic flex-1 py-5 bg-white text-black font-black rounded-2xl hover:bg-primary hover:text-white transition-all duration-500 shadow-xl flex items-center justify-center gap-3 text-sm uppercase tracking-widest group/btn text-center glass-shine"
                      >
                        <span className="relative z-10">Register Now</span>
                        <ChevronRight size={18} className="relative z-10 inline group-hover/btn:translate-x-1 transition-transform" />
                      </a>

                      {event.terms && (
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" className="flex-1 py-7 border-white/10 hover:bg-white/5 rounded-2xl gap-3 font-black text-xs uppercase tracking-widest transition-all">
                              <FileText size={18} /> Rules
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl max-h-[85vh] overflow-y-auto bg-background/95 backdrop-blur-3xl border-white/5 rounded-[2rem] scrollbar-hide py-10 px-8">
                            <DialogHeader>
                              <DialogTitle className="text-3xl font-display font-black text-white mb-8 tracking-tighter uppercase">Terms & Conditions</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-8">
                              {event.terms.map((section, idx) => (
                                <div key={idx} className="space-y-4">
                                  <h4 className="text-primary font-black uppercase tracking-[0.2em] text-xs pb-2 border-b border-white/5">{section.section}</h4>
                                  <ul className="space-y-4">
                                    {section.items.map((item, i) => (
                                      <li key={i} className="text-[14px] text-white/70 font-medium leading-relaxed flex gap-4">
                                        <div className="mt-2 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 animate-pulse shadow-sm shadow-primary" />
                                        {item}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                            <div className="mt-12 p-6 bg-primary/5 rounded-2xl border border-primary/10">
                              <p className="text-[11px] text-white/40 italic font-medium leading-relaxed">
                                * Photography & Media: Professional content captured may be used for club archives. For opting out, please notify the field leads during reporting.
                              </p>
                            </div>
                          </DialogContent>
                        </Dialog>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* School & College Track Section */}
      <section className="py-16 md:py-32 relative overflow-hidden bg-primary/[0.02]">
        <div className="container mx-auto px-4 sm:px-6 text-left">
          <div className="flex items-center gap-4 sm:gap-8 mb-10 md:mb-16">
            <div className="h-px bg-white/10 flex-1" />
            <span className="text-primary text-[10px] font-black uppercase tracking-[0.5em] whitespace-nowrap">Institutional Programs</span>
            <div className="h-px bg-white/10 flex-1" />
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="space-y-12"
            >
              <div>
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-display font-black text-white mb-5 sm:mb-8 tracking-tighter uppercase leading-tight">
                  Educational, Fun, & <br /><span className="text-primary italic">Interactive</span> Experiences
                </h3>
                <p className="text-lg text-white/60 leading-relaxed font-medium">
                  The Matrix Club organizes professional-grade astronomy events specifically tailored for schools and colleges. We bring the wonders of the universe to your campus.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: <MapPin className="text-primary" size={24} />, title: "Tailored Sessions", desc: "Customized according to curriculum and age group." },
                  { icon: <Clock className="text-primary" size={24} />, title: "Expert Guides", desc: "Hands-on learning with professional guides." },
                  { icon: <FileText className="text-primary" size={24} />, title: "Practical Workshops", desc: "Telescope handling and night sky navigation." },
                  { icon: <FileText className="text-primary" size={24} />, title: "Certificates", desc: "Participation details and certificates for students." }
                ].map((item, idx) => (
                  <div key={idx} className="glass-card p-6 border-white/5 hover:border-primary/20">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">{item.icon}</div>
                    <h4 className="text-white font-black uppercase text-xs tracking-widest mb-2">{item.title}</h4>
                    <p className="text-sm text-white/50 font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="https://drive.google.com/drive/folders/1wu_j15rHaNRCCJDS9Xl8NdlNkRc6gjrk"
                  target="_blank"
                  className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-white text-black font-black rounded-full hover:bg-primary hover:text-white transition-all text-xs uppercase tracking-widest text-center"
                >
                  Download Brochure
                </a>
                <Link href="/contact">
                  <div className="w-full sm:w-auto px-6 sm:px-10 py-3 sm:py-4 bg-transparent border border-white/10 text-white font-black rounded-full hover:border-primary hover:text-primary transition-all text-xs uppercase tracking-widest cursor-pointer text-center">
                    Book Event Now
                  </div>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square lg:aspect-[4/5] rounded-[3rem] overflow-hidden border border-white/5 group shadow-2xl"
            >
              <img
                src="/images/about-telescope.png"
                alt="Students using telescope"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-10 left-10 right-10">
                <p className="text-white text-xl font-bold italic leading-relaxed">"Inspiring the next generation of astronomers through hands-on cosmic exploration."</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Past Events Section */}
      <section className="py-16 md:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-20 text-left">
            <span className="text-primary text-[10px] font-black uppercase tracking-[0.5em] mb-4 block">Archive</span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-white tracking-tighter uppercase">Past <span className="text-white/40">Gallery</span></h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl glass-card border-none"
              >
                <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 opacity-70 group-hover:opacity-100" loading="lazy" />

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-8 flex flex-col justify-end text-left">
                  <div className="mb-4">
                    <Badge className="bg-green-500/10 text-green-500 border-green-500/20 px-3 py-1 font-black text-[10px] uppercase tracking-widest border-none">
                      Mission Success
                    </Badge>
                  </div>
                  <h4 className="text-2xl font-display font-black text-white mb-2 tracking-tighter uppercase group-hover:text-primary transition-colors">{event.title}</h4>
                  <p className="text-xs text-white/50 font-black uppercase tracking-widest mb-6">{event.date}</p>

                  {event.driveUrl && (
                    <a
                      href={event.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-3 text-black font-black text-[10px] uppercase tracking-widest bg-white hover:bg-primary transition-all px-6 py-3 rounded-xl w-fit"
                    >
                      Access Archives <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
