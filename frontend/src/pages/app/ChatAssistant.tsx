import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, Sparkles } from "lucide-react";

const suggestions = [
  "What is this condition?",
  "How long will it take to heal?",
  "What treatment should I follow?",
  "Are there any side effects?",
];

type Msg = { role: "user" | "bot"; text: string };

const ChatAssistant = () => {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "Hi Jamie! I've reviewed your latest scan. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);

  const send = (text: string) => {
    if (!text.trim()) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { role: "bot", text: "Atopic eczema is a chronic inflammatory skin condition. With your current plan, most users see significant improvement within 3–4 weeks." }]);
    }, 1100);
  };

  return (
    <div className="flex h-[calc(100vh-10rem)] flex-col rounded-3xl border bg-card shadow-elegant">
      <div className="flex items-center gap-3 border-b p-5">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-glow">
          <Sparkles className="h-5 w-5" />
        </div>
        <div>
          <div className="font-display text-lg font-semibold">SkinAI Assistant</div>
          <div className="text-xs text-muted-foreground">Medical-aware · Personalized to your profile</div>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-6">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
              m.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted"
            }`}
          >
            {m.text}
          </div>
        ))}
        {typing && (
          <div className="flex w-fit items-center gap-1 rounded-2xl bg-muted px-4 py-3">
            {[0, 1, 2].map((i) => (
              <span key={i} className="h-2 w-2 rounded-full bg-muted-foreground animate-typing" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 border-t p-3">
        {suggestions.map((s) => (
          <button key={s} onClick={() => send(s)} className="rounded-full border bg-background px-3 py-1.5 text-xs text-muted-foreground transition hover:border-primary hover:text-primary">
            {s}
          </button>
        ))}
      </div>

      <form
        onSubmit={(e) => { e.preventDefault(); send(input); }}
        className="flex items-center gap-2 border-t p-4"
      >
        <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask anything about your skin..." className="rounded-xl" />
        <Button type="submit" variant="gradient" size="icon"><Send className="h-4 w-4" /></Button>
      </form>
    </div>
  );
};

export default ChatAssistant;
