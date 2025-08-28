import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, Send, Sparkles, GraduationCap, FileText, MapPin, DollarSign } from "lucide-react";

const AIAssistant = () => {
  const quickActions = [
    {
      icon: GraduationCap,
      title: "Find Scholarships",
      description: "Get personalized scholarship recommendations",
      prompt: "Help me find scholarships for Computer Science in Canada"
    },
    {
      icon: FileText,
      title: "SOP Writing Help",
      description: "Get guidance on writing your Statement of Purpose",
      prompt: "Help me write a strong SOP for my MBA application"
    },
    {
      icon: MapPin,
      title: "University Matching",
      description: "Find universities that match your profile",
      prompt: "Recommend universities for my engineering background"
    },
    {
      icon: DollarSign,
      title: "Cost Estimation",
      description: "Calculate living costs for your study destination",
      prompt: "What's the cost of living for students in London?"
    }
  ];

  const chatMessages = [
    {
      id: 1,
      sender: "bot",
      message: "Hi! I'm SmartEduBot, your AI assistant for international education. How can I help you today?",
      timestamp: "Just now"
    }
  ];

  return (
    <div className="min-h-screen pt-20 bg-gradient-subtle">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-primary/10 p-4 rounded-full">
              <Bot className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">SmartEduBot</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Your 24/7 AI assistant for international education guidance. Get personalized advice on scholarships, 
            universities, visas, and more.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 mr-2 text-tertiary" />
                  Quick Actions
                </CardTitle>
                <CardDescription>
                  Try these popular queries to get started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <Card 
                    key={index} 
                    className="p-4 cursor-pointer hover:shadow-card transition-all duration-300 border-dashed"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="bg-primary/10 p-2 rounded-lg">
                        <action.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm">{action.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Capabilities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge className="text-xs">✓ Scholarship Matching</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="text-xs">✓ Visa Guidance</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="text-xs bg-secondary text-secondary-foreground">✓ SOP Reviews</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="text-xs bg-secondary text-secondary-foreground">✓ Cost Calculations</Badge>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="text-xs bg-secondary text-secondary-foreground">✓ University Recommendations</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader className="border-b">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback>
                      <Bot className="h-5 w-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">SmartEduBot</CardTitle>
                    <CardDescription className="flex items-center">
                      <div className="h-2 w-2 bg-secondary rounded-full mr-2"></div>
                      Online • Ready to help
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>

              {/* Chat Messages */}
              <CardContent className="flex-1 overflow-y-auto p-6">
                <div className="space-y-4">
                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{message.message}</p>
                        <span className="text-xs opacity-70 mt-1 block">
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Chat Input */}
              <div className="border-t p-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Ask me about scholarships, universities, visas, or anything study abroad related..."
                    className="flex-1"
                  />
                  <Button>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  SmartEduBot can make mistakes. Always verify important information independently.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;