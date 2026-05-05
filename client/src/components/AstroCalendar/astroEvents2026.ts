export type EventType =
    | "meteor_shower"
    | "eclipse"
    | "full_moon"
    | "new_moon"
    | "conjunction"
    | "solstice"
    | "equinox"
    | "planet";

export interface AstroEvent {
    id: string;
    type: EventType;
    name: string;
    time: string;          // IST
    visibility: string;
    description: string;
}

export type EventMap = Record<string, AstroEvent[]>;

const events: EventMap = {

    // ╔══════════════════════════════════════════════════════════════════════╗
    // ║  JANUARY 2026                                                       ║
    // ╚══════════════════════════════════════════════════════════════════════╝
    "2026-01-03": [
        {
            id: "full-moon-jan",
            type: "full_moon",
            name: "Paush Purnima (Wolf Moon) — Supermoon",
            time: "15:34 IST",
            visibility: "Fully visible all night from India. Rises at 100% illumination at sunset.",
            description:
                "Paush Purnima. This is the first of three supermoons for 2026. The Moon will be near its closest approach to the Earth and may look slightly larger and brighter than usual. Historically known as the Wolf Moon because this was the time of year when hungry wolf packs howled outside camps.",
        },
        {
            id: "quadrantid-2026",
            type: "meteor_shower",
            name: "Quadrantids Meteor Shower Peak",
            time: "Peak Night/Morning of Jan 3-4",
            visibility: "ZHR ~40. The full moon will obscure faint meteors this year. Use dark-sky sites.",
            description:
                "The Quadrantids is an above average shower. It is thought to be produced by dust grains left behind by an extinct comet known as 2003 EH1. Meteors radiate from the constellation Bootes. High probability of bright fireballs despite the moon.",
        },
    ],
    "2026-01-10": [
        {
            id: "jupiter-opp-jan",
            type: "planet",
            name: "Jupiter at Opposition",
            time: "Visible All Night",
            visibility: "⭐⭐⭐ Brightest planet in the sky. Excellent from Kolhapur (overhead at midnight).",
            description:
                "The giant planet will be at its closest approach to Earth and its face will be fully illuminated by the Sun. It will be brighter than any other time of the year. A good pair of binoculars should allow you to see the four Galilean moons (Io, Europa, Ganymede, and Callisto).",
        },
    ],
    "2026-01-19": [
        {
            id: "new-moon-jan",
            type: "new_moon",
            name: "Magha Amavasya (New Moon)",
            time: "01:23 IST",
            visibility: "Moon invisible. Prime window for deep-sky imaging in Orion & Taurus.",
            description:
                "New moon marks the best time of the month to observe faint objects such as galaxies and star clusters because there is no moonlight to interfere. Perfect for seeing the Great Orion Nebula (M42).",
        },
    ],

    // ╔══════════════════════════════════════════════════════════════════════╗
    // ║  FEBRUARY 2026                                                      ║
    // ╚══════════════════════════════════════════════════════════════════════╝
    "2026-02-02": [
        {
            id: "full-moon-feb",
            type: "full_moon",
            name: "Magha Purnima (Snow Moon)",
            time: "01:41 IST",
            visibility: "Visible all night from India. High altitude in the winter sky.",
            description:
                "Magha Purnima. Historically known by early Native American tribes as the Snow Moon because the heaviest snows usually fell during this time of the year. Also known as the Hunger Moon.",
        },
    ],
    "2026-02-17": [
        {
            id: "new-moon-feb",
            type: "new_moon",
            name: "Phalguna Amavasya (New Moon)",
            time: "17:35 IST",
            visibility: "Invisible moon. Galactic season opening in Leo.",
            description:
                "Phalguna Amavasya. Best time for galaxy hunting in Leo and Virgo Clusters. No moonlight to wash out faint structures.",
        },
        {
            id: "annular-solar-eclipse-feb",
            type: "eclipse",
            name: "Annular Solar Eclipse",
            time: "17:30 IST (Max)",
            visibility: "NOT visible from India. Path over Antarctica and Southern Indian Ocean.",
            description:
                "An annular solar eclipse occurs when the Moon is too far away from the Earth to completely cover the Sun, resulting in a 'ring of fire'. Only observable from sub-Antarctic waters.",
        },
    ],
    "2026-02-19": [
        {
            id: "mercury-gee-feb",
            type: "planet",
            name: "Mercury at Greatest Eastern Elongation",
            time: "Evening Sky (Post-Sunset)",
            visibility: "Visible low in the western sky just after sunset.",
            description:
                "The planet Mercury reaches its highest point above the horizon in the evening sky. This is the best time to view Mercury, as its orbit is normally very close to the Sun.",
        },
    ],

    // ╔══════════════════════════════════════════════════════════════════════╗
    // ║  MARCH 2026                                                         ║
    // ╚══════════════════════════════════════════════════════════════════════╝
    "2026-03-03": [
        {
            id: "full-moon-mar",
            type: "full_moon",
            name: "Phalguna Purnima (Worm Moon)",
            time: "17:09 IST",
            visibility: "Visible all night. Blood red color NOT visible from India.",
            description:
                "Phalguna Purnima. Known as the Worm Moon because the ground begins to soften. Note: A total lunar eclipse occurs tonight but is visible in E. Asia, Australia, and Americas only.",
        },
    ],
    "2026-03-19": [
        {
            id: "new-moon-mar",
            type: "new_moon",
            name: "Chaitra Amavasya (New Moon)",
            time: "06:56 IST",
            visibility: "Invisible moon. Best time for Messier Marathon planning.",
            description:
                "The dark skies of the Chaitra new moon provide the best opportunity of the year to attempt the Messier Marathon — seeing all 110 Messier objects in a single night.",
        },
    ],
    "2026-03-20": [
        {
            id: "march-equinox",
            type: "equinox",
            name: "Vernal Equinox (March Equinox)",
            time: "20:15 IST",
            visibility: "Day and night of equal length across India.",
            description:
                "The Sun reaches its position over the equator. First day of spring (Vernal Equinox) in the Northern Hemisphere and first day of fall in the Southern Hemisphere.",
        },
    ],

    // ╔══════════════════════════════════════════════════════════════════════╗
    // ║  APRIL 2026                                                         ║
    // ╚══════════════════════════════════════════════════════════════════════╝
    "2026-04-02": [
        {
            id: "full-moon-apr",
            type: "full_moon",
            name: "Chaitra Purnima (Pink Moon)",
            time: "07:43 IST",
            visibility: "Rises near sunset on April 1. Fully visible throughout the night.",
            description:
                "Chaitra Purnima. Known as the Pink Moon because it marked the appearance of the moss pink phlox. Also known as the Sprouting Grass Moon or Egg Moon.",
        },
    ],
    "2026-04-03": [
        {
            id: "mercury-gwe-apr",
            type: "planet",
            name: "Mercury at Greatest Western Elongation",
            time: "Pre-Dawn Sky",
            visibility: "Look low in the eastern sky just before sunrise.",
            description:
                "Mercury reaches its highest point above the horizon in the morning sky. A rare opportunity to see the elusive inner planet before the Sun's glare takes over.",
        },
    ],
    "2026-04-17": [
        {
            id: "new-moon-apr",
            type: "new_moon",
            name: "Vaishakha Amavasya (New Moon)",
            time: "17:24 IST",
            visibility: "Darkest nights for spring galaxies (Leo/Virgo Cluster).",
            description:
                "Vaishakha Amavasya. No moonlight interference for the peak of galaxy season.",
        },
    ],
    "2026-04-22": [
        {
            id: "lyrid-peak",
            type: "meteor_shower",
            name: "Lyrids Meteor Shower Peak",
            time: "Peak Night/Morning of Apr 22-23",
            visibility: "ZHR ~20. First quarter moon sets shortly after midnight. Clear skies from 01:00 onwards.",
            description:
                "Produced by dust particles from comet Thatcher. Lyrids are known for producing bright dust trails. Radiant in Lyra rising high after midnight.",
        },
    ],

    // ╔══════════════════════════════════════════════════════════════════════╗
    // ║  MAY 2026                                                           ║
    // ╚══════════════════════════════════════════════════════════════════════╝
    "2026-05-01": [
        {
            id: "full-moon-may-1",
            type: "full_moon",
            name: "Vaishakha Purnima (Flower Moon)",
            time: "22:54 IST",
            visibility: "Fully visible all night from India. Rises at sunset.",
            description:
                "Vaishakha Purnima. Named the Flower Moon because spring flowers appeared in abundance. Also known as the Corn Planting Moon.",
        },
    ],
    "2026-05-06": [
        {
            id: "eta-aquariid-peak",
            type: "meteor_shower",
            name: "Eta Aquarids Meteor Shower Peak",
            time: "Peak Night/Morning of May 6-7",
            visibility: "ZHR ~60 (South) / ~30 (North). Waning gibbous moon will block faint meteors.",
            description:
                "Produced by debris from Halley's Comet. In the Southern Hemisphere (and southern India like Kolhapur), the rate is excellent. Best viewing after midnight from dark locations.",
        },
    ],
    "2026-05-17": [
        {
            id: "new-moon-may",
            type: "new_moon",
            name: "Jyeshtha Amavasya (New Moon)",
            time: "01:33 IST",
            visibility: "Milky Way core rising in the SE. Perfect dark window from 02:00 IST.",
            description:
                "Jyeshtha Amavasya. The galactic center in Sagittarius begins to rise to its best position. Maximum darkness for astrophotography.",
        },
    ],
    "2026-05-31": [
        {
            id: "full-moon-may-blue",
            type: "full_moon",
            name: "Blue Moon (Second Full Moon)",
            time: "14:16 IST",
            visibility: "Visible all night from India.",
            description:
                "Rare Blue Moon. Since this is the second full moon in the same calendar month, it is called a Blue Moon. Occurs once every few years.",
        },
    ],

    // ╔══════════════════════════════════════════════════════════════════════╗
    // ║  JUNE 2026                                                          ║
    // ╚══════════════════════════════════════════════════════════════════════╝
    "2026-06-15": [
        {
            id: "new-moon-jun",
            type: "new_moon",
            name: "Ashadha Amavasya (New Moon)",
            time: "08:26 IST",
            visibility: "Milky Way at its highest. Darkest June nights around this date.",
            description:
                "Ashadha Amavasya. Best time for wide-field Milky Way shots as the core is overhead at midnight.",
        },
        {
            id: "mercury-gee-jun",
            type: "planet",
            name: "Mercury at Greatest Eastern Elongation",
            time: "Evening Sky",
            visibility: "Visible low in the western sky just after sunset.",
            description:
                "The inner planet reaches 24.5 degrees from the Sun. Best time for evening viewing of Mercury.",
        },
    ],
    "2026-06-21": [
        {
            id: "june-solstice",
            type: "solstice",
            name: "Summer Solstice",
            time: "13:55 IST",
            visibility: "Longest day of the year in India. Sun directly over Tropic of Cancer.",
            description:
                "The North Pole is tilted toward the Sun. First day of summer in Northern Hemisphere. In Kolhapur, the sun will reach near-overhead position (~89° altitude) at solar noon.",
        },
    ],
    "2026-06-30": [
        {
            id: "full-moon-jun",
            type: "full_moon",
            name: "Ashadha Purnima (Strawberry Moon)",
            time: "05:28 IST",
            visibility: "Rises night of June 29. Fully visible night long.",
            description:
                "Ashadha Purnima. Signaled the time to gather ripening fruit (Strawberry Moon). Also known as the Honey Moon or Rose Moon.",
        },
    ],

    // ╔══════════════════════════════════════════════════════════════════════╗
    // ║  JULY 2026                                                          ║
    // ╚══════════════════════════════════════════════════════════════════════╝
    "2026-07-14": [
        {
            id: "new-moon-jul",
            type: "new_moon",
            name: "Shravana Amavasya (New Moon)",
            time: "15:15 IST",
            visibility: "Peak of Milky Way core season. Dark sky essential.",
            description:
                "Shravana Amavasya. The Galactic Core in Sagittarius reaches transit altitude. Best dark window for Dajipur/Radhanagari observers.",
        },
    ],
    "2026-07-29": [
        {
            id: "full-moon-jul",
            type: "full_moon",
            name: "Shravana Purnima (Buck Moon)",
            time: "20:07 IST",
            visibility: "Rises beautifully near sunset. Visible all night.",
            description:
                "Shravana Purnima. Known as the Buck Moon because antlers begin to grow on bucks. Also known as the Thunder Moon.",
        },
        {
            id: "delta-aquarid-peak",
            type: "meteor_shower",
            name: "Delta Aquarids Meteor Shower Peak",
            time: "Peak Night/Morning Jul 28-29",
            visibility: "ZHR ~20. The full moon will obscure most meteors this year. Look for bright streaks.",
            description:
                "Produced by debris left behind by comets Marsden and Kracht. Radiant in Aquarius.",
        },
    ],

    // ╔══════════════════════════════════════════════════════════════════════╗
    // ║  AUGUST 2026                                                        ║
    // ╚══════════════════════════════════════════════════════════════════════╝
    "2026-08-02": [
        {
            id: "mercury-gwe-aug",
            type: "planet",
            name: "Mercury at Greatest Western Elongation",
            time: "Pre-Dawn Sky",
            visibility: "Visible low in the eastern sky just before sunrise.",
            description:
                "Mercury reaches 19.5 degrees from the Sun. Peak morning visibility.",
        },
    ],
    "2026-08-12": [
        {
            id: "new-moon-aug",
            type: "new_moon",
            name: "Bhadrapada Amavasya (New Moon)",
            time: "23:07 IST",
            visibility: "PERFECT conditions for Perseids (100% dark midnight to dawn).",
            description:
                "Bhadrapada Amavasya. Zero moonlight interference for the year's best meteor shower peak.",
        },
        {
            id: "total-solar-eclipse-aug",
            type: "eclipse",
            name: "Total Solar Eclipse",
            time: "18:14 UTC -> Night in India",
            visibility: "NOT visible from India. Path over Russia, Greenland, Iceland, Spain.",
            description:
                "A total solar eclipse where the moon completely blocks the Sun. Path of totality crosses through Spain and Arctic regions.",
        },
        {
            id: "perseid-peak",
            type: "meteor_shower",
            name: "Perseids Meteor Shower Peak",
            time: "Peak Night/Morning Aug 12-13",
            visibility: "⭐ ZHR ~60-100. EXCELLENT year. No moonlight interference. Best from Kolhapur (2 AM onwards).",
            description:
                "The best meteor shower of the year! Produced by comet Swift-Tuttle. Famous for producing large numbers of bright fireballs. Peak rates can reach over 100/hour from truly dark sites.",
        },
    ],
    "2026-08-15": [
        {
            id: "venus-gee-aug",
            type: "planet",
            name: "Venus at Greatest Eastern Elongation",
            time: "Evening Sky",
            visibility: "Brilliant object in the western sky after sunset.",
            description:
                "Venus reaches 45.9 degrees from the Sun. This is its highest point in the evening sky for the year.",
        },
    ],
    "2026-08-28": [
        {
            id: "full-moon-aug",
            type: "full_moon",
            name: "Bhadrapada Purnima (Sturgeon Moon)",
            time: "09:49 IST",
            visibility: "Visible night of Aug 27/28. Partial lunar eclipse NOT visible from India.",
            description:
                "Bhadrapada Purnima. Sturgeon fish were easily caught at this time. Note: A partial lunar eclipse occurs but is visible in Americas and Europe/Africa only.",
        },
    ],

    // ╔══════════════════════════════════════════════════════════════════════╗
    // ║  SEPTEMBER 2026                                                     ║
    // ╚══════════════════════════════════════════════════════════════════════╝
    "2026-09-11": [
        {
            id: "new-moon-sep",
            type: "new_moon",
            name: "Ashwina Amavasya (New Moon)",
            time: "08:57 IST",
            visibility: "Andromeda Galaxy (M31) rising high. Best darkness for deep-sky.",
            description:
                "Ashwina Amavasya. Excellent conditions to observe the most distant object visible to the naked eye, the Andromeda Galaxy.",
        },
    ],
    "2026-09-23": [
        {
            id: "sep-equinox",
            type: "equinox",
            name: "Autumnal Equinox (September Equinox)",
            time: "05:36 IST",
            visibility: "Day and night of equal length across India.",
            description:
                "The Sun crosses the equator migrating south. First day of fall in Northern Hemisphere and first day of spring in Southern Hemisphere.",
        },
    ],
    "2026-09-25": [
        {
            id: "neptune-opp-sep",
            type: "planet",
            name: "Neptune at Opposition",
            time: "Visible All Night",
            visibility: "Visible in telescopes only. Blue dot in Aquarius.",
            description:
                "The blue giant planet will be at its closest approach to Earth. Due to extreme distance, it only appears as a tiny blue dot even in powerful telescopes.",
        },
    ],
    "2026-09-26": [
        {
            id: "full-moon-sep",
            type: "full_moon",
            name: "Ashwina Purnima (Harvest Moon)",
            time: "22:20 IST",
            visibility: "Visible all night from India. Rises at sunset.",
            description:
                "Ashwina Purnima. This is the Full Moon that occurs closest to the September equinox. Corn harvesting season moon.",
        },
    ],

    // ╔══════════════════════════════════════════════════════════════════════╗
    // ║  OCTOBER 2026                                                       ║
    // ╚══════════════════════════════════════════════════════════════════════╝
    "2026-10-04": [
        {
            id: "saturn-opp-oct",
            type: "planet",
            name: "Saturn at Opposition",
            time: "Visible All Night",
            visibility: "⭐⭐⭐ Excellent viewing from 20:00 IST in Gemini. Rings at 26° tilt.",
            description:
                "The ringed planet is closest to Earth and fully illuminated. Best time to view Saturn's rings and largest moons like Titan in any small telescope.",
        },
    ],
    "2026-10-07": [
        {
            id: "draconid-peak",
            type: "meteor_shower",
            name: "Draconids Meteor Shower Peak",
            time: "Early Evening (Peak night Oct 7)",
            visibility: "ZHR ~10. Best viewed in the early evening before moonrise.",
            description:
                "An unusual shower that peaks in the early evening. Produced by dust from comet 21P Giacobini-Zinner.",
        },
    ],
    "2026-10-10": [
        {
            id: "new-moon-oct",
            type: "new_moon",
            name: "Kartika Amavasya (New Moon)",
            time: "21:20 IST",
            visibility: "Galaxies M31 and M33 at prime positions. Perfect darkness.",
            description:
                "Kartika Amavasya. Ideally dark skies for hunting Triangulum Galaxy and open clusters in Perseus.",
        },
    ],
    "2026-10-12": [
        {
            id: "mercury-gee-oct",
            type: "planet",
            name: "Mercury at Greatest Eastern Elongation",
            time: "Evening Sky",
            visibility: "Low in the western sky just after sunset.",
            description:
                "Mercury reaches 19.6 degrees from the Sun. Good evening viewing visibility.",
        },
    ],
    "2026-10-21": [
        {
            id: "orionid-peak",
            type: "meteor_shower",
            name: "Orionids Meteor Shower Peak",
            time: "Peak Night/Morning Oct 21-22",
            visibility: "ZHR ~20. Waxing gibbous moon sets after midnight. Best viewing 1 AM to dawn.",
            description:
                "Produced by debris from Halley's Comet. Known for bright, fast meteors shooting from the direction of Orion.",
        },
    ],
    "2026-10-26": [
        {
            id: "full-moon-oct",
            type: "full_moon",
            name: "Kartika Purnima (Hunters Moon)",
            time: "09:43 IST",
            visibility: "Visible all night of Oct 25/26. Very high in the sky.",
            description:
                "Kartika Purnima. Known as the Hunter's Moon when leaves fall and game is ready to hunt. Also known as the Travel Moon.",
        },
    ],

    // ╔══════════════════════════════════════════════════════════════════════╗
    // ║  NOVEMBER 2026                                                      ║
    // ╚══════════════════════════════════════════════════════════════════════╝
    "2026-11-04": [
        {
            id: "taurid-peak",
            type: "meteor_shower",
            name: "Taurids Meteor Shower Peak",
            time: "Peak Night Nov 4-5",
            visibility: "ZHR ~5-10. Long-running shower with slow, bright meteors.",
            description:
                "Unique two-stream shower from Asteroid 2004 TG10 and Comet 2P Encke. Best just after midnight.",
        },
    ],
    "2026-11-09": [
        {
            id: "new-moon-nov",
            type: "new_moon",
            name: "Margashirsha Amavasya (New Moon)",
            time: "12:33 IST",
            visibility: "Winter Milky Way and Orion rising. Start of premium astro season.",
            description:
                "Margashirsha Amavasya. Cold, crisp air provides the best transparency for deep-sky observation.",
        },
    ],
    "2026-11-17": [
        {
            id: "leonid-peak",
            type: "meteor_shower",
            name: "Leonids Meteor Shower Peak",
            time: "Peak Night/Morning Nov 17-18",
            visibility: "ZHR ~15. Crescent moon sets at midnight. Excellent morning show.",
            description:
                "Famous for historic meteor storms. Produced by comet Tempel-Tuttle. Leonids are exceptionally fast (71 km/s).",
        },
    ],
    "2026-11-20": [
        {
            id: "mercury-gwe-nov",
            type: "planet",
            name: "Mercury at Greatest Western Elongation",
            time: "Pre-Dawn Sky",
            visibility: "Look low in the eastern sky just before sunrise.",
            description:
                "Mercury reaches 19.6 degrees from the Sun. High altitude in the morning sky.",
        },
    ],
    "2026-11-24": [
        {
            id: "full-moon-nov",
            type: "full_moon",
            name: "Margashirsha Purnima (Beaver Moon) — Supermoon",
            time: "20:25 IST",
            visibility: "Fully visible all night from India. Rises at 100% illumination.",
            description:
                "Margashirsha Purnima. Second of three supermoons for 2026. Known as the Beaver Moon because it was time to set traps before rivers froze.",
        },
    ],
    "2026-11-25": [
        {
            id: "uranus-opp-nov",
            type: "planet",
            name: "Uranus at Opposition",
            time: "Visible All Night",
            visibility: "Requires large telescope. Tiny blue-green dot in Taurus.",
            description:
                "The seventh planet reachers closest approach. It shines at magnitude 5.7 and is technically naked-eye visible from truly dark sites, but best in telescopes.",
        },
    ],

    // ╔══════════════════════════════════════════════════════════════════════╗
    // ║  DECEMBER 2026                                                      ║
    // ╚══════════════════════════════════════════════════════════════════════╝
    "2026-12-09": [
        {
            id: "new-moon-dec",
            type: "new_moon",
            name: "Pausha Amavasya (New Moon)",
            time: "06:22 IST",
            visibility: "Orion Nebula and Pleiades at maximum altitude. Premium darkness.",
            description:
                "Pausha Amavasya. Darkest nights of the year. Ideal for photography of M42 (Orion Nebula) and M45 (Pleiades).",
        },
    ],
    "2026-12-13": [
        {
            id: "geminid-peak",
            type: "meteor_shower",
            name: "Geminids Meteor Shower Peak",
            time: "Peak Night/Morning Dec 13-14",
            visibility: "⭐⭐⭐ ZHR ~120. THE KING of showers. Best year — thin crescent sets early.",
            description:
                "Produced by debris from asteroid 3200 Phaethon. Geminids are multicolored and bright. Best viewing after midnight; peak rates can exceed 1 meteor per minute.",
        },
    ],
    "2026-12-22": [
        {
            id: "dec-solstice",
            type: "solstice",
            name: "Winter Solstice",
            time: "02:19 IST",
            visibility: "Shortest day of the year in India. Uttarayan begins.",
            description:
                "South Pole tilted toward the Sun. Longest night for Northern Hemisphere observers. Ideal for extended observation sessions.",
        },
        {
            id: "ursid-peak",
            type: "meteor_shower",
            name: "Ursids Meteor Shower Peak",
            time: "Peak Night Dec 21-22",
            visibility: "ZHR ~10. Radiant near North Star. Moonlight may interfere.",
            description:
                "A minor shower produced by dust from comet Tuttle. Meteors radiate from Ursa Minor.",
        },
    ],
    "2026-12-23": [
        {
            id: "full-moon-dec",
            type: "full_moon",
            name: "Pausha Purnima (Cold Moon) — Supermoon",
            time: "07:00 IST",
            visibility: "Visible Night of Dec 22/23. Final Supermoon of 2026.",
            description:
                "Pausha Purnima. The final of three supermoons in 2026. Known as the Cold Moon or Long Nights Moon. Beautiful sight in the winter constellation Gemini.",
        },
    ],

};

export const EVENT_COLORS: Record<EventType, string> = {
    meteor_shower: "#ff6b35",
    eclipse: "#e63946",
    full_moon: "#c8d6e5",
    new_moon: "#6a6f7e",
    conjunction: "#00d4ff",
    solstice: "#f5c842",
    equinox: "#f5c842",
    planet: "#a78bfa",
};

export const EVENT_LABELS: Record<EventType, string> = {
    meteor_shower: "Meteor Shower",
    eclipse: "Eclipse",
    full_moon: "Purnima / Full Moon",
    new_moon: "Amavasya / New Moon",
    conjunction: "Conjunction",
    solstice: "Solstice",
    equinox: "Equinox",
    planet: "Planet Event",
};

export const EVENT_EMOJI: Record<EventType, string> = {
    meteor_shower: "☄️",
    eclipse: "🌑",
    full_moon: "🌕",
    new_moon: "🌑",
    conjunction: "✨",
    solstice: "☀️",
    equinox: "⚖️",
    planet: "🪐",
};

export default events;
