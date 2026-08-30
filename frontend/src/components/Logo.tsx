import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export const Logo = ({ className = "" }: { className?: string }) => (
  <Link to="/" className={`flex items-center gap-2 font-display font-bold text-lg ${className}`}>
    <span className="relative flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-primary shadow-glow">
      <Sparkles className="h-5 w-5 text-primary-foreground" />
    </span>
    <span className="tracking-tight">
      Skin<span className="text-gradient-primary">AI</span>
    </span>
  </Link>
);
