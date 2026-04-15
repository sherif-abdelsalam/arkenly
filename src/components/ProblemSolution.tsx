import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n";

const problemIcons = [
  <svg key="time" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>,
  <svg key="fuel" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5"><path d="M3 3l18 18M10.5 6.5C11 5.6 12.1 5 13.5 5c2.2 0 3.5 1.5 3.5 3.5 0 3.8-5 6.5-5 6.5"/><path d="M5 19h.01"/></svg>,
  <svg key="sys" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
];

export function ProblemSolution() {
  const { t } = useI18n();
  const problems = [
    { icon: problemIcons[0], title: t.problem.p1Title, desc: t.problem.p1Desc },
    { icon: problemIcons[1], title: t.problem.p2Title, desc: t.problem.p2Desc },
    { icon: problemIcons[2], title: t.problem.p3Title, desc: t.problem.p3Desc },
  ];

  const stats = [
    { value: t.problem.stat1Value, label: t.problem.stat1Label },
    { value: t.problem.stat2Value, label: t.problem.stat2Label },
    { value: t.problem.stat3Value, label: t.problem.stat3Label },
  ];

  return (
    <section className="relative bg-surface py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[200px] -left-[200px] w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,oklch(0.55_0.15_300/18%),transparent_70%)]" />
        <div className="absolute top-[100px] -right-[150px] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,oklch(0.80_0.16_170/10%),transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Problem side */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-destructive/25 bg-destructive/6 text-xs font-bold uppercase tracking-wider text-destructive mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-destructive shadow-[0_0_8px] shadow-destructive" />
              {t.problem.label}
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-extrabold text-foreground mb-4 whitespace-pre-line"
            >
              {t.problem.title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground font-light leading-relaxed mb-8 max-w-lg"
            >
              {t.problem.subtitle}
            </motion.p>

            <div className="space-y-4">
              {problems.map((p, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4 items-start p-5 rounded-2xl bg-destructive/5 border border-destructive/12 hover:translate-x-1 transition-transform"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-destructive/12 grid place-items-center text-destructive">
                    {p.icon}
                  </div>
                  <div>
                    <div className="font-bold text-sm mb-1">{p.title}</div>
                    <div className="text-sm text-muted-foreground leading-relaxed">{p.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Solution side */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-primary/25 bg-primary/6 text-xs font-bold uppercase tracking-wider text-primary mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px] shadow-primary" />
              {t.problem.solutionLabel}
            </span>

            <div className="rounded-3xl p-8 sm:p-10 relative overflow-hidden" style={{ background: "linear-gradient(135deg, oklch(0.80 0.16 170 / 8%), oklch(0.55 0.15 300 / 8%))" }}>
              <div className="absolute -top-[60px] -right-[60px] w-[200px] h-[200px] rounded-full bg-[radial-gradient(circle,oklch(0.80_0.16_170/15%),transparent_70%)]" />
              <div className="border border-primary/20 rounded-3xl p-8 relative">
                <h3 className="text-2xl font-extrabold text-foreground mb-3">{t.problem.solutionTitle}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-7">{t.problem.solutionDesc}</p>

                <div className="flex gap-8 flex-wrap">
                  {stats.map((s, i) => (
                    <div key={i} className="text-start">
                      <div className="text-3xl sm:text-4xl font-extrabold text-primary leading-none">{s.value}</div>
                      <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
