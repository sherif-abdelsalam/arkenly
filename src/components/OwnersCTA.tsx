import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

export function OwnersCTA() {
  const { t } = useI18n();

  const benefits = [
    { title: t.owners.benefit1Title, desc: t.owners.benefit1Desc },
    { title: t.owners.benefit2Title, desc: t.owners.benefit2Desc },
    { title: t.owners.benefit3Title, desc: t.owners.benefit3Desc },
    { title: t.owners.benefit4Title, desc: t.owners.benefit4Desc },
  ];

  const barHeights = [35, 55, 45, 70, 90, 60, 80];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <section id="earn" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[200px] -left-[200px] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.15_300/18%),transparent_70%)]" />
        <div className="absolute top-[100px] -right-[150px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,oklch(0.80_0.16_170/10%),transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Text */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/6 text-xs font-bold uppercase tracking-wider text-primary mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px] shadow-primary" />
              {t.owners.label}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4"
            >
              {t.owners.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground font-light leading-relaxed mb-8 max-w-lg"
            >
              {t.owners.subtitle}
            </motion.p>

            <div className="space-y-4 mb-8">
              {benefits.map((b, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-start gap-3.5"
                >
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-success/15 grid place-items-center mt-0.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="w-3 h-3 text-success"><path d="M20 6L9 17l-5-5"/></svg>
                  </div>
                  <div>
                    <div className="font-semibold text-sm mb-0.5">{b.title}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">{b.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#cta"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all"
            >
              {t.owners.cta}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </motion.a>
          </div>

          {/* Earnings Visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <div className="rounded-3xl border border-success/20 p-8 sm:p-10 text-center shadow-2xl" style={{ background: "linear-gradient(135deg, oklch(0.18 0.03 250), oklch(0.15 0.04 290))" }}>
              <div className="text-4xl sm:text-5xl font-extrabold text-success leading-none mb-2">{t.owners.earnAmount}</div>
              <div className="text-sm text-muted-foreground mb-7">{t.owners.earnLabel}</div>

              <div className="flex items-end gap-2.5 justify-center h-20 mb-4">
                {barHeights.map((h, i) => (
                  <div
                    key={i}
                    className={`w-7 rounded-t-md transition-all duration-1000 ${i === 4 ? "bg-success" : "bg-success/20"}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>

              <div className="flex justify-between text-xs text-muted-foreground px-1">
                {days.map(d => <span key={d}>{d}</span>)}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
