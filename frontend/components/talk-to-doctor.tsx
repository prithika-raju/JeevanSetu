"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, Phone, MessageCircle, User, Send, Calendar, Clock, CheckCircle } from "lucide-react"

const assignedDoctor = {
  id: 1,
  name: "Dr. Ananya Rao",
  specialization: "Hematologist",
  hospital: "Apollo Hospital, Mumbai",
  experience: "15 years",
  avatar: "/doctor-ananya-rao.jpg",
  isOnline: true,
}

const doctorList = [
  {
    id: 2,
    name: "Dr. Rajesh Kumar",
    specialization: "Pediatric Hematologist",
    hospital: "Fortis Hospital, Delhi",
    experience: "12 years",
    avatar: "/doctor-rajesh-kumar.jpg",
  },
  {
    id: 3,
    name: "Dr. Priya Sharma",
    specialization: "Transfusion Specialist",
    hospital: "Max Hospital, Bangalore",
    experience: "10 years",
    avatar: "/doctor-priya-sharma.jpg",
  },
  {
    id: 4,
    name: "Dr. Vikram Singh",
    specialization: "Clinical Hematologist",
    hospital: "Medanta Hospital, Gurgaon",
    experience: "18 years",
    avatar: "/doctor-vikram-singh.jpg",
  },
]

