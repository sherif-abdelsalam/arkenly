import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t, lang } = useI18n();

  return (
    <footer className="border-t border-border bg-background py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 mb-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-3.5">
              <div className="w-8 h-8 rounded-lg bg-primary grid place-items-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-primary-foreground">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  <circle cx="12" cy="16" r="1" fill="currentColor" />
                </svg>
              </div>
              <span className="text-lg font-extrabold text-foreground">
                {lang === "ar" ? "اركنلي" : "Ark"}<span className="text-primary">{lang === "ar" ? "" : "enly"}</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-[240px]">{t.footer.tagline}</p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold text-sm mb-4">{t.footer.product}</h4>
            <ul className="space-y-2.5">
              <li><a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.footer.howItWorks}</a></li>
              <li><a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.footer.features}</a></li>
              <li><a href="#earn" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.footer.earnMoney}</a></li>
              <li><a href="#cta" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.footer.earlyAccess}</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-sm mb-4">{t.footer.company}</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.footer.aboutUs}</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.footer.blog}</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.footer.careers}</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.footer.press}</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-sm mb-4">{t.footer.legal}</h4>
            <ul className="space-y-2.5">
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.footer.privacy}</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.footer.terms}</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.footer.cookies}</a></li>
              <li><a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{t.footer.contact}</a></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          <span className="text-xs text-muted-foreground">{t.footer.copyright}</span>
          <div className="flex gap-3">
            {/* X */}
            <a href="#" className="w-9 h-9 rounded-full border border-border grid place-items-center hover:border-primary/40 hover:bg-primary/8 hover:-translate-y-0.5 transition-all" aria-label="Twitter">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-muted-foreground"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            </a>
            {/* Instagram */}
            <a href="#" className="w-9 h-9 rounded-full border border-border grid place-items-center hover:border-primary/40 hover:bg-primary/8 hover:-translate-y-0.5 transition-all" aria-label="Instagram">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-muted-foreground"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="12" r="5" fill="none" stroke="currentColor" strokeWidth="2"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>
            </a>
            {/* LinkedIn */}
            <a href="#" className="w-9 h-9 rounded-full border border-border grid place-items-center hover:border-primary/40 hover:bg-primary/8 hover:-translate-y-0.5 transition-all" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-muted-foreground"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
