import { useGTMTracking } from "./components/constants";
import { GlobalStyles, Nav, Footer, FloatingWhatsApp } from "./components/Layout";
import { Hero } from "./components/Hero";
import { AccommodationTabs } from "./components/AccommodationTabs";
import { ExperiencesBento } from "./components/ExperiencesBento";
import { SocialProof } from "./components/SocialProof";
import { MapUI } from "./components/MapUI";

export default function CasaraoPireneus() {
  // Hook global de rastreamento do GTM/Pixel
  useGTMTracking();

  return (
    <>
      <GlobalStyles />
      <Nav />
      <main>
        <Hero />
        <AccommodationTabs />
        <ExperiencesBento />
        <SocialProof />
        <MapUI />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
