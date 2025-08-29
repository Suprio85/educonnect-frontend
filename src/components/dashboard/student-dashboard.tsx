import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  GraduationCap,
  BookOpen,
  Home,
  MessageSquare,
  TrendingUp,
  Calendar,
  MapPin,
  Clock,
  Star,
  ArrowRight,
} from "lucide-react"

export default function StudentDashboard({ user }) {
  // Mock data - in real app this would come from API
  const stats = {
    applications: 12,
    scholarships: 45,
    savedOpportunities: 8,
    forumPosts: 23,
  }

  const recentApplications = [
    {
      id: 1,
      title: "Full Scholarship - Computer Science",
      university: "University of Toronto",
      status: "under_review",
      deadline: "2024-03-15",
      country: "Canada",
    },
    {
      id: 2,
      title: "Research Assistant Position",
      university: "MIT",
      status: "pending",
      deadline: "2024-02-28",
      country: "USA",
    },
    {
      id: 3,
      title: "PhD in Data Science",
      university: "Oxford University",
      status: "accepted",
      deadline: "2024-01-30",
      country: "UK",
    },
  ]

  const recommendedOpportunities = [
    {
      id: 1,
      title: "AI Research Scholarship",
      university: "Stanford University",
      amount: "$50,000",
      deadline: "2024-04-15",
      match: 95,
    },
    {
      id: 2,
      title: "Software Engineering Internship",
      company: "Google",
      amount: "$8,000/month",
      deadline: "2024-03-20",
      match: 88,
    },
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800"
      case "under_review":
        return "bg-yellow-100 text-yellow-800"
      case "pending":
        return "bg-blue-100 text-blue-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case "accepted":
        return "Accepted"
      case "under_review":
        return "Under Review"
      case "pending":
        return "Pending"
      case "rejected":
        return "Rejected"
      default:
        return "Unknown"
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6  lg:px-8 py-20">
      <div className="mb-8">
        <h1 className="font-heading font-black text-3xl text-foreground mb-2">Welcome back, {user.name}!</h1>
        <p className="text-muted-foreground">
          Track your applications, discover new opportunities, and connect with the community.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-accent/10 rounded-lg">
                <BookOpen className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.applications}</p>
                <p className="text-xs text-muted-foreground">Applications</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-accent/10 rounded-lg">
                <GraduationCap className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.scholarships}</p>
                <p className="text-xs text-muted-foreground">Scholarships</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Star className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.savedOpportunities}</p>
                <p className="text-xs text-muted-foreground">Saved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-accent/10 rounded-lg">
                <MessageSquare className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.forumPosts}</p>
                <p className="text-xs text-muted-foreground">Forum Posts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Applications */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Recent Applications
                <Button variant="ghost" size="sm">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{app.title}</h4>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <GraduationCap className="h-3 w-3 mr-1" />
                          {app.university}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {app.country}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {app.deadline}
                        </span>
                      </div>
                    </div>
                    <Badge className={getStatusColor(app.status)}>{getStatusText(app.status)}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recommended Opportunities */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-accent" />
                <span>Recommended for You</span>
              </CardTitle>
              <CardDescription>AI-powered suggestions based on your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendedOpportunities.map((opp) => (
                  <div key={opp.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm">{opp.title}</h4>
                      <div className="flex items-center space-x-1">
                        <Star className="h-3 w-3 text-yellow-500 fill-current" />
                        <span className="text-xs text-muted-foreground">{opp.match}%</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mb-2">{opp.university || opp.company}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-accent">{opp.amount}</span>
                      <span className="text-xs text-muted-foreground flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {opp.deadline}
                      </span>
                    </div>
                    <Progress value={opp.match} className="mt-2 h-1" />
                  </div>
                ))}
                <Button className="w-full bg-accent hover:bg-accent/90" size="sm">
                  View More Opportunities
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="font-heading font-bold text-xl mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
            <BookOpen className="h-6 w-6" />
            <span>Browse Scholarships</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
            <Home className="h-6 w-6" />
            <span>Find Housing</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
            <MessageSquare className="h-6 w-6" />
            <span>Join Forum</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
            <GraduationCap className="h-6 w-6" />
            <span>Research Opportunities</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
