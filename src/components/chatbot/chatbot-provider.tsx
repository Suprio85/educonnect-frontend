import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Bot } from "lucide-react"
import SmartEduBot from "./smart-edu-bot"

export default function ChatbotProvider() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)

  useEffect(() => {
    const handleOpenChatbot = () => {
      setIsChatOpen(true)
      setIsMinimized(false)
    }

    window.addEventListener("openChatbot", handleOpenChatbot)
    return () => window.removeEventListener("openChatbot", handleOpenChatbot)
  }, [])

  const handleOpenChat = () => {
    console.log("Opening chat")
    setIsChatOpen(true)
    setIsMinimized(false)
  }

  const handleCloseChat = () => {
    setIsChatOpen(false)
    setIsMinimized(false)
  }

  const handleMinimizeChat = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isChatOpen && (
        <Button
          onClick={handleOpenChat}
          className="fixed bottom-4 right-4 z-50 w-14 h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 shadow-2xl transition-all duration-300 hover:scale-110"
        >
          <Bot className="w-6 h-6 text-white" />
        </Button>
      )}

      {/* Chat Interface */}
      <SmartEduBot
        isOpen={isChatOpen}
        onClose={handleCloseChat}
        onMinimize={handleMinimizeChat}
        isMinimized={isMinimized}
      />
    </>
  )
}
