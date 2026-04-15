import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export function HowItWorks() {
  const { t } = useI18n();

  const steps = [
    { emoji: "🗺️", title: t.howItWorks.step1Title, desc: t.howItWorks.step1Desc },
    { emoji: "🔒", title: t.howItWorks.step2Title, desc: t.howItWorks.step2Desc },
    { emoji: "🚗", title: t.howItWorks.step3Title, desc: t.howItWorks.step3Desc },
  ];

  const numColors = [
    "bg-primary text-primary-foreground shadow-[0_0_24px_oklch(0.80_0.16_170/30%)]",
    "bg-violet text-foreground shadow-[0_0_24px_oklch(0.55_0.15_300/30%)]",
    "bg-[linear-gradient(135deg,oklch(0.60_0.15_230),oklch(0.50_0.18_260))] text-foreground shadow-[0_0_24px_oklch(0.60_0.15_230/30%)]",
  ];

  return (
    <section id="how-it-works" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/6 text-xs font-bold uppercase tracking-wider text-primary mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px] shadow-primary" />
            {t.howItWorks.label}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4"
          >
            {t.howItWorks.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground font-light max-w-xl mx-auto"
          >
            {t.howItWorks.subtitle}
          </motion.p>
        </div>

        <div className="relative grid gap-7 md:grid-cols-3">
          {/* Connector line */}
          <div className="hidden md:block absolute top-[52px] left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-primary to-violet opacity-30" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative rounded-3xl border border-border bg-card p-8 sm:p-9 text-center hover:-translate-y-1.5 hover:border-primary/25 hover:shadow-2xl transition-all"
            >
              <div className={`w-[52px] h-[52px] rounded-full ${numColors[i]} grid place-items-center text-lg font-extrabold mx-auto mb-6`}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="text-3xl mb-4">{step.emoji}</div>
              <h3 className="text-lg font-bold text-foreground mb-2.5">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
