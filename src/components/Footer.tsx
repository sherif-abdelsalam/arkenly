import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t, lang } = useI18n();

  return (
    <footer className="border-t border-border bg-surface py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-sm font-bold text-primary-foreground">A</span>
            </div>
            <span className="font-bold text-foreground">
              {lang === "ar" ? "اركنلي" : "Arkenly"}
            </span>
            <span className="text-sm text-muted-foreground">— {t.footer.tagline}</span>
          </div>
          <p className="text-sm text-muted-foreground">{t.footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
