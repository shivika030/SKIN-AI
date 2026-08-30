import { History as HistoryIcon } from "lucide-react";

const events = [
  { date: "Today", items: ["New scan: Forearm", "Treatment plan generated"] },
  { date: "Yesterday", items: ["Logged itch level 3/10", "Completed 4/4 reminders"] },
  { date: "Apr 28", items: ["New scan: Scalp", "Started dandruff plan"] },
  { date: "Apr 22", items: ["New scan: Hand", "Added reminder: Evening cream"] },
];

const History = () => (
  <div className="rounded-3xl border bg-card p-6 shadow-elegant">
    <h2 className="font-display text-xl font-bold">Activity history</h2>
    <p className="text-sm text-muted-foreground">A complete timeline of your skin journey.</p>
    <div className="mt-6 space-y-6">
      {events.map((e) => (
        <div key={e.date}>
          <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">{e.date}</div>
          <ul className="space-y-2">
            {e.items.map((i) => (
              <li key={i} className="flex items-center gap-3 rounded-2xl border bg-section px-4 py-3">
                <HistoryIcon className="h-4 w-4 text-primary" />
                <span className="text-sm">{i}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
);

export default History;
