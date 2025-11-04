import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Mentors from "./pages/Mentors";
import MentorProfile from "./pages/MentorProfile";
import Auth from "./pages/Auth";
import Forum from "./pages/Forum";
import Messages from "./pages/Messages";
import Team from "./pages/Team";
import Feedback from "./pages/Feedback";
import ChatBot from "./components/ChatBot";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/mentor/:id" element={<MentorProfile />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/team" element={<Team />} />
          <Route path="/feedback" element={<Feedback />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ChatBot />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
