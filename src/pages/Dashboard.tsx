import { useAuth } from "@/hooks/useAuth"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import StudentDashboard from "@/components/dashboard/student-dashboard"
import ProfessorDashboard from "@/components/dashboard/professor-dashboard"
import Navigation from "@/components/Navigation"

export default function DashboardPage() {
  const { user, isAuthenticated, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      navigate("/")
    }
  }, [isAuthenticated, loading, navigate])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  const renderDashboard = () => {
    switch (user.userType) {
      case "student":
        return <StudentDashboard user={user} />
      case "professor":
        return <ProfessorDashboard user={user} />
      default:
        return <StudentDashboard user={user} />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {renderDashboard()}
    </div>
  )
}
