import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Profile = () => (
  <div className="grid gap-6 lg:grid-cols-3">
    <div className="rounded-3xl border bg-card p-6 shadow-elegant text-center">
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-primary text-2xl font-bold text-primary-foreground shadow-glow">
        JS
      </div>
      <h3 className="mt-4 font-display text-xl font-bold">Jamie Smith</h3>
      <p className="text-sm text-muted-foreground">Premium member · since 2024</p>
      <Button variant="soft" className="mt-4 w-full">Change avatar</Button>
    </div>
    <div className="lg:col-span-2 rounded-3xl border bg-card p-6 shadow-elegant">
      <h3 className="font-display text-lg font-semibold">Personal information</h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {[
          { l: "Full name", v: "Jamie Smith" },
          { l: "Email", v: "jamie@skinai.app" },
          { l: "Age", v: "29" },
          { l: "Skin type", v: "Sensitive · Type II" },
          { l: "Allergies", v: "Fragrance, dust mites" },
          { l: "Conditions", v: "Atopic eczema" },
        ].map((f) => (
          <div key={f.l}>
            <Label className="text-xs text-muted-foreground">{f.l}</Label>
            <Input defaultValue={f.v} className="mt-1 rounded-xl" />
          </div>
        ))}
      </div>
      <Button variant="gradient" className="mt-6">Save changes</Button>
    </div>
  </div>
);

export default Profile;
