import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { ThemeProvider } from "@/lib/theme";
import { AuthProvider, useAuth } from "@/lib/auth";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === "string" ? search.redirect : "/book",
    mode: search.mode === "signup" ? "signup" : "login",
  }),
  head: () => ({
    meta: [
      { title: "Sign in or Sign up — Arkenly" },
      { name: "description", content: "Sign in or create an Arkenly account to book parking in Cairo." },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main className="pt-24 pb-16">
              <AuthForm />
            </main>
            <Footer />
          </div>
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}

function AuthForm() {
  const { t } = useI18n();
  const ta = (t as any).auth;
  const search = Route.useSearch();
  const navigate = useNavigate();
  const { user, signIn, signUp, loading: authLoading } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">(search.mode as "login" | "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      navigate({ to: search.redirect });
    }
  }, [user, authLoading, navigate, search.redirect]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.includes("@")) return setError(ta.emailInvalid);
    if (password.length < 6) return setError(ta.passwordShort);
    if (mode === "signup" && !fullName.trim()) return setError(ta.nameRequired);

    setSubmitting(true);
    const result = mode === "login"
      ? await signIn(email, password)
      : await signUp(email, password, fullName.trim(), phone.trim());
    setSubmitting(false);

    if (result.error) {
      setError(result.error);
    }
    // Successful login → useEffect navigates
  };

  return (
    <section className="relative py-12 sm:py-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,var(--hero-glow),transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-md px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-3xl p-8 shadow-2xl"
        >
          <div className="text-center mb-7">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground mb-2">
              {mode === "login" ? ta.loginTitle : ta.signupTitle}
            </h1>
            <p className="text-sm text-muted-foreground">
              {mode === "login" ? ta.loginSubtitle : ta.signupSubtitle}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <>
                <Field label={ta.fullName} value={fullName} onChange={setFullName} type="text" autoComplete="name" />
                <Field label={ta.phone} value={phone} onChange={setPhone} type="tel" autoComplete="tel" placeholder="+20 ..." />
              </>
            )}
            <Field label={ta.email} value={email} onChange={setEmail} type="email" autoComplete="email" />
            <Field label={ta.password} value={password} onChange={setPassword} type="password" autoComplete={mode === "login" ? "current-password" : "new-password"} />

            {error && (
              <div className="rounded-lg bg-destructive/10 border border-destructive/30 px-3 py-2 text-sm text-destructive">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-0.5 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {submitting ? ta.loading : mode === "login" ? ta.signIn : ta.signUp}
            </button>
          </form>

          <div className="text-center mt-6 text-sm text-muted-foreground">
            {mode === "login" ? ta.switchToSignup : ta.switchToLogin}{" "}
            <button
              onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(null); }}
              className="text-primary font-semibold hover:underline"
            >
              {mode === "login" ? ta.signUp : ta.signIn}
            </button>
          </div>

          <div className="text-center mt-4">
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">← Home</Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Field({ label, value, onChange, type, autoComplete, placeholder }: {
  label: string; value: string; onChange: (v: string) => void; type: string; autoComplete?: string; placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs font-bold text-foreground mb-1.5">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl bg-background border border-border text-sm text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
        required
      />
    </label>
  );
}
