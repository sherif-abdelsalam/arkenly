import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const iconColors = [
  "bg-primary/12",
  "bg-violet/15",
  "bg-[oklch(0.60_0.15_230/12%)]",
  "bg-success/12",
  "bg-[oklch(0.70_0.15_50/12%)]",
  "bg-[oklch(0.65_0.18_330/12%)]",
];

const emojis = ["🗺️", "🧠", "📅", "💰", "⭐", "🔔"];

export function Features() {
  const { t } = useI18n();

  const features = [
    { title: t.features.f1Title, desc: t.features.f1Desc, wide: true },
    { title: t.features.f2Title, desc: t.features.f2Desc, wide: false },
    { title: t.features.f5Title, desc: t.features.f5Desc, wide: false },
    { title: t.features.f4Title, desc: t.features.f4Desc, wide: false },
    { title: t.features.f6Title, desc: t.features.f6Desc, wide: true },
    { title: t.features.f7Title, desc: t.features.f7Desc, wide: false },
  ];

  return (
    <section id="features" className="bg-surface py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/6 text-xs font-bold uppercase tracking-wider text-primary mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px] shadow-primary" />
            {t.features.label}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-foreground whitespace-pre-line"
          >
            {t.features.title}
          </motion.h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className={`relative group rounded-2xl border border-border bg-card p-7 overflow-hidden hover:-translate-y-1 hover:border-primary/20 hover:shadow-2xl transition-all ${f.wide ? "sm:col-span-2" : ""}`}
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-br from-primary/4 to-violet/4" />
              <div className={`relative w-12 h-12 rounded-lg ${iconColors[i]} grid place-items-center text-xl mb-4`}>
                {emojis[i]}
              </div>
              <h3 className="relative text-base font-bold text-foreground mb-2">{f.title}</h3>
              <p className="relative text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
