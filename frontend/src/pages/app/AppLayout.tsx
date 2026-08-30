import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  FileText,
  Pill,
  TrendingUp,
  Bell,
  Bot,
  History,
  User,
  Settings,
  LogOut,
  Search,
  Menu,
  X,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { Chatbot } from "@/components/Chatbot";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/app", end: true, icon: LayoutDashboard, label: "Dashboard" },
  { to: "/app/upload", icon: Upload, label: "Upload Scan" },
  { to: "/app/reports", icon: FileText, label: "My Reports" },
  { to: "/app/treatment", icon: Pill, label: "Treatment Plan", badge: "New" },
  { to: "/app/progress", icon: TrendingUp, label: "Progress Tracker", badge: "New" },
  { to: "/app/reminders", icon: Bell, label: "Reminders", badge: "New" },
  { to: "/app/chat", icon: Bot, label: "AI Chat Assistant" },
  { to: "/app/history", icon: History, label: "History" },
  { to: "/app/profile", icon: User, label: "Profile" },
  { to: "/app/settings", icon: Settings, label: "Settings" },
];

const Sidebar = ({ onNavigate }: { onNavigate?: () => void }) => (
  <aside className="flex h-full w-64 shrink-0 flex-col border-r bg-sidebar">
    <div className="px-6 py-5">
      <Logo />
    </div>
    <nav className="flex-1 space-y-1 px-3">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
              isActive
                ? "bg-gradient-primary text-primary-foreground shadow-elegant"
                : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            )
          }
        >
          <item.icon className="h-4.5 w-4.5" />
          <span className="flex-1">{item.label}</span>
          {item.badge && (
            <span className="rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold text-accent">
              {item.badge}
            </span>
          )}
        </NavLink>
      ))}
    </nav>
    <div className="border-t p-3">
      <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition hover:bg-sidebar-accent hover:text-destructive">
        <LogOut className="h-4 w-4" />
        Logout
      </button>
    </div>
  </aside>
);

const Topbar = ({ onMenu }: { onMenu: () => void }) => {
  const { pathname } = useLocation();
  const current = navItems.find((n) => (n.end ? pathname === n.to : pathname.startsWith(n.to)));
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur lg:px-8">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenu}>
        <Menu className="h-5 w-5" />
      </Button>
      <div>
        <div className="text-xs text-muted-foreground">SkinAI</div>
        <div className="font-display text-lg font-semibold leading-none">{current?.label || "Dashboard"}</div>
      </div>
      <div className="ml-auto flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search reports, conditions..." className="h-10 w-72 rounded-xl pl-9" />
        </div>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent" />
        </Button>
        <div className="flex items-center gap-3 rounded-2xl border bg-card px-3 py-1.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-primary text-xs font-semibold text-primary-foreground">
            JS
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-semibold leading-tight">Jamie Smith</div>
            <div className="text-xs text-muted-foreground leading-tight">Premium</div>
          </div>
        </div>
      </div>
    </header>
  );
};

const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-section">
      <div className="hidden lg:flex">
        <Sidebar />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full">
            <div className="relative h-full">
              <button
                className="absolute right-3 top-5 z-10 rounded-lg p-1 text-muted-foreground"
                onClick={() => setMobileOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
              <Sidebar onNavigate={() => setMobileOpen(false)} />
            </div>
          </div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar onMenu={() => setMobileOpen(true)} />
        <main className="flex-1 p-4 lg:p-8">
          <div className="mx-auto w-full max-w-7xl animate-fade-in">
            <Outlet />
          </div>
        </main>
      </div>
      <Chatbot />
    </div>
  );
};

export default AppLayout;
