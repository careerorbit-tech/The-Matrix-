import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 relative overflow-hidden pt-20 pb-10">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/">
              <div className="flex items-center gap-2 group cursor-pointer">
                <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden shadow-lg shadow-primary/10 group-hover:shadow-primary/30 transition-all duration-300">
                  <img
                    src="/favicon.png"
                    alt="Matrix Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-display font-bold text-xl tracking-wider text-white group-hover:text-primary transition-colors">
                  THE MATRIX
                </span>
              </div>
            </Link>

            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Exploring the infinite cosmos from Kolhapur to the edge of the universe. Join us in our journey of discovery.
            </p>
            <div className="flex gap-4">
              {[Instagram, Twitter, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  href="https://www.instagram.com/kolhapur_stargazing?igsh=ZXp6NXV5bnFkeW5z"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-white mb-6 uppercase tracking-wider text-sm">Explore</h4>
            <ul className="space-y-4">
              {["Home", "About", "Events", "Contact"].map((item) => (
                <li key={item}>
                  <Link href={item === "Home" ? "/" : `/${item.toLowerCase()}`}>
                    <a className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      {item}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-white mb-6 uppercase tracking-wider text-sm">Legal</h4>
            <ul className="space-y-4">
              {[
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Terms of Service", path: "/terms" },
                { name: "Code of Conduct", path: "/conduct" }
              ].map((item) => (
                <li key={item.name}>
                  <Link href={item.path}>
                    <a className="text-muted-foreground hover:text-primary transition-colors text-sm">
                      {item.name}
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-white mb-6 uppercase tracking-wider text-sm">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>Kolhapur, Maharashtra,<br />India - 416001</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail size={18} className="text-primary shrink-0" />
                <span>kolhapurstargazing@gmail.com</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+91 8956056186</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} The Matrix Astronomy Club. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Designed for the Cosmos.
          </p>
        </div>
      </div>
    </footer>
  );
}
