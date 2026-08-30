import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bell, Pill, Droplets, GlassWater, Edit2, Trash2, Plus } from "lucide-react";

const initial = [
  { id: 1, title: "Morning Cream", time: "08:00", type: "Skincare", on: true, icon: Droplets },
  { id: 2, title: "Antihistamine", time: "09:00", type: "Medicine", on: true, icon: Pill },
  { id: 3, title: "Drink water", time: "Every 2h", type: "Water", on: false, icon: GlassWater },
  { id: 4, title: "Evening Cream", time: "21:00", type: "Skincare", on: true, icon: Droplets },
];

const tasksInit = [
  "Apply morning cream",
  "Take antihistamine",
  "Drink 2L water",
  "Avoid scratching",
  "Apply evening cream",
];

const Reminders = () => {
  const [reminders, setReminders] = useState(initial);
  const [tasks, setTasks] = useState(tasksInit.map((t) => ({ t, done: false })));
  const completed = tasks.filter((t) => t.done).length;
  const pct = Math.round((completed / tasks.length) * 100);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Add reminder */}
        <div className="rounded-3xl border bg-card p-6 shadow-elegant lg:col-span-1">
          <h3 className="font-display text-lg font-semibold">Add reminder</h3>
          <div className="mt-4 space-y-3">
            <div>
              <label className="text-xs text-muted-foreground">Title</label>
              <Input className="mt-1 rounded-xl" placeholder="e.g. Apply night cream" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">Time</label>
                <Input type="time" className="mt-1 rounded-xl" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Frequency</label>
                <Select>
                  <SelectTrigger className="mt-1 rounded-xl"><SelectValue placeholder="Daily" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Type</label>
              <Select>
                <SelectTrigger className="mt-1 rounded-xl"><SelectValue placeholder="Medicine" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="medicine">Medicine</SelectItem>
                  <SelectItem value="skincare">Skincare</SelectItem>
                  <SelectItem value="water">Water intake</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button variant="gradient" className="w-full"><Plus className="mr-1 h-4 w-4" /> Create reminder</Button>
          </div>
        </div>

        {/* Reminder list */}
        <div className="lg:col-span-2 space-y-3">
          {reminders.map((r) => (
            <div key={r.id} className="flex items-center gap-4 rounded-3xl border bg-card p-4 shadow-elegant">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <r.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-semibold">{r.title}</div>
                <div className="text-sm text-muted-foreground">{r.time} · {r.type}</div>
              </div>
              <Switch checked={r.on} onCheckedChange={(v) => setReminders((rs) => rs.map((x) => x.id === r.id ? { ...x, on: v } : x))} />
              <Button variant="ghost" size="icon"><Edit2 className="h-4 w-4" /></Button>
              <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
            </div>
          ))}
        </div>
      </div>

      {/* Daily checklist */}
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border bg-card p-6 shadow-elegant lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg font-semibold">Today's checklist</h3>
            <span className="text-sm text-muted-foreground">{completed}/{tasks.length} done</span>
          </div>
          <Progress value={pct} className="mt-3 h-2" />
          <ul className="mt-5 space-y-2">
            {tasks.map((t, i) => (
              <li key={t.t} className="flex items-center gap-3 rounded-xl border bg-section px-4 py-3">
                <Checkbox
                  checked={t.done}
                  onCheckedChange={(v) => setTasks((ts) => ts.map((x, idx) => idx === i ? { ...x, done: !!v } : x))}
                />
                <span className={t.done ? "line-through text-muted-foreground" : ""}>{t.t}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Notification preview */}
        <div className="rounded-3xl border bg-gradient-soft p-6 shadow-elegant">
          <h3 className="font-display text-lg font-semibold">Notification preview</h3>
          <div className="mt-4 rounded-2xl border bg-card p-4 shadow-elegant animate-fade-in">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-primary text-primary-foreground">
                <Bell className="h-5 w-5" />
              </div>
              <div>
                <div className="text-sm font-semibold">SkinAI Reminder</div>
                <div className="text-sm text-muted-foreground">Time to apply your treatment cream 🧴</div>
                <div className="mt-1 text-xs text-muted-foreground">Now · daily</div>
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">Notifications appear on your phone, browser and email.</p>
        </div>
      </div>
    </div>
  );
};

export default Reminders;
