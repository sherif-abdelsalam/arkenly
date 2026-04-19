import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import { useAuth } from "@/lib/auth";
import { useState } from "react";

export function Header() {
  const { t, lang, toggleLang } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  const userInitial =
    (user?.user_metadata?.full_name as string | undefined)?.[0]?.toUpperCase() ??
    user?.email?.[0]?.toUpperCase() ??
    "?";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary grid place-items-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-primary-foreground">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              <circle cx="12" cy="16" r="1" fill="currentColor" />
            </svg>
          </div>
          <span className="text-xl font-extrabold text-foreground">
            {lang === "ar" ? "اركنلي" : "Ark"}<span className="text-primary">{lang === "ar" ? "" : "enly"}</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <a href="/#how-it-works" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{t.nav.howItWorks}</a>
          <a href="/#features" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{t.nav.features}</a>
          <a href="/#earn" className="text-sm text-muted-foreground transition-colors hover:text-foreground">{t.nav.earn}</a>
          <Link to="/book" className="text-sm font-semibold text-primary transition-colors hover:opacity-80">{t.nav.tryNow}</Link>
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-secondary"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>

          <button
            onClick={toggleLang}
            className="flex h-9 items-center justify-center rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            {lang === "en" ? "عربي" : "EN"}
          </button>

          {user ? (
            <div className="hidden sm:flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-primary/15 border border-primary/30 grid place-items-center text-sm font-bold text-primary" title={user.email ?? ""}>
                {userInitial}
              </div>
              <button
                onClick={() => signOut()}
                className="h-9 inline-flex items-center justify-center rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                {t.nav.logout}
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/auth"
                search={{ redirect: "/book", mode: "login" }}
                className="hidden sm:flex h-9 items-center justify-center rounded-lg border border-border bg-card px-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                {t.nav.login}
              </Link>
              <Link to="/book" className="hidden h-9 items-center justify-center rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground transition-all hover:opacity-90 sm:flex">
                {t.nav.tryNow}
              </Link>
            </>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex md:hidden flex-col gap-1.5 p-1.5"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-foreground rounded transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block w-6 h-0.5 bg-foreground rounded transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-foreground rounded transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-xl border-b border-border px-6 py-5 flex flex-col gap-4">
          <a href="/#how-it-works" onClick={() => setMenuOpen(false)} className="text-base text-muted-foreground hover:text-foreground py-2 border-b border-border">{t.nav.howItWorks}</a>
          <a href="/#features" onClick={() => setMenuOpen(false)} className="text-base text-muted-foreground hover:text-foreground py-2 border-b border-border">{t.nav.features}</a>
          <a href="/#earn" onClick={() => setMenuOpen(false)} className="text-base text-muted-foreground hover:text-foreground py-2 border-b border-border">{t.nav.earn}</a>
          <Link to="/book" onClick={() => setMenuOpen(false)} className="text-center py-3 rounded-full bg-primary text-primary-foreground font-bold">{t.nav.tryNow}</Link>
          {user ? (
            <button onClick={() => { setMenuOpen(false); signOut(); }} className="text-center py-3 rounded-full border border-border text-foreground font-bold">{t.nav.logout}</button>
          ) : (
            <Link to="/auth" search={{ redirect: "/book", mode: "login" }} onClick={() => setMenuOpen(false)} className="text-center py-3 rounded-full border border-border text-foreground font-bold">{t.nav.login}</Link>
          )}
        </div>
      )}
    </header>
  );
}
