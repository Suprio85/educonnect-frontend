"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Send, Minimize2, Maximize2, X, GraduationCap, FileText, MapPin, DollarSign, Sparkles } from "lucide-react"

const quickActions = [
  {
    id: "scholarships",
    label: "Find Scholarships",
    icon: GraduationCap,
    prompt: "Help me find scholarships for my field of study",
  },
  {
    id: "visa",
    label: "Visa Guidance",
    icon: FileText,
    prompt: "I need help with visa application process",
  },
  {
    id: "universities",
    label: "University Matching",
    icon: MapPin,
    prompt: "Recommend universities based on my profile",
  },
  {
    id: "costs",
    label: "Living Costs",
    icon: DollarSign,
    prompt: "What are the living costs in different countries?",
  },
]

const botResponses = {
  scholarships: {
    response:
      "I'd be happy to help you find scholarships! To provide the best recommendations, I need to know:\n\n• Your field of study\n• Preferred countries\n• Academic level (Bachelor's, Master's, PhD)\n• Your GPA or academic performance\n• Any specific requirements or preferences\n\nBased on your profile, I can suggest relevant scholarships from our database of 500+ opportunities. Would you like to start by telling me your field of study?",
    followUp: ["Computer Science scholarships", "Engineering funding", "Business school scholarships"],
  },
  visa: {
    response:
      "Visa applications can be complex, but I'm here to guide you through the process! Here's what I can help with:\n\n🎯 **Student Visa Requirements**\n• Document checklists for different countries\n• Application timelines and deadlines\n• Financial requirements and proof of funds\n\n📋 **Application Process**\n• Step-by-step guidance\n• Common mistakes to avoid\n• Interview preparation tips\n\nWhich country are you planning to study in? This will help me provide specific visa guidance.",
    followUp: ["USA F-1 visa", "UK student visa", "Canada study permit", "Australia student visa"],
  },
  universities: {
    response:
      "I can help match you with the perfect universities! My recommendations consider:\n\n🎓 **Academic Fit**\n• Program rankings and reputation\n• Research opportunities\n• Faculty expertise in your field\n\n🌍 **Practical Factors**\n• Tuition costs and financial aid\n• Location and campus life\n• Career services and job placement rates\n\nTo get started, please share:\n• Your intended major\n• Preferred countries/regions\n• Budget range\n• Any specific preferences (research focus, campus size, etc.)",
    followUp: ["Top CS universities", "Affordable MBA programs", "Research universities"],
  },
  costs: {
    response:
      "Living costs vary significantly by country and city. Here's a breakdown of popular study destinations:\n\n💰 **Monthly Living Costs (USD)**\n\n🇺🇸 **USA**: $1,200-2,500\n• Major cities: $2,000-2,500\n• Smaller cities: $1,200-1,800\n\n🇨🇦 **Canada**: $1,000-2,000\n• Toronto/Vancouver: $1,800-2,000\n• Other cities: $1,000-1,500\n\n🇬🇧 **UK**: $1,300-2,200\n• London: $2,000-2,200\n• Other cities: $1,300-1,700\n\n🇦🇺 **Australia**: $1,400-2,100\n• Sydney/Melbourne: $1,800-2,100\n• Other cities: $1,400-1,700\n\nWould you like detailed cost breakdowns for a specific country or city?",
    followUp: ["Cost breakdown for Toronto", "Cheapest study destinations", "Budgeting tips for students"],
  },
}

