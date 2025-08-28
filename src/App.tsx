import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Scholarships from "./pages/Scholarships";
import Housing from "./pages/Housing";
import Forum from "./pages/Forum";
import AIAssistant from "./pages/AIAssistant";
import NotFound from "./pages/NotFound";
import ProfessorsPage from "./pages/Professors";
import ProfessorProfilePage from "./pages/Professor";
import Footer from "./components/ui/footer";
import ChatbotProvider from "./components/chatbot/chatbot-provider";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ChatbotProvider />
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/housing" element={<Housing />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/professors" element={<ProfessorsPage />} />
          <Route path = "/professors/:id" element={<ProfessorProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
