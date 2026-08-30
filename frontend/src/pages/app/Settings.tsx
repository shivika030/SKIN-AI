import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

const sections = [
  {
    title: "Notifications",
    items: [
      { label: "Push notifications", desc: "Get reminders on your device", on: true },
      { label: "Email updates", desc: "Weekly progress reports", on: true },
      { label: "Marketing emails", desc: "Tips and product news", on: false },
    ],
  },
  {
    title: "Privacy",
    items: [
      { label: "Share anonymized data for research", desc: "Help improve AI accuracy", on: false },
      { label: "Allow image storage", desc: "Required to view history", on: true },
    ],
  },
];

const Settings = () => (
  <div className="space-y-6">
    {sections.map((s) => (
      <div key={s.title} className="rounded-3xl border bg-card p-6 shadow-elegant">
        <h3 className="font-display text-lg font-semibold">{s.title}</h3>
        <ul className="mt-4 divide-y">
          {s.items.map((it) => (
            <li key={it.label} className="flex items-center justify-between py-4">
              <div>
                <div className="font-medium">{it.label}</div>
                <div className="text-sm text-muted-foreground">{it.desc}</div>
              </div>
              <Switch defaultChecked={it.on} />
            </li>
          ))}
        </ul>
      </div>
    ))}
    <div className="rounded-3xl border bg-card p-6 shadow-elegant">
      <h3 className="font-display text-lg font-semibold text-destructive">Danger zone</h3>
      <p className="mt-1 text-sm text-muted-foreground">Permanently delete your account and all associated data.</p>
      <Button variant="destructive" className="mt-4 rounded-xl">Delete account</Button>
    </div>
  </div>
);

export default Settings;
