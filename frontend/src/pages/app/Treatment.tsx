import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Pill, Droplets, Apple, Moon, Sun, ArrowRight, Sparkles } from "lucide-react";

const meds = [
  { name: "Topical Corticosteroid 1%", dose: "Apply thin layer", time: "Morning", icon: Sun },
  { name: "Antihistamine (10mg)", dose: "1 tablet with water", time: "Morning", icon: Pill },
  { name: "Hydrating Moisturizer", dose: "Apply liberally", time: "Evening", icon: Droplets },
  { name: "Topical Cream (night)", dose: "Apply on affected area", time: "Evening", icon: Moon },
];

const skincare = ["Cleanse with fragrance-free wash", "Apply prescribed cream", "Avoid wool, harsh detergents", "Hydrate skin 2× daily"];
const lifestyle = [
  { title: "Diet", desc: "Increase omega-3 (salmon, walnuts). Avoid known food triggers." },
  { title: "Sleep", desc: "Aim for 7–9 hours. Cool, humid bedroom helps reduce flare-ups." },
  { title: "Do's & Don'ts", desc: "Do: gentle products. Don't: scratch, hot showers, stress." },
];

const Treatment = () => {
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  return (
    <div className="space-y-6">
      {/* Summary */}
      <section className="rounded-3xl border bg-card p-6 shadow-elegant">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="text-xs text-muted-foreground">Condition summary</div>
            <h2 className="mt-1 font-display text-2xl font-bold">Atopic Eczema</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">Severity · Mild</span>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Duration · 3–4 weeks</span>
              <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">Plan active</span>
            </div>
          </div>
          <Button asChild variant="gradient">
            <Link to="/app/progress">Track My Progress <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>

      {/* Daily plan */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h3 className="font-display text-lg font-semibold">Daily treatment plan</h3>
          <span className="text-sm text-muted-foreground">{Object.values(checked).filter(Boolean).length}/{meds.length} done today</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {meds.map((m, i) => {
            const done = !!checked[i];
            return (
              <label
                key={i}
                className={`group flex cursor-pointer items-start gap-4 rounded-3xl border bg-card p-5 shadow-elegant transition hover:shadow-premium ${done ? "opacity-70" : ""}`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <m.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className={`font-semibold ${done ? "line-through" : ""}`}>{m.name}</div>
                  <div className="text-sm text-muted-foreground">{m.dose}</div>
                  <div className="mt-1 text-xs font-medium text-accent">{m.time}</div>
                </div>
                <Checkbox
                  checked={done}
                  onCheckedChange={(v) => setChecked((c) => ({ ...c, [i]: !!v }))}
                  className="mt-1 h-5 w-5 rounded-md"
                />
              </label>
            );
          })}
        </div>
      </section>

      {/* Skincare + Lifestyle */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border bg-card p-6 shadow-elegant">
          <Droplets className="h-6 w-6 text-primary" />
          <h3 className="mt-3 font-display text-lg font-semibold">Skincare routine</h3>
          <ul className="mt-4 space-y-3 text-sm">
            {skincare.map((s) => (
              <li key={s} className="flex items-start gap-3 text-muted-foreground">
                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary" /> {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl border bg-card p-6 shadow-elegant">
          <Apple className="h-6 w-6 text-accent" />
          <h3 className="mt-3 font-display text-lg font-semibold">Lifestyle recommendations</h3>
          <div className="mt-4 space-y-4">
            {lifestyle.map((l) => (
              <div key={l.title}>
                <div className="text-sm font-semibold">{l.title}</div>
                <div className="text-sm text-muted-foreground">{l.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-3xl bg-gradient-primary p-8 text-center text-primary-foreground shadow-premium">
        <Sparkles className="mx-auto h-7 w-7" />
        <h3 className="mt-3 font-display text-2xl font-bold">Stay consistent. See real results.</h3>
        <p className="mt-2 opacity-90">Track your symptoms daily and watch your progress chart improve.</p>
        <Button asChild variant="secondary" size="lg" className="mt-5 rounded-2xl">
          <Link to="/app/progress">Track My Progress</Link>
        </Button>
      </section>
    </div>
  );
};

export default Treatment;
