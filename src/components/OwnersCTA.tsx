import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export function OwnersCTA() {
  const { t } = useI18n();

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-primary p-10 sm:p-16"
        >
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-primary-foreground/10 blur-2xl" />
          <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-primary-foreground/5 blur-2xl" />

          <div className="relative mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-primary-foreground sm:text-4xl">
              {t.owners.title}
            </h2>
            <p className="mb-8 text-lg text-primary-foreground/80">
              {t.owners.subtitle}
            </p>

            <div className="mb-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-6">
              {[t.owners.benefit1, t.owners.benefit2, t.owners.benefit3].map((b) => (
                <div key={b} className="flex items-center gap-2 text-sm text-primary-foreground/90">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  {b}
                </div>
              ))}
            </div>

            <button className="h-12 rounded-xl bg-primary-foreground px-8 text-base font-semibold text-primary shadow-lg transition-all hover:opacity-90">
              {t.owners.cta}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
