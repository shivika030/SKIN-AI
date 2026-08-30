import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { Chatbot } from "@/components/Chatbot";
import {
  ScanLine,
  ShieldCheck,
  Activity,
  Bell,
  Sparkles,
  ArrowRight,
  Upload,
  Brain,
  ClipboardList,
  LineChart,
  CheckCircle2,
  Star,
} from "lucide-react";
import heroImg from "@/assets/hero.jpg";

const features = [
  { icon: ScanLine, title: "AI Skin Detection", desc: "Upload a photo and get a medical-grade analysis in seconds." },
  { icon: ClipboardList, title: "Personalized Treatment Plans", desc: "Daily medicine, skincare and lifestyle guidance built for you." },
  { icon: LineChart, title: "Track Progress & Follow Treatment", desc: "Visualize healing with image timelines and severity charts." },
  { icon: Bell, title: "Smart Reminders", desc: "Never miss a dose, cream, or hydration goal again." },
  { icon: ShieldCheck, title: "Private & Secure", desc: "End-to-end encryption. Your skin data stays yours." },
  { icon: Brain, title: "AI Chat Assistant", desc: "Ask anything — get medically-aware answers anytime." },
];

const steps = [
  { icon: Upload, title: "Upload a scan", desc: "Snap or upload a photo of the affected area." },
  { icon: Brain, title: "AI analyzes", desc: "Our model identifies the condition and severity." },
  { icon: ClipboardList, title: "Get your plan", desc: "Receive a personalized treatment plan instantly." },
  { icon: Activity, title: "Track healing", desc: "Follow progress visually and stay on track." },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-40 glass border-b">
        <div className="container flex h-16 items-center justify-between">
          <Logo />
          <nav className="hidden gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground transition">Features</a>
            <a href="#how" className="hover:text-foreground transition">How it works</a>
            <a href="#pricing" className="hover:text-foreground transition">Pricing</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link to="/app">Sign in</Link>
            </Button>
            <Button asChild variant="gradient">
              <Link to="/app">Launch app <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="container grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
          <div className="space-y-6 animate-fade-in">
            <span className="inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-accent" /> Medical-grade AI · Now in beta
            </span>
            <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Your skin, <br />
              <span className="text-gradient-primary">understood by AI.</span>
            </h1>
            <p className="max-w-xl text-lg text-muted-foreground">
              SkinAI detects skin conditions, builds personalized treatment plans, and helps you
              <span className="text-foreground font-medium"> track progress and follow treatment plans </span>
              — all in one beautifully designed health platform.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" variant="gradient">
                <Link to="/app">Start free scan <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#how">See how it works</a>
              </Button>
            </div>
            <div className="flex items-center gap-6 pt-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-accent text-accent" />)}
                <span className="ml-2">4.9 · 12k+ users</span>
              </div>
              <div className="hidden items-center gap-2 sm:flex">
                <ShieldCheck className="h-4 w-4 text-accent" /> HIPAA-ready
              </div>
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="absolute -inset-8 rounded-[3rem] bg-gradient-primary opacity-20 blur-3xl" />
            <div className="relative overflow-hidden rounded-3xl border bg-card shadow-premium">
              <img src={heroImg} alt="SkinAI scan visualization" width={1280} height={1024} className="w-full" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border bg-card p-4 shadow-elegant sm:block animate-float">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Detection</div>
                  <div className="text-sm font-semibold">98.2% confidence</div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 hidden rounded-2xl border bg-card p-4 shadow-elegant sm:block animate-float" style={{ animationDelay: "1s" }}>
              <div className="text-xs text-muted-foreground">Healing progress</div>
              <div className="text-sm font-semibold text-accent">+ 64% improved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-section py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl font-bold tracking-tight">Everything you need for healthier skin</h2>
            <p className="mt-4 text-muted-foreground">From detection to recovery — one elegant platform.</p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="group rounded-3xl border bg-card p-6 shadow-elegant transition hover:-translate-y-1 hover:shadow-premium">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="font-display text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl font-bold tracking-tight">How SkinAI works</h2>
            <p className="mt-4 text-muted-foreground">Four simple steps to clearer, healthier skin.</p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="relative rounded-3xl border bg-card p-6 shadow-elegant">
                <div className="absolute -top-3 left-6 rounded-full bg-gradient-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  Step {i + 1}
                </div>
                <s.icon className="mt-3 h-8 w-8 text-primary" />
                <h3 className="mt-4 font-display text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="bg-section py-24">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-12 text-center text-primary-foreground shadow-premium">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,white,transparent_50%)] opacity-10" />
            <h2 className="relative font-display text-4xl font-bold tracking-tight">Start your skin journey today</h2>
            <p className="relative mx-auto mt-4 max-w-xl opacity-90">
              Free to start. No credit card required. Built with privacy at its core.
            </p>
            <Button asChild size="lg" variant="secondary" className="relative mt-6 rounded-2xl">
              <Link to="/app">Open dashboard <ArrowRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t py-10">
        <div className="container flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
          <Logo />
          <div>© {new Date().getFullYear()} SkinAI. All rights reserved.</div>
        </div>
      </footer>

      <Chatbot />
    </div>
  );
};

export default Landing;
