import { FileText, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

const reports = [
  { title: "Forearm scan", date: "Today, 10:24 AM", result: "Eczema · 92%", severity: "Mild" },
  { title: "Cheek scan", date: "Yesterday, 7:10 PM", result: "Healthy · 96%", severity: "—" },
  { title: "Scalp scan", date: "Apr 28, 8:32 AM", result: "Dandruff · 81%", severity: "Low" },
  { title: "Hand scan", date: "Apr 22, 12:00 PM", result: "Dermatitis · 88%", severity: "Mild" },
];

const Reports = () => (
  <div className="rounded-3xl border bg-card shadow-elegant">
    <div className="flex items-center justify-between p-6">
      <div>
        <h2 className="font-display text-xl font-bold">My reports</h2>
        <p className="text-sm text-muted-foreground">All your past scans, in one place.</p>
      </div>
      <Button variant="soft" className="rounded-xl"><Download className="mr-1 h-4 w-4" /> Export all</Button>
    </div>
    <ul className="divide-y">
      {reports.map((r) => (
        <li key={r.title + r.date} className="flex flex-wrap items-center gap-4 p-6 hover:bg-section/50 transition">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <FileText className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="font-semibold">{r.title}</div>
            <div className="text-sm text-muted-foreground">{r.date} · {r.result}</div>
          </div>
          <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent">{r.severity}</span>
          <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
        </li>
      ))}
    </ul>
  </div>
);

export default Reports;
