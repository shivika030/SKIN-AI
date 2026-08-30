import { useState } from "react";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const suggestions = [
  "What is this condition?",
  "How long will it take to heal?",
  "What treatment should I follow?",
];

type Msg = { role: "user" | "bot"; text: string };

export const Chatbot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "bot", text: "Hi! I'm your SkinAI assistant. Ask me anything about skin health." },
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
      setMessages((m) => [
        ...m,
        {
          role: "bot",
          text: "Based on your latest scan, this looks consistent with mild eczema. I recommend following your treatment plan and tracking progress daily.",
        },
      ]);
    }, 1200);
  };

  return (
    <>
      <button
        aria-label="Open chat assistant"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-primary text-primary-foreground shadow-premium animate-pulse-glow transition hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex w-[360px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border bg-card shadow-premium animate-scale-in">
          <div className="flex items-center gap-3 border-b bg-gradient-primary p-4 text-primary-foreground">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold leading-tight">SkinAI Assistant</div>
              <div className="text-xs opacity-90">Medical-aware · Always available</div>
            </div>
          </div>

          <div className="flex h-80 flex-col gap-3 overflow-y-auto p-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  m.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {m.text}
              </div>
            ))}
            {typing && (
              <div className="flex items-center gap-1 rounded-2xl bg-muted px-3 py-2 w-fit">
                {[0, 1, 2].map((i) => (
                  <span
                    key={i}
                    className="h-2 w-2 rounded-full bg-muted-foreground animate-typing"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-1.5 border-t p-3">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="rounded-full border bg-background px-3 py-1 text-xs text-muted-foreground transition hover:border-primary hover:text-primary"
              >
                {s}
              </button>
            ))}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t p-3"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your skin..."
              className="rounded-xl"
            />
            <Button type="submit" size="icon" className="rounded-xl">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      )}
    </>
  );
};
