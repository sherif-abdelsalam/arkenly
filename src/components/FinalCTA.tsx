import { useState } from "react";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export function FinalCTA() {
  const { t } = useI18n();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError(true);
      return;
    }
    setError(false);
    setEmail("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="cta" className="relative py-20 sm:py-28 overflow-hidden bg-surface">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[100px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-[radial-gradient(circle,var(--hero-glow),transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-xl px-4 sm:px-6 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/6 text-xs font-bold uppercase tracking-wider text-primary mb-5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px] shadow-primary" />
          {t.finalCta.label}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground mb-4"
        >
          {t.finalCta.title}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground font-light leading-relaxed mb-9 mx-auto max-w-md"
        >
          {t.finalCta.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-2.5 justify-center mb-2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(false); }}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder={t.finalCta.emailPlaceholder}
            className={`flex-1 max-w-[320px] min-w-[200px] px-5 py-3.5 rounded-full bg-card border ${error ? "border-destructive" : "border-border"} text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/50 transition-colors`}
          />
          <button
            onClick={handleSubmit}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all whitespace-nowrap"
          >
            {t.finalCta.cta}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </motion.div>
        {error && <p className="text-sm text-destructive mb-2">{t.hero.emailError}</p>}
        {submitted && <p className="text-sm text-primary mb-2">✓ You're on the list!</p>}

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-xs text-muted-foreground mt-4"
        >
          {t.finalCta.note}
        </motion.p>
      </div>
    </section>
  );
}
