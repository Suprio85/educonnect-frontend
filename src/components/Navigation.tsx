import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Search, Menu, X, GraduationCap, Users, Home, MessageSquare, Bot } from "lucide-react"
import { Link } from "react-router-dom";

  const handleOpenChatbot = () => {
    window.dispatchEvent(new CustomEvent("openChatbot"))
  }

const Navigation = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-primary">EduConnect</span>
          </Link>
           <div className="hidden md:flex items-center space-x-8">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>For Students</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link to="/scholarships">Scholarships</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/professors">Find Professors</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/housing">Housing</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/forum">Forum</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-1">
                    <GraduationCap className="h-4 w-4" />
                    <span>For Institutions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Post Scholarships</DropdownMenuItem>
                  <DropdownMenuItem>Find Students</DropdownMenuItem>
                  <DropdownMenuItem>Analytics</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" className="flex items-center space-x-1" asChild>
                <Link to="/housing">
                  <Home className="h-4 w-4" />
                  <span>Housing</span>
                </Link>
              </Button>

              <Button variant="ghost" className="flex items-center space-x-1" asChild>
                <Link to="/forum">
                  <MessageSquare className="h-4 w-4" />
                  <span>Forum</span>
                </Link>
              </Button>

              <Button variant="ghost" className="flex items-center space-x-1" onClick={handleOpenChatbot}>
                  <Bot className="h-4 w-4" />
                  <span>SmartEduBot</span>
              </Button>
            </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" asChild>
              <Link to="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;