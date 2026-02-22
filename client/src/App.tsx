import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import About from "@/pages/About";
import Events from "@/pages/Events";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";
import CodeOfConduct from "@/pages/CodeOfConduct";
import KolhapurStargazing from "@/pages/KolhapurStargazing";
import AstronomyKolhapur from "@/pages/AstronomyKolhapur";
import NightSkyKolhapur from "@/pages/NightSkyKolhapur";
import ScrollToTop from "@/components/ScrollToTop";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/events" component={Events} />
      <Route path="/contact" component={Contact} />
      <Route path="/privacy" component={PrivacyPolicy} />
      <Route path="/terms" component={TermsOfService} />
      <Route path="/conduct" component={CodeOfConduct} />
      <Route path="/kolhapur-stargazing" component={KolhapurStargazing} />
      <Route path="/astronomy-in-kolhapur" component={AstronomyKolhapur} />
      <Route path="/night-sky-observation-kolhapur" component={NightSkyKolhapur} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ScrollToTop />
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
