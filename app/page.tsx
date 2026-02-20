import { LandingHero } from "@/components/landing/LandingHero";
import { LearningModes } from "@/components/landing/LearningModes";
import { TrustStrip } from "@/components/landing/TrustStrip";
import { WhyDifferent } from "@/components/landing/WhyDifferent";
import { HowItWorksLanding } from "@/components/landing/HowItWorksLanding";
import { LearningPathPreview } from "@/components/landing/LearningPathPreview";
import { LandingFinalCta } from "@/components/landing/LandingFinalCta";

export default function HomePage() {
  return (
    <>
      {/* Section 1 — Hero (above the fold) */}
      <LandingHero />
      {/* Section 2 — Learning Modes */}
      <LearningModes />
      {/* Section 3 — Trust / positioning strip */}
      <TrustStrip />
      {/* Section 3 — Why this is different */}
      <WhyDifferent />
      {/* Section 4 — How it works */}
      <HowItWorksLanding />
      {/* Section 5 — Preview of learning path */}
      <LearningPathPreview />
      {/* Section 6 — Final CTA */}
      <LandingFinalCta />
    </>
  );
}
