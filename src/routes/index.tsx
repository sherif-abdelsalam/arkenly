import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { Features } from "@/components/Features";
import { OwnersCTA } from "@/components/OwnersCTA";
import { Footer } from "@/components/Footer";
import { I18nProvider } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Arkenly — Find & Book Parking in Egypt | اركنلي" },
      { name: "description", content: "Arkenly is Egypt's peer-to-peer parking marketplace. Find, book, and pay for guaranteed parking spots across Cairo." },
      { property: "og:title", content: "Arkenly — Find & Book Parking in Egypt" },
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
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <main>
            <Hero />
            <HowItWorks />
            <Features />
            <OwnersCTA />
          </main>
          <Footer />
        </div>
      </I18nProvider>
    </ThemeProvider>
  );
}
