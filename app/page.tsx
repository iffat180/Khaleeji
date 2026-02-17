import { Hero } from "@/components/landing/Hero";
import { PainPoints } from "@/components/landing/PainPoints";
import { Solution } from "@/components/landing/Solution";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { ModulePreview } from "@/components/landing/ModulePreview";
import { Testimonials } from "@/components/landing/Testimonials";
import { LandingPricing } from "@/components/landing/LandingPricing";
import { FinalCta } from "@/components/landing/FinalCta";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--sand)]">
      <Hero />
      <PainPoints />
      <Solution />
      <HowItWorks />
      <ModulePreview />
      <Testimonials />
      <LandingPricing />
      <FinalCta />
    </div>
  );
}