export default function TalkToDoctor({ onBack }) {
  const [showChat, setShowChat] = useState(false)
  const [showAppointmentModal, setShowAppointmentModal] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [messages, setMessages] = useState([
    { id: 1, sender: "doctor", text: "Hello, how are you feeling today?", time: "10:30 AM" },
    { id: 2, sender: "patient", text: "My transfusion is scheduled tomorrow.", time: "10:32 AM" },
    { id: 3, sender: "doctor", text: "Make sure to hydrate well before your appointment.", time: "10:33 AM" },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [appointmentData, setAppointmentData] = useState({
    date: "",
    time: "",
    message: "",
  })

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: "patient",
        text: inputMessage,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, newMessage])
      setInputMessage("")
      console.log("[v0] Message sent:", inputMessage)
    }
  }

  const handleRequestCall = (doctor) => {
    console.log("[v0] Call requested with:", doctor.name)
    alert(`Your call request has been sent to ${doctor.name}. They will contact you shortly.`)
  }

  const handleChatNow = (doctor) => {
    setSelectedDoctor(doctor)
    setShowChat(true)
  }

  const handleRequestConsultation = (doctor) => {
    setSelectedDoctor(doctor)
    setShowAppointmentModal(true)
  }

  const handleSubmitAppointment = () => {
    console.log("[v0] Appointment requested:", appointmentData, "with", selectedDoctor?.name)
    alert(`Consultation request sent to ${selectedDoctor?.name}. You'll receive a confirmation soon.`)
    setShowAppointmentModal(false)
    setAppointmentData({ date: "", time: "", message: "" })
  }

  if (showChat) {
    return (
      <div className="min-h-screen healthcare-gradient flex flex-col">
        <div className="bg-card border-b shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => setShowChat(false)} className="hover:bg-primary/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/20 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-card"></div>
                </div>
                <div>
                  <h2 className="font-bold text-base sm:text-lg text-foreground">
                    {selectedDoctor?.name || assignedDoctor.name}
                  </h2>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {selectedDoctor?.specialization || assignedDoctor.specialization}
                  </p>
                </div>
              </div>
            </div>
            <Badge className="bg-green-500/20 text-green-700 border-green-500/30">Online</Badge>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 max-w-4xl mx-auto w-full">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "patient" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] sm:max-w-[60%] rounded-2xl px-4 py-3 ${
                    message.sender === "patient" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                  }`}
                >
                  <p className="text-sm sm:text-base leading-relaxed">{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${message.sender === "patient" ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                  >
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card border-t shadow-lg">
          <div className="px-4 sm:px-6 lg:px-8 py-4 max-w-4xl mx-auto">
            <div className="flex gap-2 sm:gap-3">
              <Input
                placeholder="Type your message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1 h-12"
              />
              <Button size="lg" onClick={handleSendMessage} className="gap-2 px-4 sm:px-6">
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">Send</span>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Medical advice shared here is confidential and secure.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen healthcare-gradient">
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-6 gap-2 hover:bg-primary/10 text-foreground">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        <div className="mb-8 md:mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-3">Talk to a Doctor</h1>
          <p className="text-base sm:text-lg text-muted-foreground">Get guidance from trusted medical professionals</p>
        </div>

        <Card className="p-6 sm:p-8 mb-8 bg-primary/5 border-2 border-primary/20 shadow-xl">
          <Badge className="mb-4 bg-primary text-primary-foreground">Your Assigned Doctor</Badge>
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 mx-auto sm:mx-0">
              <div className="w-full h-full bg-primary/20 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 sm:w-12 sm:h-12 text-primary" />
              </div>
              {assignedDoctor.isOnline && (
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-card"></div>
              )}
            </div>
            <div className="flex-1 space-y-4 text-center sm:text-left">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-1">{assignedDoctor.name}</h2>
                <p className="text-base text-muted-foreground">{assignedDoctor.specialization}</p>
                <p className="text-sm text-muted-foreground">{assignedDoctor.hospital}</p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                <Badge variant="outline">{assignedDoctor.experience} experience</Badge>
                {assignedDoctor.isOnline && (
                  <Badge className="bg-green-500/20 text-green-700 border-green-500/30">Available</Badge>
                )}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button size="lg" onClick={() => handleChatNow(assignedDoctor)} className="gap-2 flex-1">
                  <MessageCircle className="w-5 h-5" />
                  Chat Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => handleRequestCall(assignedDoctor)}
                  className="gap-2 flex-1 bg-transparent"
                >
                  <Phone className="w-5 h-5" />
                  Request Call
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Available Doctors</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {doctorList.map((doctor) => (
              <Card
                key={doctor.id}
                className="p-6 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="w-10 h-10 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-1">{doctor.name}</h3>
                    <p className="text-sm text-muted-foreground mb-1">{doctor.specialization}</p>
                    <p className="text-xs text-muted-foreground">{doctor.hospital}</p>
                  </div>
                  <Badge variant="outline">{doctor.experience} experience</Badge>
                  <div className="flex flex-col w-full gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleChatNow(doctor)} className="w-full gap-2">
                      <MessageCircle className="w-4 h-4" />
                      View Profile
                    </Button>
                    <Button size="sm" onClick={() => handleRequestConsultation(doctor)} className="w-full gap-2">
                      <Calendar className="w-4 h-4" />
                      Request Consultation
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <Card className="p-6 sm:p-8 bg-muted/50 border-0">
          <div className="text-center max-w-2xl mx-auto">
            <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-3 text-foreground">Medical Advice Confidentiality</h3>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              All medical advice shared through JeevanSetu is confidential and secure. Your conversations with doctors
              are protected and private.
            </p>
          </div>
        </Card>

        <Dialog open={showAppointmentModal} onOpenChange={setShowAppointmentModal}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="text-2xl">Request Consultation</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="bg-accent/30 p-4 rounded-lg">
                <p className="text-sm font-semibold text-foreground mb-1">Doctor</p>
                <p className="text-base text-muted-foreground">{selectedDoctor?.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Preferred Date
                </label>
                <Input
                  type="date"
                  value={appointmentData.date}
                  onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
                  className="h-12"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Preferred Time
                </label>
                <Input
                  type="time"
                  value={appointmentData.time}
                  onChange={(e) => setAppointmentData({ ...appointmentData, time: e.target.value })}
                  className="h-12"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Message (Optional)</label>
                <textarea
                  value={appointmentData.message}
                  onChange={(e) => setAppointmentData({ ...appointmentData, message: e.target.value })}
                  placeholder="Describe your symptoms or concerns..."
                  className="w-full min-h-[100px] px-3 py-2 rounded-md border bg-background resize-none"
                />
              </div>
              <Button size="lg" onClick={handleSubmitAppointment} className="w-full gap-2">
                <CheckCircle className="w-5 h-5" />
                Submit Request
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}
