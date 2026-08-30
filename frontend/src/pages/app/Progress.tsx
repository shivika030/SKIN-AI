import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { TrendingDown, TrendingUp, Minus, Plus, Camera } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useState } from "react";

const data = [
  { day: "D1", severity: 78 },
  { day: "D3", severity: 70 },
  { day: "D5", severity: 64 },
  { day: "D7", severity: 55 },
  { day: "D10", severity: 48 },
  { day: "D14", severity: 38 },
  { day: "D18", severity: 30 },
  { day: "D21", severity: 22 },
];

const logs = [
  { day: "Today", symptom: "Mild redness on forearm", level: 3, note: "Felt itchy after workout." },
  { day: "Yesterday", symptom: "Dry patches", level: 4, note: "Applied moisturizer twice." },
  { day: "2 days ago", symptom: "No flare-up", level: 2, note: "Slept 8h, felt great." },
];

const Progress = () => {
  const [pain, setPain] = useState([3]);

  return (
    <div className="space-y-6">
      {/* Status */}
      <section className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl border bg-card p-6 shadow-elegant">
          <div className="flex items-center justify-between">
            <div className="text-xs text-muted-foreground">Status</div>
            <span className="rounded-full bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent">Improving</span>
          </div>
          <div className="mt-3 flex items-center gap-2 font-display text-2xl font-bold text-accent">
            <TrendingDown className="h-6 w-6" /> -56%
          </div>
          <div className="text-xs text-muted-foreground">Severity reduction · 21 days</div>
        </div>
        <div className="rounded-3xl border bg-card p-6 shadow-elegant">
          <div className="text-xs text-muted-foreground">Adherence</div>
          <div className="mt-3 flex items-center gap-2 font-display text-2xl font-bold text-primary">
            <TrendingUp className="h-6 w-6" /> 92%
          </div>
          <div className="text-xs text-muted-foreground">Treatment tasks completed</div>
        </div>
        <div className="rounded-3xl border bg-card p-6 shadow-elegant">
          <div className="text-xs text-muted-foreground">Avg. itch level</div>
          <div className="mt-3 flex items-center gap-2 font-display text-2xl font-bold text-secondary">
            <Minus className="h-6 w-6" /> 2.4 / 10
          </div>
          <div className="text-xs text-muted-foreground">Down from 6.1</div>
        </div>
      </section>

      {/* Chart */}
      <section className="rounded-3xl border bg-card p-6 shadow-elegant">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-semibold">Severity over time</h3>
            <p className="text-sm text-muted-foreground">Lower is better</p>
          </div>
          <div className="flex gap-2 text-xs">
            <span className="rounded-full bg-primary/10 px-3 py-1 font-medium text-primary">21 days</span>
          </div>
        </div>
        <div className="mt-4 h-72 w-full">
          <ResponsiveContainer>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(var(--accent))" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
              <Tooltip
                contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }}
              />
              <Area type="monotone" dataKey="severity" stroke="hsl(var(--primary))" strokeWidth={3} fill="url(#g)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Image timeline */}
      <section className="rounded-3xl border bg-card p-6 shadow-elegant">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-display text-lg font-semibold">Image timeline</h3>
          <Button variant="soft" className="rounded-xl"><Camera className="mr-1 h-4 w-4" /> Upload new image</Button>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Day 1", tint: "from-destructive/30" },
            { label: "Day 10", tint: "from-secondary/30" },
            { label: "Day 21", tint: "from-accent/30" },
          ].map((b) => (
            <div key={b.label} className="overflow-hidden rounded-2xl border">
              <div className={`aspect-square bg-gradient-to-br ${b.tint} via-section to-section`} />
              <div className="flex items-center justify-between p-3">
                <span className="text-sm font-medium">{b.label}</span>
                <span className="text-xs text-muted-foreground">progress photo</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Logs + new log */}
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border bg-card p-6 shadow-elegant lg:col-span-2">
          <h3 className="font-display text-lg font-semibold">Daily logs</h3>
          <div className="mt-4 space-y-3">
            {logs.map((l) => (
              <div key={l.day} className="rounded-2xl border bg-section p-4">
                <div className="flex items-center justify-between">
                  <div className="font-semibold">{l.symptom}</div>
                  <span className="text-xs text-muted-foreground">{l.day}</span>
                </div>
                <div className="mt-1 text-sm text-muted-foreground">{l.note}</div>
                <div className="mt-2 text-xs">Itch level: <span className="font-semibold text-primary">{l.level}/10</span></div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-3xl border bg-card p-6 shadow-elegant">
          <h3 className="font-display text-lg font-semibold">Add today's log</h3>
          <Textarea placeholder="Symptoms, notes, observations..." className="mt-3 min-h-24 rounded-xl" />
          <div className="mt-4">
            <div className="mb-2 flex justify-between text-sm">
              <span className="text-muted-foreground">Pain / itch level</span>
              <span className="font-semibold text-primary">{pain[0]}/10</span>
            </div>
            <Slider value={pain} onValueChange={setPain} max={10} step={1} />
          </div>
          <Button variant="gradient" className="mt-4 w-full"><Plus className="mr-1 h-4 w-4" /> Save log</Button>
        </div>
      </section>
    </div>
  );
};

export default Progress;
