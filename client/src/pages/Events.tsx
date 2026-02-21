import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";

export interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  category: "upcoming" | "past";
  driveUrl?: string;
}

const events: Event[] = [
  {
    id: 1,
    title: "STARGAZING NIGHT",
    date: "February 28, 2026",
    time: "Evening onwards",
    location: "Jeevan Farm, Kolhapur",
    description: "🌠 EVENT HIGHLIGHTS 🔭 Expert-Guided Stargazing with Advanced Telescopes 🎶 Music under the Stars ⛺ Tent Camping & Scenic Morning  View 🔥 Bonfire & Fun Astronomy Activities",
    image: "/images/event-starparty.png",
    category: "upcoming"
  },


  // {
  //   id: 2,
  //   title: "Cosmos Lecture Series: Black Holes",
  //   date: "April 02, 2026",
  //   time: "10:00 - 12:00",
  //   location: "DYP University Auditorium",
  //   description: "Join us for an immersive lecture on the mysteries of Black Holes and Event Horizons by Dr. A. K. Ray, featuring latest data from the James Webb Space Telescope.",
  //   image: "/images/event-lecture.png",
  //   category: "upcoming"
  // },

  {
    id: 3,
    title: "Night Stargazing Camp",
    date: "November 8, 2025",
    time: "18:00 - 06:00",
    location: "Kolhapur",
    description: "An immersive night stargazing experience featuring telescope observations of the Moon, Saturn, Jupiter, and deep-sky objects. Included guided constellation tours and beginner-friendly astronomy sessions.",
    image: "/images/1.jpg",
    category: "past",
    driveUrl: "https://drive.google.com/drive/folders/1wu_j15rHaNRCCJDS9Xl8NdlNkRc6gjrk"
  },
  {
    id: 4,
    title: "Family Stargazing Night",
    date: "November 29, 2025",
    time: "18:00 - 06:00",
    location: "Kolhapur",
    description: "A community-focused astronomy event with telescope viewing, celestial storytelling, and interactive sky navigation sessions designed for families and kids.",
    image: "/images/2.jpg",
    category: "past",
    driveUrl: "https://drive.google.com/drive/folders/1AQ1ey9jbkT0M1--2Ar7ftPGdLS9ZuLS8kfq"
  },
  {
    id: 5,
    title: "Geminid Meteor Shower Watch",
    date: "December 13, 2025",
    time: "22:00 - 04:00",
    location: "Kolhapur",
    description: "Witnessed the spectacular Geminid meteor shower under clear winter skies. Participants observed multiple bright meteors per hour, learned about meteor origins, and enjoyed guided night sky navigation with telescope support.",
    image: "/images/3.jpg",
    category: "past",
    driveUrl: "https://drive.google.com/drive/folders/16tyGYFJifJ0lCPkRwYeTetlbtQaXkFCk"
  },
  {
    id: 6,
    title: "Year-End Stargazing Special",
    date: "December 27, 2025",
    time: "18:00 - 06:00",
    location: "Kolhapur",
    description: "A special year-end astronomy gathering featuring advanced telescope sessions, deep-sky object viewing, and guided discussions on celestial mechanics.",
    image: "/images/4.JPG",
    category: "past",
    driveUrl: "https://drive.google.com/drive/folders/1uKlkcs6Ccs1rz-G9NbaE5ELAPdBBkpad"
  },
  {
    id: 7,
    title: "New Year Sky Watch",
    date: "January 17, 2026",
    time: "18:00 - 06:00",
    location: "Kolhapur",
    description: "A premium stargazing session with detailed lunar observation, planetary viewing, and hands-on guidance on using telescopes for beginners.",
    image: "/images/5.jpg",
    category: "past",
    driveUrl: "https://drive.google.com/drive/folders/12E4L299x5iUWKn9Mfl-_rIkMSrGZ2JoO"
  },

];

export default function Events() {
  const upcomingEvents = events.filter(e => e.category === "upcoming");
  const pastEvents = events.filter(e => e.category === "past");

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      <ParticleBackground />
      <Navbar />

      <section className="pt-40 pb-16 text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl md:text-7xl font-display font-bold text-white mb-6"
        >
          Cosmic <span className="text-primary">Events</span>
        </motion.h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Join us for observation sessions, workshops, and lectures.
        </p>
      </section>

      {/* Upcoming Events */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px bg-white/20 flex-1" />
            <h2 className="text-2xl font-display font-bold text-white uppercase tracking-widest">Upcoming</h2>
            <div className="h-px bg-white/20 flex-1" />
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {upcomingEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="group bg-card border border-white/10 rounded-3xl overflow-hidden hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 flex flex-col"
              >
                <div className="h-64 overflow-hidden relative">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
                  <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                    <span className="text-primary font-bold">{event.date}</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-2xl font-display font-bold text-white mb-4 group-hover:text-primary transition-colors">{event.title}</h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <Clock size={16} className="text-accent" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <MapPin size={16} className="text-accent" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-8 leading-relaxed line-clamp-3">
                    {event.description}
                  </p>

                  <div className="mt-auto">
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLScrnh-MI4jiXaF33P7qhs8on6dUKiqvkxflC-_cjoomytX2ow/viewform?usp=send_form"
                      target="_blank"
                      className="w-full block text-center py-3 bg-white text-black font-bold rounded-xl hover:bg-primary hover:text-white transition-colors"
                    >
                      Register Now
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-20 bg-white/[0.02]">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-px bg-white/20 flex-1" />
            <h2 className="text-2xl font-display font-bold text-white uppercase tracking-widest">Past Gallery</h2>
            <div className="h-px bg-white/20 flex-1" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastEvents.map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="group relative aspect-video rounded-2xl overflow-hidden"
              >
                <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h4 className="text-white font-bold text-lg mb-1">{event.title}</h4>
                  <p className="text-sm text-gray-300 mb-4">{event.date}</p>

                  {event.driveUrl && (
                    <a
                      href={event.driveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary font-bold text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg backdrop-blur-md transition-colors w-fit"
                    >
                      View Full Album
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
            {/* Placeholders for gallery feel */}
            <div className="group relative aspect-video rounded-2xl overflow-hidden cursor-pointer bg-white/5 flex items-center justify-center">
              <span className="text-muted-foreground">More Archive...</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
