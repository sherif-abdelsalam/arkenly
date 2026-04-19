import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BookingMVP } from "@/components/BookingMVP";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import { AuthProvider } from "@/lib/auth";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Book Parking in Cairo — Arkenly" },
      { name: "description", content: "Pick a Cairo location, choose a time slot, and confirm your parking booking instantly." },
      { property: "og:title", content: "Book Parking in Cairo — Arkenly" },
      { property: "og:description", content: "Try the Arkenly MVP: book parking spots across Cairo in seconds." },
    ],
  }),
  component: BookPage,
});

function BookPage() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main className="pt-20">
              <BackBar />
              <BookingMVP />
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}

function BackBar() {
  const { dir } = useI18n();
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 pt-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: dir === "rtl" ? "scaleX(-1)" : undefined }}>
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Home
      </Link>
    </div>
  );
}