export default function SmartEduBot({ isOpen, onClose, onMinimize, isMinimized }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "bot",
      content:
        "Hi! I'm SmartEduBot, your AI assistant for studying abroad. I can help you with scholarships, visa guidance, university recommendations, and more. How can I assist you today?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      })
    }, 100)
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSendMessage = async (message = inputMessage) => {
    if (!message.trim()) return

    const userMessage = {
      id: Date.now(),
      type: "user",
      content: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse = generateBotResponse(message)
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const generateBotResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()

    let response = "I understand you're looking for guidance. Let me help you with that!"
    let followUp = []

    // Simple keyword matching for demo purposes
    if (lowerMessage.includes("scholarship") || lowerMessage.includes("funding")) {
      response = botResponses.scholarships.response
      followUp = botResponses.scholarships.followUp
    } else if (lowerMessage.includes("visa") || lowerMessage.includes("immigration")) {
      response = botResponses.visa.response
      followUp = botResponses.visa.followUp
    } else if (
      lowerMessage.includes("university") ||
      lowerMessage.includes("college") ||
      lowerMessage.includes("recommend")
    ) {
      response = botResponses.universities.response
      followUp = botResponses.universities.followUp
    } else if (lowerMessage.includes("cost") || lowerMessage.includes("budget") || lowerMessage.includes("expensive")) {
      response = botResponses.costs.response
      followUp = botResponses.costs.followUp
    } else if (lowerMessage.includes("sop") || lowerMessage.includes("statement of purpose")) {
      response =
        "I can help you write a compelling Statement of Purpose! Here are key elements:\n\n✍️ **Structure**\n• Introduction with your goals\n• Academic background and achievements\n• Relevant experience and skills\n• Why this program/university\n• Future career plans\n\n💡 **Tips**\n• Be specific and personal\n• Show passion for your field\n• Connect your past to your future goals\n• Keep it concise (1-2 pages)\n\nWould you like me to review your draft or help with a specific section?"
      followUp = ["SOP examples", "Common SOP mistakes", "How to start my SOP"]
    }

    return {
      id: Date.now() + 1,
      type: "bot",
      content: response,
      timestamp: new Date(),
      followUp: followUp,
    }
  }

  const handleQuickAction = (action) => {
    handleSendMessage(action.prompt)
  }

  const handleFollowUp = (followUpText) => {
    handleSendMessage(followUpText)
  }

  if (!isOpen) return null

  return  (
    <div
      className={`
        fixed z-50 transition-all duration-300
        ${isMinimized ? "h-16" : "h-full sm:h-[600px]"}
        ${isMinimized ? "w-full sm:w-80" : "w-full sm:w-96"}
        ${isMinimized ? "bottom-0 right-0" : "inset-0 sm:bottom-4 sm:right-4 sm:inset-auto"}
      `}
    >
      <Card className="h-full shadow-2xl border-2 border-indigo-200 ">
        {/* Header */}
        <CardHeader className="pb-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-t-lg ">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold">SmartEduBot</CardTitle>
                <p className="text-xs text-indigo-100">AI Study Abroad Assistant</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={onMinimize} className="text-white hover:bg-white/20 w-8 h-8 p-0">
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-white/20 w-8 h-8 p-0">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-[calc(100%-80px)]">
            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="p-4 bg-gray-50 border-b">
                <p className="text-sm text-gray-600 mb-3">Quick actions to get started:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action) => {
                    const IconComponent = action.icon
                    return (
                      <Button
                        key={action.id}
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuickAction(action)}
                        className="flex items-center gap-2 h-auto p-2 text-xs"
                      >
                        <IconComponent className="w-3 h-3" />
                        {action.label}
                      </Button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Messages */}
            <ScrollArea className="flex-1 p-4 max-h-full sm:max-h-[400px]">
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`flex gap-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <Avatar className="w-8 h-8 flex-shrink-0">
                        {message.type === "bot" ? (
                          <div className="w-full h-full bg-indigo-600 flex items-center justify-center">
                            <Bot className="w-4 h-4 text-white" />
                          </div>
                        ) : (
                          <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">U</span>
                          </div>
                        )}
                      </Avatar>
                      <div className={`rounded-lg p-3 ${message.type === "user" ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-900"}`}>
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex gap-2 max-w-[80%]">
                      <Avatar className="w-8 h-8">
                        <div className="w-full h-full bg-indigo-600 flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      </Avatar>
                      <div className="bg-gray-100 rounded-lg p-3">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} className="h-1" />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything about studying abroad..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1"
                />
                <Button onClick={() => handleSendMessage()} disabled={!inputMessage.trim() || isTyping} className="bg-indigo-600 hover:bg-indigo-700">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                <Sparkles className="w-3 h-3 inline mr-1" />
                Powered by AI • Available 24/7
              </p>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
