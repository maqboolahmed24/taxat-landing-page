import Header from "@/components/marketing/Header";
import Hero from "@/components/marketing/Hero";
import SocialProof from "@/components/marketing/SocialProof";
import Problem from "@/components/marketing/Problem";
import Mechanism from "@/components/marketing/Mechanism";
import HowItWorks from "@/components/marketing/HowItWorks";
import ProductShowcase from "@/components/marketing/ProductShowcase";
import Trust from "@/components/marketing/Trust";
import Pricing from "@/components/marketing/Pricing";
import FAQ from "@/components/marketing/FAQ";
import FinalCTA from "@/components/marketing/FinalCTA";
import Footer from "@/components/marketing/Footer";
import CursorGlow from "@/components/marketing/CursorGlow";
import ScrollProgress from "@/components/marketing/ScrollProgress";
import StickyCTA from "@/components/marketing/StickyCTA";

export default function Page() {
  return (
    <main className="relative overflow-x-clip">
      <CursorGlow />
      <ScrollProgress />
      <StickyCTA />

      <Header />
      <Hero />

      <SocialProof />
      <Problem />
      <Mechanism />
      <HowItWorks />
      <ProductShowcase />
      <Trust />
      <Pricing />
      <FAQ />
      <FinalCTA />

      <Footer />
    </main>
  );
}
