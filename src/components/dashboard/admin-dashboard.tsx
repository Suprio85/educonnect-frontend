import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    AlertCircle,
    ArrowRight,
    BarChart3,
    Building2,
    Eye,
    GraduationCap,
    Home,
    MessageSquare,
    Settings,
    TrendingUp,
    Users
} from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AdminDashboard({user}) {
  const navigate = useNavigate()
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  // Mock data - in real app this would come from API
  const stats = {
    totalUsers: 12450,
    totalProfessors: 340,
    totalUniversities: 89,
    activeDiscussions: 1230,
    newApplications: 45,
    pendingApprovals: 23
  }

  const recentActivities = [
    {
      id: 1,
      type: "university",
      title: "Harvard University profile updated",
      time: "2 hours ago",
      status: "success"
    },
    {
      id: 2,
      type: "user",
      title: "New professor application from Dr. Smith",
      time: "4 hours ago",
      status: "pending"
    },
    {
      id: 3,
      type: "discussion",
      title: "High activity in Computer Science forum",
      time: "6 hours ago",
      status: "info"
    },
    {
      id: 4,
      type: "university",
      title: "MIT added new departments",
      time: "1 day ago",
      status: "success"
    }
  ]

  const quickActions = [
    {
      title: "University Management",
      description: "Manage university profiles and information",
      icon: Building2,
      action: () => navigate("/admin/university-management"),
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "Professor Management",
      description: "Add and manage professor profiles",
      icon: GraduationCap,
      action: () => navigate("/admin/professor-management"),
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "User Management",
      description: "Manage students and users",
      icon: Users,
      action: () => navigate("/admin/user-management"),
      color: "bg-emerald-500 hover:bg-emerald-600"
    },
    {
      title: "Housing Management",
      description: "Manage housing listings and requests",
      icon: Home,
      action: () => navigate("/admin/housing-management"),
      color: "bg-indigo-500 hover:bg-indigo-600"
    },
    {
      title: "Forum Moderation",
      description: "Monitor and moderate discussions",
      icon: MessageSquare,
      action: () => navigate("/admin/forum-moderation"),
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      title: "Analytics",
      description: "View platform analytics and reports",
      icon: BarChart3,
      action: () => navigate("/admin/analytics"),
      color: "bg-orange-500 hover:bg-orange-600"
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "info":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case "university":
        return Building2
      case "user":
        return Users
      case "discussion":
        return MessageSquare
      default:
        return AlertCircle
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 mt-20">
        <h1 className="font-heading font-black text-3xl text-foreground mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's what's happening on your platform.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Professors</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalProfessors.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Universities</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUniversities}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+3</span> new this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Discussions</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeDiscussions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+18%</span> from last week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">
              Requires your attention
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+15.2%</div>
            <p className="text-xs text-muted-foreground">
              Monthly active users
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                className="h-auto p-4 flex flex-col items-start space-y-2 hover:shadow-md transition-all"
                onClick={action.action}
              >
                <div className={`p-2 rounded-lg ${action.color} text-white`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-sm">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground self-end" />
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities and University Management Highlight */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const IconComponent = getActivityIcon(activity.type)
                return (
                  <div key={activity.id} className="flex items-center space-x-3 p-3 rounded-lg border">
                    <div className="flex-shrink-0">
                      <IconComponent className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                    <Badge className={getStatusColor(activity.status)} variant="secondary">
                      {activity.status}
                    </Badge>
                  </div>
                )
              })}
            </div>
            <Button variant="outline" className="w-full mt-4">
              <Eye className="h-4 w-4 mr-2" />
              View All Activities
            </Button>
          </CardContent>
        </Card>

        {/* University Management Highlight */}
        <Card className="border-blue-200 bg-blue-50/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-900">
              <Building2 className="h-5 w-5" />
              University Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-sm text-blue-800">
                <p className="mb-2">Manage all university profiles, information, and settings from one central location.</p>
                <ul className="space-y-1 text-xs">
                  <li>• Add new universities to the platform</li>
                  <li>• Update existing university information</li>
                  <li>• Manage departments and programs</li>
                  <li>• Monitor university activity and statistics</li>
                </ul>
              </div>
              
              <div className="grid grid-cols-2 gap-4 my-4">
                <div className="text-center p-3 bg-white rounded-lg border">
                  <div className="text-2xl font-bold text-blue-600">{stats.totalUniversities}</div>
                  <div className="text-xs text-muted-foreground">Total Universities</div>
                </div>
                <div className="text-center p-3 bg-white rounded-lg border">
                  <div className="text-2xl font-bold text-green-600">95%</div>
                  <div className="text-xs text-muted-foreground">Profile Completion</div>
                </div>
              </div>

              <div className="space-y-2">
                <Button 
                  onClick={() => navigate("/admin/university-management")}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  <Building2 className="h-4 w-4 mr-2" />
                  Go to University Management
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}