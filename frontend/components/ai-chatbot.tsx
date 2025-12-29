"use client"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sparkles, Send, X, Minimize2 } from "lucide-react"

const suggestedQuestions = [
  "What is Thalassemia?",
  "What are the symptoms?",
  "How often do I need transfusions?",
  "Diet recommendations for Thalassemia",
  "Iron chelation therapy explained",
]

const aiResponses = {
  "what is thalassemia":
    "Thalassemia is an inherited blood disorder where the body doesn't make enough hemoglobin, a protein in red blood cells that carries oxygen throughout the body. People with thalassemia may have mild or severe anemia.",
  symptoms:
    "Common symptoms include fatigue, weakness, pale or yellowish skin, facial bone deformities, slow growth, abdominal swelling, and dark urine. Symptoms vary based on the type and severity of thalassemia.",
  transfusions:
    "The frequency of blood transfusions depends on the severity of your condition. Patients with thalassemia major typically need transfusions every 2-4 weeks, while those with thalassemia intermedia may need them less frequently or only during times of stress or illness.",
  diet: "A healthy diet for thalassemia patients should include foods rich in folic acid (leafy greens, beans), calcium, and vitamin D. However, avoid iron-rich foods and supplements as your body may already have iron overload from transfusions. Always consult your doctor for personalized dietary advice.",
  "iron chelation":
    "Iron chelation therapy helps remove excess iron from your body that builds up from regular blood transfusions. Medications like deferoxamine, deferasirox, or deferiprone bind to excess iron and help your body eliminate it. It's crucial to follow your prescribed chelation regimen.",
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hello! I'm your Thalassemia AI Assistant. Ask me anything about Thalassemia, treatments, or living with the condition.",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const getAIResponse = (question) => {
    const lowerQuestion = question.toLowerCase()
    for (const [key, response] of Object.entries(aiResponses)) {
      if (lowerQuestion.includes(key)) {
        return response
      }
    }
    return "I'm here to help with information about Thalassemia. You can ask me about symptoms, treatments, transfusions, diet, iron chelation therapy, and more. If you need specific medical advice, please consult with your doctor through the 'Talk to Doctor' feature."
  }

  const handleSendMessage = (text = inputMessage) => {
    if (text.trim()) {
      const userMessage = {
        id: messages.length + 1,
        sender: "user",
        text: text,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, userMessage])
      setInputMessage("")

      setTimeout(() => {
        const aiResponse = {
          id: messages.length + 2,
          sender: "ai",
          text: getAIResponse(text),
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setMessages((prev) => [...prev, aiResponse])
        console.log("[v0] AI response generated for:", text)
      }, 1000)
    }
  }

  const handleQuestionClick = (question) => {
    handleSendMessage(question)
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-50 group"
        aria-label="Open AI Assistant"
      >
        <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-white group-hover:rotate-12 transition-transform" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
      </button>
    )
  }

  if (isMinimized) {
    return (
      <Card
        className="fixed bottom-6 right-6 w-64 sm:w-80 shadow-2xl z-50 cursor-pointer hover:shadow-xl transition-shadow"
        onClick={() => setIsMinimized(false)}
      >
        <div className="p-4 bg-gradient-to-r from-primary to-primary/80">
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <span className="font-semibold">Thalassemia AI Assistant</span>
            </div>
            <Button
              size="icon"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation()
                setIsOpen(false)
                setIsMinimized(false)
              }}
              className="text-white hover:bg-white/20 h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-[90vw] sm:w-96 h-[600px] max-h-[80vh] shadow-2xl z-50 flex flex-col">
      <div className="p-4 bg-gradient-to-r from-primary to-primary/80 rounded-t-lg">
        <div className="flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <div>
              <h3 className="font-semibold text-base">Thalassemia AI Assistant</h3>
              <p className="text-xs text-white/80">Always here to help</p>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsMinimized(true)}
              className="text-white hover:bg-white/20 h-8 w-8"
            >
              <Minimize2 className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                setIsOpen(false)
                setIsMinimized(false)
              }}
              className="text-white hover:bg-white/20 h-8 w-8"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.sender === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border shadow-sm text-foreground"
              }`}
            >
              {message.sender === "ai" && (
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-xs font-semibold text-primary">AI Assistant</span>
                </div>
              )}
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p
                className={`text-xs mt-1 ${message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
              >
                {message.time}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <div className="px-4 py-2 border-t bg-background">
          <p className="text-xs text-muted-foreground mb-2">Try asking:</p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.slice(0, 3).map((question, idx) => (
              <button
                key={idx}
                onClick={() => handleQuestionClick(question)}
                className="text-xs px-3 py-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 border-t bg-background">
        <div className="flex gap-2">
          <Input
            placeholder="Ask me anything..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            className="flex-1"
          />
          <Button size="icon" onClick={() => handleSendMessage()} className="flex-shrink-0">
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          AI responses are informational. Consult a doctor for medical advice.
        </p>
      </div>
    </Card>
  )
}
