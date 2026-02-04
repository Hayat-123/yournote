import Features from "@/components/features";
import { HeroHeader } from "@/components/header";
import HeroSection from "@/components/hero-section";


import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main>
      <HeroHeader />
      <HeroSection />
      <Features />
      <Footer />
    </main>
  );
}
