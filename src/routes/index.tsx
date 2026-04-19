import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProblemSolution } from "@/components/ProblemSolution";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { OwnersCTA } from "@/components/OwnersCTA";
import { Testimonials } from "@/components/Testimonials";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import { AuthProvider } from "@/lib/auth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arkenly — Smart Parking Marketplace | اركنلي" },
      { name: "description", content: "Find, book, and pay for guaranteed parking spots across Cairo. Earn money from your empty parking space." },
      { property: "og:title", content: "Arkenly — Smart Parking Marketplace" },
      { property: "og:description", content: "Connect with private parking space owners. Book guaranteed spots in advance." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main>
              <Hero />
              <ProblemSolution />
              <HowItWorks />
              <Features />
              <OwnersCTA />
              <Testimonials />
              <FinalCTA />
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
