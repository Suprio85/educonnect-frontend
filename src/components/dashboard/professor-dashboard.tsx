"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, BookOpen, Plus, Calendar, ArrowRight, FlaskConical, GraduationCap, Mail } from "lucide-react"
import { useState } from "react"
import ProfessorProfileForm from "@/components/form/professor-form"

export default function ProfessorDashboard({ user }) {
  // Mock data - in real app this would come from API
  const stats = {
    activePositions: 5,
    applications: 89,
    currentStudents: 12,
    publications: 24,
  }

  const positions = [
    {
      id: 1,
      title: "PhD Research Assistant - Machine Learning",
      applications: 23,
      deadline: "2024-03-20",
      type: "PhD",
      status: "active",
    },
    {
      id: 2,
      title: "Master's Thesis Supervision - NLP",
      applications: 15,
      deadline: "2024-02-28",
      type: "Masters",
      status: "active",
    },
    {
      id: 3,
      title: "Undergraduate Research Intern",
      applications: 31,
      deadline: "2024-04-15",
      type: "Undergraduate",
      status: "draft",
    },
  ]

  const recentApplications = [
    {
      id: 1,
      studentName: "Sarah Ahmed",
      position: "PhD Research Assistant",
      appliedDate: "2024-01-15",
      status: "under_review",
      degree: "MS Computer Science",
    },
    {
      id: 2,
      studentName: "Omar Hassan",
      position: "Master's Thesis Supervision",
      appliedDate: "2024-01-14",
      status: "interview_scheduled",
      degree: "BS Software Engineering",
    },
    {
      id: 3,
      studentName: "Nadia Khan",
      position: "Research Intern",
      appliedDate: "2024-01-13",
      status: "accepted",
      degree: "BS Computer Science",
    },
  ]

  const currentStudents = [
    {
      id: 1,
      name: "Ali Rahman",
      program: "PhD",
      year: "2nd Year",
      research: "Deep Learning for NLP",
    },
    {
      id: 2,
      name: "Fatima Begum",
      program: "Masters",
      year: "1st Year",
      research: "Computer Vision",
    },
    {
      id: 3,
      name: "Hassan Ali",
      program: "PhD",
      year: "3rd Year",
      research: "Reinforcement Learning",
    },
  ]

  const [showProfileForm, setShowProfileForm] = useState(false)

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "draft":
        return "bg-yellow-100 text-yellow-800"
      case "closed":
        return "bg-red-100 text-red-800"
      case "accepted":
        return "bg-green-100 text-green-800"
      case "under_review":
        return "bg-yellow-100 text-yellow-800"
      case "interview_scheduled":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleProfileUpdate = (profileData) => {
    console.log("Profile updated:", profileData)
    // In real app, this would call API to update profile
    setShowProfileForm(false)
  }

  if (showProfileForm) {
    return (
      <ProfessorProfileForm professor={user} onSave={handleProfileUpdate} onCancel={() => setShowProfileForm(false)} />
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="font-heading font-black text-3xl text-foreground mb-2">Professor Dashboard</h1>
        <p className="text-muted-foreground">Manage research positions, supervise students, and track applications.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-accent/10 rounded-lg">
                <FlaskConical className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.activePositions}</p>
                <p className="text-xs text-muted-foreground">Active Positions</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-accent/10 rounded-lg">
                <Users className="h-4 w-4 text-accent" />
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
                <p className="text-2xl font-bold">{stats.currentStudents}</p>
                <p className="text-xs text-muted-foreground">Current Students</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-accent/10 rounded-lg">
                <BookOpen className="h-4 w-4 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.publications}</p>
                <p className="text-xs text-muted-foreground">Publications</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Research Positions */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Research Positions
                <Button size="sm" className="bg-accent hover:bg-accent/90">
                  <Plus className="mr-1 h-4 w-4" />
                  New Position
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {positions.map((position) => (
                  <div
                    key={position.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm">{position.title}</h4>
                      <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          {position.applications} applications
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {position.deadline}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {position.type}
                        </Badge>
                      </div>
                    </div>
                    <Badge className={getStatusColor(position.status)}>{position.status}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Current Students */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Current Students</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {currentStudents.map((student) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg"
                  >
                    <div>
                      <h4 className="font-semibold text-sm">{student.name}</h4>
                      <p className="text-xs text-muted-foreground">
                        {student.program} • {student.year} • {student.research}
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Mail className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Applications */}
        <div>
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
                  <div key={app.id} className="p-3 border border-border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-sm">{app.studentName}</h4>
                      <Badge className={getStatusColor(app.status)}>
                        {app.status.replace("_", " ")}
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground mb-1">{app.position}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{app.degree}</span>
                      <span>{app.appliedDate}</span>
                    </div>
                  </div>
                ))}
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
            <Plus className="h-6 w-6" />
            <span>Post Position</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
            <Users className="h-6 w-6" />
            <span>Review Applications</span>
          </Button>
          <Button variant="outline" className="h-20 flex-col space-y-2 bg-transparent">
            <Mail className="h-6 w-6" />
            <span>Message Students</span>
          </Button>
          <Button
            variant="outline"
            className="h-20 flex-col space-y-2 bg-transparent"
            onClick={() => setShowProfileForm(true)}
          >
            <BookOpen className="h-6 w-6" />
            <span>Update Profile</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
