"use client"

import { useState, useEffect } from "react"
import { useApp } from "@/lib/app-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Heart,
  Droplet,
  Calendar,
  Phone,
  BookOpen,
  Bell,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  FileText,
} from "lucide-react"
import Navigation from "@/components/navigation"
import RequestBlood from "@/components/request-blood"
import TransfusionsPage from "@/components/transfusions-page"
import AwarenessPage from "@/components/awareness-page"
import ProfilePage from "@/components/profile-page"
import SchemesPage from "@/components/schemes-page"
import TalkToDoctor from "@/components/talk-to-doctor"
import AIChatbot from "@/components/ai-chatbot"

const heroImages = [
  {
    url: "/images/img1.jpg",
    alt: "Caring healthcare support",
  },
  {
    url: "/images/img2.jpg",
    alt: "Patient care",
  },
  {
    url: "/images/img3.jpg",
    alt: "Community support",
  },
]

export default function PatientDashboard() {
  const { user } = useApp()
  const [currentPage, setCurrentPage] = useState("home")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  const nextTransfusion = "25th January 2026"
  const upcomingReminder = "Blood test scheduled on 25th January 2026 at City General Hospital"
  const educationTip = "Stay hydrated and maintain iron-rich diet for better transfusion outcomes"

  if (currentPage === "request-blood") {
    return <RequestBlood onBack={() => setCurrentPage("home")} />
  }

  if (currentPage === "transfusions") {
    return <TransfusionsPage onBack={() => setCurrentPage("home")} />
  }

  if (currentPage === "awareness") {
    return <AwarenessPage onBack={() => setCurrentPage("home")} />
  }

  if (currentPage === "profile") {
    return <ProfilePage onBack={() => setCurrentPage("home")} />
  }

  if (currentPage === "schemes") {
    return <SchemesPage onBack={() => setCurrentPage("home")} />
  }

  if (currentPage === "talk-to-doctor") {
    return (
      <>
        <TalkToDoctor onBack={() => setCurrentPage("home")} />
        <AIChatbot />
      </>
    )
  }

  return (
    <div className="min-h-screen healthcare-gradient">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <Card className="relative overflow-hidden p-0 border-0 shadow-xl rounded-none mx-0 mb-8 md:mb-12">
        <div className="relative h-[400px] sm:h-[450px] md:h-[550px] lg:h-[600px] bg-slate-100">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={image.url || "/placeholder.svg"}
                alt={image.alt}
                className="w-full h-full object-contain bg-slate-100"
              />
              <div className="absolute inset-0 hero-gradient opacity-30" />
            </div>
          ))}

          <button
            onClick={prevImage}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all z-10"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>

          <div className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12 z-10">
            <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white mb-4 sm:mb-6 text-balance leading-tight">
              You Are Not Alone
            </h1>
            <p className="text-base sm:text-xl md:text-2xl text-white/95 max-w-3xl mb-6 sm:mb-8 leading-relaxed text-pretty">
              We're here to support you, {user?.fullName?.split(" ")[0] || "Friend"}. Together, we face every challenge
              with strength and hope.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3 bg-white/25 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-white/30">
                <Droplet className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                <span className="font-semibold text-white text-base sm:text-lg">{user?.bloodGroup || "B+"}</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3 bg-white/25 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-white/30">
                <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span className="text-white text-sm sm:text-base">Next: {nextTransfusion}</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${
                  index === currentImageIndex ? "bg-white w-6 sm:w-8" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Card>

      <div className="px-4 sm:px-6 lg:px-8 py-6 space-y-12 md:space-y-16">
        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground px-2 flex items-center gap-3">
            <Heart className="w-7 h-7 sm:w-9 sm:h-9 text-primary" />
            Quick Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            <Card
              className="group p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 bg-card hover:scale-105"
              onClick={() => setCurrentPage("request-blood")}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-primary rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Droplet className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground">Request Blood</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Need blood urgently? We'll connect you with donors instantly
                  </p>
                </div>
              </div>
            </Card>

            <Card
              className="group p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 bg-card hover:scale-105"
              onClick={() => setCurrentPage("transfusions")}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-accent rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Calendar className="w-8 h-8 sm:w-10 sm:h-10 text-accent-foreground" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground">My Transfusions</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Track your treatment history and upcoming appointments
                  </p>
                </div>
              </div>
            </Card>

            <Card
              className="group p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 bg-card hover:scale-105"
              onClick={() => setCurrentPage("talk-to-doctor")}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-chart-2 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <Phone className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground">Talk to Doctor</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Get expert medical guidance anytime you need it
                  </p>
                </div>
              </div>
            </Card>

            <Card
              className="group p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 bg-card hover:scale-105"
              onClick={() => setCurrentPage("schemes")}
            >
              <div className="flex flex-col items-center text-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-chart-3 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-foreground">Schemes</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Discover financial aid and government support programs
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="h-8 md:h-12" />

        <div className="space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground px-2 flex items-center gap-3">
            <Bell className="w-7 h-7 sm:w-9 sm:h-9 text-primary" />
            Stay Informed
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 bg-card hover:scale-105">
              <div className="relative h-48 bg-accent/20">
                <img
                  src="/medical-appointment-reminder-calendar.jpg"
                  alt="Upcoming Reminder"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-4 right-4 w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                  <Bell className="w-6 h-6 text-primary-foreground" />
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="font-bold text-xl text-foreground">Upcoming Reminder</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{upcomingReminder}</p>
              </div>
            </Card>

            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 bg-card hover:scale-105">
              <div className="relative h-48 bg-chart-2/20">
                <img
                  src="/healthy-diet-nutrition-iron-rich-foods.jpg"
                  alt="Health Tips"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-4 right-4 w-12 h-12 bg-chart-2 rounded-xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="p-6 space-y-3">
                <h3 className="font-bold text-xl text-foreground">Health Tip of the Day</h3>
                <p className="text-base text-muted-foreground leading-relaxed">{educationTip}</p>
              </div>
            </Card>

            <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 bg-card hover:scale-105 sm:col-span-2 lg:col-span-1">
              <div className="relative h-48 bg-destructive/20">
                <img
                  src="/thalassemia-awareness-education-community.jpg"
                  alt="Awareness"
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-4 right-4 w-12 h-12 bg-destructive rounded-xl flex items-center justify-center shadow-lg">
                  <AlertCircle className="w-6 h-6 text-destructive-foreground" />
                </div>
              </div>
              <div className="p-6 space-y-4">
                <h3 className="font-bold text-xl text-foreground">Learn & Share</h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Discover important facts about Thalassemia and help spread awareness
                </p>
                <Button
                  size="lg"
                  className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-md"
                  onClick={() => setCurrentPage("awareness")}
                >
                  Explore Awareness
                </Button>
              </div>
            </Card>
          </div>
        </div>

        <Card className="p-6 sm:p-8 bg-primary/5 border-2 border-primary/20 shadow-lg">
          <div className="flex items-center justify-center gap-3 flex-wrap text-center">
            <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-primary flex-shrink-0" />
            <p className="text-sm sm:text-base md:text-lg text-foreground/90 leading-relaxed max-w-3xl">
              <span className="font-bold text-primary">Your data is safe with us.</span> We use it only to connect you
              with life-saving resources. Together, we save lives.
            </p>
          </div>
        </Card>

        <footer className="border-t pt-8 md:pt-12 pb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-foreground">About Jeevan Setu</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Connecting Thalassemia patients with life-saving blood donors, hospitals, and support resources.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-foreground">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Contact Support</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Terms of Service</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-foreground">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="hover:text-primary cursor-pointer transition-colors">Thalassemia Guide</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Blood Donation Centers</li>
                <li className="hover:text-primary cursor-pointer transition-colors">Support Groups</li>
                <li className="hover:text-primary cursor-pointer transition-colors">FAQs</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-bold text-lg text-foreground">Contact</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: support@jeevansetu.org</li>
                <li>Phone: 1800-XXX-XXXX</li>
                <li>24/7 Emergency Helpline</li>
              </ul>
            </div>
          </div>
          <div className="text-center pt-6 border-t">
            <p className="text-sm text-muted-foreground">
              © 2025 Jeevan Setu. All rights reserved. Made with <Heart className="w-4 h-4 inline text-primary" /> for
              Thalassemia patients.
            </p>
          </div>
        </footer>
      </div>

      <AIChatbot />
    </div>
  )
}
