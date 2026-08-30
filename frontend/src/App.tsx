import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Landing from "./pages/Landing";
import NotFound from "./pages/NotFound.tsx";
import AppLayout from "./pages/app/AppLayout";
import DashboardHome from "./pages/app/DashboardHome";
import Upload from "./pages/app/Upload";
import Reports from "./pages/app/Reports";
import Result from "./pages/app/Result";
import Treatment from "./pages/app/Treatment";
import Progress from "./pages/app/Progress";
import Reminders from "./pages/app/Reminders";
import ChatAssistant from "./pages/app/ChatAssistant";
import History from "./pages/app/History";
import Profile from "./pages/app/Profile";
import Settings from "./pages/app/Settings";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/app" element={<AppLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="upload" element={<Upload />} />
            <Route path="reports" element={<Reports />} />
            <Route path="result" element={<Result />} />
            <Route path="treatment" element={<Treatment />} />
            <Route path="progress" element={<Progress />} />
            <Route path="reminders" element={<Reminders />} />
            <Route path="chat" element={<ChatAssistant />} />
            <Route path="history" element={<History />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
