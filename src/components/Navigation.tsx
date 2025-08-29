import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Search, Menu, X, GraduationCap, Users, Home, MessageSquare, Bot } from "lucide-react"
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth"
import UserMenu from "@/components/auth/user-menu"

const handleOpenChatbot = () => {
    window.dispatchEvent(new CustomEvent("openChatbot"))
  }

const Navigation = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const [authMode, setAuthMode] = useState("login");

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <GraduationCap className="h-8 w-8 text-primary" />
            <span className="ml-2 text-xl font-bold text-primary">
              EduConnect
            </span>
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

            <Button
              variant="ghost"
              className="flex items-center space-x-1"
              asChild
            >
              <Link to="/housing">
                <Home className="h-4 w-4" />
                <span>Housing</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="flex items-center space-x-1"
              asChild
            >
              <Link to="/forum">
                <MessageSquare className="h-4 w-4" />
                <span>Forum</span>
              </Link>
            </Button>

            <Button
              variant="ghost"
              className="flex items-center space-x-1"
              onClick={handleOpenChatbot}
            >
              <Bot className="h-4 w-4" />
              <span>SmartEduBot</span>
            </Button>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <UserMenu />
            ) : (
              <>
                <Button variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button asChild>
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
        <div className="md:hidden absolute right-4 top-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col space-y-4">
                <Button variant="ghost" className="justify-start">
                  For Students
                </Button>
                <Button variant="ghost" className="justify-start">
                  For Institutions
                </Button>
                <Button variant="ghost" className="justify-start" asChild onClick={() => setIsMenuOpen(false)}>
                  <Link to="/professors">Find Professors</Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild onClick={() => setIsMenuOpen(false)}>
                  <Link to="/housing">Housing</Link>
                </Button>
                <Button variant="ghost" className="justify-start" asChild onClick={() => setIsMenuOpen(false)}>
                  <Link to="/forum">Forum</Link>
                </Button>
                <Button variant="ghost" className="justify-start" onClick={handleOpenChatbot}>
                  SmartEduBot
                </Button>
                {isAuthenticated ? (
                  <div className="pt-4 border-t border-border">
                    <UserMenu />
                  </div>
                ) : (
                  <div className="flex space-x-2 pt-4">
                    <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setIsMenuOpen(false)}>
                      <Link to="/login">Sign In</Link>
                    </Button>
                    <Button className="flex-1 bg-accent " onClick={() => setIsMenuOpen(false)}>
                      <Link to="/signup">Sign Up</Link>
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
    </nav>
  );
};

export default Navigation;