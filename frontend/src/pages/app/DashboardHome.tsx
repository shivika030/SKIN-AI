import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, FileText, Pill, TrendingUp, ScanLine, CheckCircle2, Activity } from "lucide-react";

const stats = [
  { icon: ScanLine, label: "Total scans", value: "24", trend: "+3 this week", color: "text-primary", bg: "bg-primary/10" },
  { icon: Activity, label: "Active condition", value: "Eczema", trend: "Mild · monitored", color: "text-secondary", bg: "bg-secondary/10" },
  { icon: TrendingUp, label: "Treatment progress", value: "64%", trend: "+12% vs last week", color: "text-accent", bg: "bg-accent/10" },
  { icon: CheckCircle2, label: "Routine streak", value: "9 days", trend: "Keep it up!", color: "text-primary", bg: "bg-primary/10" },
];

const recent = [
  { date: "Today", title: "Forearm scan", result: "Eczema · 92% confidence", status: "Reviewed" },
  { date: "Yesterday", title: "Cheek scan", result: "Healthy skin · 96%", status: "Clear" },
  { date: "3 days ago", title: "Scalp scan", result: "Dandruff · 81%", status: "Plan active" },
];

const DashboardHome = () => (
  <div className="space-y-6">
    {/* Welcome */}
    <section className="relative overflow-hidden rounded-3xl bg-gradient-primary p-8 text-primary-foreground shadow-premium">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,white,transparent_55%)] opacity-15" />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-sm opacity-90">Good morning, Jamie 👋</div>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl">Your skin health overview</h1>
          <p className="mt-2 max-w-xl opacity-90">
            Your treatment plan is going well. You're 64% through your eczema recovery program.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button asChild variant="secondary" size="lg" className="rounded-2xl">
            <Link to="/app/upload"><Camera className="mr-1 h-4 w-4" /> New scan</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-2xl border-white/30 bg-white/10 text-primary-foreground hover:bg-white/20 hover:text-primary-foreground">
            <Link to="/app/treatment">View plan <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </section>

    {/* Stats */}
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-3xl border bg-card p-5 shadow-elegant transition hover:-translate-y-1 hover:shadow-premium">
          <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${s.bg} ${s.color}`}>
            <s.icon className="h-5 w-5" />
          </div>
          <div className="text-xs text-muted-foreground">{s.label}</div>
          <div className="mt-1 font-display text-2xl font-bold">{s.value}</div>
          <div className="mt-1 text-xs text-muted-foreground">{s.trend}</div>
        </div>
      ))}
    </section>

    {/* Recent + quick actions */}
    <section className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-3xl border bg-card p-6 shadow-elegant lg:col-span-2">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold">Recent activity</h2>
          <Link to="/app/history" className="text-sm text-primary hover:underline">View all</Link>
        </div>
        <ul className="mt-4 divide-y">
          {recent.map((r) => (
            <li key={r.title} className="flex items-center gap-4 py-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <FileText className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-medium">{r.title}</div>
                <div className="text-sm text-muted-foreground">{r.result}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-muted-foreground">{r.date}</div>
                <span className="mt-1 inline-block rounded-full bg-accent/10 px-2 py-0.5 text-xs font-medium text-accent">
                  {r.status}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <div className="rounded-3xl border bg-card p-6 shadow-elegant">
          <h3 className="font-display font-semibold">Today's plan</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {["Apply hydrating cream · 8:00 AM", "Antihistamine tablet · 9:00 AM", "Evening moisturizer · 9:00 PM"].map((t) => (
              <li key={t} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                </span>
                <span className="text-muted-foreground">{t}</span>
              </li>
            ))}
          </ul>
          <Button asChild variant="soft" className="mt-5 w-full rounded-xl">
            <Link to="/app/reminders">Open reminders</Link>
          </Button>
        </div>
        <div className="rounded-3xl border bg-gradient-soft p-6 shadow-elegant">
          <Pill className="h-7 w-7 text-secondary" />
          <h3 className="mt-3 font-display font-semibold">Need a new plan?</h3>
          <p className="mt-1 text-sm text-muted-foreground">Generate a personalized treatment plan based on your latest scan.</p>
          <Button asChild variant="gradient" className="mt-4 w-full rounded-xl">
            <Link to="/app/treatment">Generate plan</Link>
          </Button>
        </div>
      </div>
    </section>
  </div>
);

export default DashboardHome;
