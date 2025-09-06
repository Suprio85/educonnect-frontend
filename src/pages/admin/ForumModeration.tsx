"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AlertTriangle, CheckCircle, Eye, Flag, MessageSquare, Search, Trash2, XCircle } from "lucide-react"
import { useState } from "react"

export default function ForumModeration() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("reported")

  // Mock data - in real app this would come from API
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Help with React Hooks - useState not working",
      author: "Alice Johnson",
      university: "Harvard University",
      content: "I'm having trouble with useState in my React project. The state doesn't seem to update...",
      category: "Computer Science",
      reports: 2,
      reportReasons: ["Spam", "Off-topic"],
      status: "reported",
      datePosted: "2024-02-01",
      replies: 5,
      views: 45,
    },
    {
      id: 2,
      title: "Inappropriate content in discussion",
      author: "Bob Smith",
      university: "MIT",
      content: "This post contains inappropriate language and content that violates community guidelines...",
      category: "General Discussion",
      reports: 5,
      reportReasons: ["Inappropriate Content", "Harassment", "Spam"],
      status: "reported",
      datePosted: "2024-01-30",
      replies: 12,
      views: 89,
    },
    {
      id: 3,
      title: "Math help - Linear Algebra question",
      author: "Carol Wilson",
      university: "Stanford University",
      content: "Can someone help me understand eigenvalues and eigenvectors? I'm struggling with...",
      category: "Mathematics",
      reports: 0,
      reportReasons: [],
      status: "approved",
      datePosted: "2024-01-28",
      replies: 8,
      views: 156,
    },
    {
      id: 4,
      title: "Spam post with external links",
      author: "David Chen",
      university: "UC Berkeley",
      content: "Check out this amazing deal! Visit www.suspicious-site.com for more information...",
      category: "General Discussion",
      reports: 8,
      reportReasons: ["Spam", "External Links", "Commercial"],
      status: "removed",
      datePosted: "2024-01-25",
      replies: 2,
      views: 23,
    },
  ])

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesTab = selectedTab === "all" || post.status === selectedTab
    
    return matchesSearch && matchesTab
  })

  const handleApprovePost = (id) => {
    setPosts((prev) =>
      prev.map((post) => (post.id === id ? { ...post, status: "approved" } : post))
    )
  }

  const handleRemovePost = (id) => {
    if (confirm("Are you sure you want to remove this post?")) {
      setPosts((prev) =>
        prev.map((post) => (post.id === id ? { ...post, status: "removed" } : post))
      )
    }
  }

  const handleDeletePost = (id) => {
    if (confirm("Are you sure you want to permanently delete this post?")) {
      setPosts((prev) => prev.filter((post) => post.id !== id))
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800"
      case "reported":
        return "bg-yellow-100 text-yellow-800"
      case "removed":
        return "bg-red-100 text-red-800"
      case "pending":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getReportSeverity = (reportCount) => {
    if (reportCount >= 5) return "high"
    if (reportCount >= 3) return "medium"
    if (reportCount >= 1) return "low"
    return "none"
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-orange-100 text-orange-800"
      case "low":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const moderationStats = {
    total: posts.length,
    reported: posts.filter(p => p.status === "reported").length,
    approved: posts.filter(p => p.status === "approved").length,
    removed: posts.filter(p => p.status === "removed").length,
    pending: posts.filter(p => p.status === "pending").length,
  }

  return (
    <div className="max-w-7xl mx-auto my-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 mt-20">
        <h1 className="font-heading font-black text-3xl text-foreground mb-2">Forum Moderation</h1>
        <p className="text-muted-foreground">Monitor and moderate forum discussions, reports, and content.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{moderationStats.total}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reported</CardTitle>
            <Flag className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{moderationStats.reported}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{moderationStats.approved}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Removed</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{moderationStats.removed}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <AlertTriangle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{moderationStats.pending}</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6">
        {[
          { key: "reported", label: "Reported Posts", count: moderationStats.reported },
          { key: "all", label: "All Posts", count: moderationStats.total },
          { key: "approved", label: "Approved", count: moderationStats.approved },
          { key: "removed", label: "Removed", count: moderationStats.removed },
        ].map((tab) => (
          <Button
            key={tab.key}
            variant={selectedTab === tab.key ? "default" : "outline"}
            onClick={() => setSelectedTab(tab.key)}
            className="relative"
          >
            {tab.label}
            {tab.count > 0 && (
              <Badge variant="secondary" className="ml-2 text-xs">
                {tab.count}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts by title, author, or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts List */}
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="font-semibold text-lg">{post.title}</h3>
                    <Badge className={getStatusColor(post.status)}>{post.status}</Badge>
                    {post.reports > 0 && (
                      <Badge className={getSeverityColor(getReportSeverity(post.reports))}>
                        {post.reports} report{post.reports !== 1 ? 's' : ''}
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <span>By {post.author}</span>
                    <span>{post.university}</span>
                    <span>{post.category}</span>
                    <span>{new Date(post.datePosted).toLocaleDateString()}</span>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {post.content}
                  </p>

                  <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                    <span>{post.replies} replies</span>
                    <span>{post.views} views</span>
                  </div>

                  {post.reportReasons.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-red-600 mb-2">Report Reasons:</p>
                      <div className="flex flex-wrap gap-2">
                        {post.reportReasons.map((reason, index) => (
                          <Badge key={index} variant="destructive" className="text-xs">
                            {reason}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" title="View Post">
                    <Eye className="h-4 w-4" />
                  </Button>
                  
                  {post.status === "reported" && (
                    <>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleApprovePost(post.id)}
                        className="text-green-600 hover:text-green-700"
                        title="Approve Post"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRemovePost(post.id)}
                        className="text-orange-600 hover:text-orange-700"
                        title="Remove Post"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDeletePost(post.id)}
                    className="text-red-600 hover:text-red-700"
                    title="Delete Post"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No posts found matching your search criteria.</p>
        </div>
      )}
    </div>
  )
}
