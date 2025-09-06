"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    BarChart3,
    Building2,
    Calendar,
    Download,
    MessageSquare,
    TrendingDown,
    TrendingUp,
    Users
} from "lucide-react"
import { useState } from "react"

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  // Mock analytics data - in real app this would come from API
  const analyticsData = {
    overview: {
      totalUsers: 12450,
      userGrowth: 12.5,
      totalPosts: 8934,
      postGrowth: 18.3,
      totalUniversities: 89,
      universityGrowth: 5.2,
      activeUsers: 8765,
      activeGrowth: 15.7,
    },
    userActivity: [
      { date: "2024-01-01", users: 1200, posts: 450, discussions: 123 },
      { date: "2024-01-08", users: 1350, posts: 523, discussions: 145 },
      { date: "2024-01-15", users: 1450, posts: 678, discussions: 167 },
      { date: "2024-01-22", users: 1623, posts: 734, discussions: 189 },
      { date: "2024-01-29", users: 1789, posts: 823, discussions: 201 },
    ],
    topUniversities: [
      { name: "Harvard University", users: 1234, posts: 2345, growth: 15.2 },
      { name: "MIT", users: 1123, posts: 1987, growth: 12.8 },
      { name: "Stanford University", users: 987, posts: 1756, growth: 18.5 },
      { name: "UC Berkeley", users: 876, posts: 1543, growth: 10.3 },
      { name: "Yale University", users: 754, posts: 1234, growth: 8.7 },
    ],
    topCategories: [
      { name: "Computer Science", posts: 2345, discussions: 567, engagement: 89.2 },
      { name: "Mathematics", posts: 1876, discussions: 432, engagement: 76.5 },
      { name: "Physics", posts: 1654, discussions: 378, engagement: 82.1 },
      { name: "Engineering", posts: 1432, discussions: 321, engagement: 74.8 },
      { name: "Business", posts: 1234, discussions: 289, engagement: 71.3 },
    ],
    userEngagement: {
      dailyActiveUsers: 3456,
      weeklyActiveUsers: 8765,
      monthlyActiveUsers: 12450,
      avgSessionDuration: "24m 35s",
      avgPostsPerUser: 2.3,
      avgResponseTime: "3h 45m",
    },
  }

  const periods = [
    { key: "week", label: "Last Week" },
    { key: "month", label: "Last Month" },
    { key: "quarter", label: "Last Quarter" },
    { key: "year", label: "Last Year" },
  ]

  const formatGrowth = (growth) => {
    const isPositive = growth > 0
    return (
      <span className={isPositive ? "text-green-600" : "text-red-600"}>
        {isPositive ? <TrendingUp className="h-3 w-3 inline mr-1" /> : <TrendingDown className="h-3 w-3 inline mr-1" />}
        {Math.abs(growth)}%
      </span>
    )
  }

  const exportData = () => {
    alert("Analytics data exported successfully!")
  }

  return (
    <div className="max-w-7xl mx-auto my-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 mt-20">
        <div>
          <h1 className="font-heading font-black text-3xl text-foreground mb-2">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Platform performance metrics and insights.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-input rounded-md bg-background"
            >
              {periods.map((period) => (
                <option key={period.key} value={period.key}>
                  {period.label}
                </option>
              ))}
            </select>
          </div>
          <Button onClick={exportData}>
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {formatGrowth(analyticsData.overview.userGrowth)} from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.totalPosts.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {formatGrowth(analyticsData.overview.postGrowth)} from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Universities</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.totalUniversities}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {formatGrowth(analyticsData.overview.universityGrowth)} from last period
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.overview.activeUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              {formatGrowth(analyticsData.overview.activeGrowth)} from last period
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Activity Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              User Activity Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-muted-foreground/20 rounded-lg">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">Activity Chart Placeholder</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Integration with charting library required
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Engagement Metrics */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">Daily Active Users</span>
                <span className="text-2xl font-bold">{analyticsData.userEngagement.dailyActiveUsers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">Weekly Active Users</span>
                <span className="text-2xl font-bold">{analyticsData.userEngagement.weeklyActiveUsers.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                <span className="font-medium">Monthly Active Users</span>
                <span className="text-2xl font-bold">{analyticsData.userEngagement.monthlyActiveUsers.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-bold">{analyticsData.userEngagement.avgSessionDuration}</div>
                  <div className="text-sm text-muted-foreground">Avg Session</div>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <div className="text-lg font-bold">{analyticsData.userEngagement.avgPostsPerUser}</div>
                  <div className="text-sm text-muted-foreground">Posts/User</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Universities */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Top Universities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topUniversities.map((university, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{university.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {university.users.toLocaleString()} users • {university.posts.toLocaleString()} posts
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="mb-1">
                      #{index + 1}
                    </Badge>
                    <div className="text-xs">
                      {formatGrowth(university.growth)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Categories */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Top Discussion Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData.topCategories.map((category, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{category.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {category.posts.toLocaleString()} posts • {category.discussions.toLocaleString()} discussions
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{category.engagement}%</div>
                    <div className="text-xs text-muted-foreground">Engagement</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
