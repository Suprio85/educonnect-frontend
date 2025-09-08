import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ChatbotProvider from "./components/chatbot/chatbot-provider";
import Navigation from "./components/Navigation";
import Footer from "./components/ui/footer";
import { AuthProvider } from "./context/auth-context";
import Analytics from "./pages/admin/Analytics";
import ForumModeration from "./pages/admin/ForumModeration";
import HousingManagement from "./pages/admin/HousingManagement";
import ProfessorManagement from "./pages/admin/ProfessorManagement";
import AdminUniversityManagement from "./pages/admin/UniversityManagement";
import UserManagement from "./pages/admin/UserManagement";
import AIAssistant from "./pages/AIAssistant";
import DashboardPage from "./pages/Dashboard";
import Forum from "./pages/Forum";
import Housing from "./pages/Housing";
import Index from "./pages/Index";
import Login from "./pages/login/Login";
import Signup from "./pages/login/Signup";
import NotFound from "./pages/NotFound";
import ProfessorProfilePage from "./pages/professor/Professor";
import ProfessorsPage from "./pages/professor/Professors";
import ScholarshipDetailPage from "./pages/scholarship/Scholarship";
import Scholarships from "./pages/scholarship/Scholarships";
import StudentProfileSetup from "./pages/StudentProfileSetup";
import UniversitiesManagement from "./pages/UniversityManagement";
;


const queryClient = new QueryClient();

const App = () => (

  <QueryClientProvider client={queryClient}>
    <ChatbotProvider />
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/scholarships/:id" element={<ScholarshipDetailPage />} />
          <Route path="/housing" element={<Housing />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/professors" element={<ProfessorsPage />} />
          <Route path = "/professors/:id" element={<ProfessorProfilePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/student-profile-setup" element={<StudentProfileSetup />} />
          <Route path="/university-management" element={<UniversitiesManagement />} />
          <Route path="/admin/university-management" element={<AdminUniversityManagement />} />
          <Route path="/admin/professor-management" element={<ProfessorManagement />} />
          <Route path="/admin/housing-management" element={<HousingManagement />} />
          <Route path="/admin/user-management" element={<UserManagement />} />
          <Route path="/admin/forum-moderation" element={<ForumModeration />} />
          <Route path="/admin/analytics" element={<Analytics />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
