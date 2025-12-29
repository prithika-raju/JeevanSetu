"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Droplet, Calendar, MapPin, AlertCircle, Award, CheckCircle, X, Users, Bell } from "lucide-react"
import Navigation from "@/components/navigation"
import AwarenessPage from "@/components/awareness-page"
import ProfilePage from "@/components/profile-page"

const mockRequests = [
  {
    id: 1,
    patientName: "Rajesh Kumar",
    bloodGroup: "A+",
    units: 2,
    hospital: "City General Hospital",
    distance: "2.5 km",
    urgency: "emergency",
    city: "Mumbai",
  },
  {
    id: 2,
    patientName: "Priya Sharma",
    bloodGroup: "A+",
    units: 1,
    hospital: "Central Medical Center",
    distance: "5.8 km",
    urgency: "urgent",
    city: "Mumbai",
  },
]

export default function DonorDashboard() {
  const { user } = useApp()
  const [currentPage, setCurrentPage] = useState("home")
  const [requests, setRequests] = useState(mockRequests)
  const [livesSaved] = useState(12)
  const [eligibilityStatus] = useState("eligible")
  const [nextDonationDate] = useState("15th January 2025")

  const handleAccept = (requestId) => {
    console.log("Accepted request:", requestId)
    alert("Thank you! The patient will be contacted with your details shortly.")
    setRequests(requests.filter((r) => r.id !== requestId))
  }

  const handleDecline = (requestId) => {
    console.log("Declined request:", requestId)
    setRequests(requests.filter((r) => r.id !== requestId))
  }

  if (currentPage === "awareness") {
    return <AwarenessPage onBack={() => setCurrentPage("home")} />
  }

  if (currentPage === "profile") {
    return <ProfilePage onBack={() => setCurrentPage("home")} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-white">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <div className="px-4 py-6 max-w-4xl mx-auto space-y-6">
        {/* Hero Section */}
        <Card className="relative overflow-hidden p-0 border-0 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-red-600 to-red-700 opacity-90" />
          <div className="relative grid md:grid-cols-2 gap-6 p-8 md:p-10">
            <div className="text-white space-y-4 flex flex-col justify-center">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-balance">You Save Lives</h1>
              <p className="text-xl md:text-2xl text-white/90 leading-relaxed text-pretty">
                Every drop you donate gives hope to someone fighting for their life. Thank you,{" "}
                {user?.fullName?.split(" ")[0] || "Hero"}.
              </p>
              <div className="flex items-center gap-3 pt-2">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Droplet className="w-5 h-5" />
                  <span className="font-semibold">{user?.bloodGroup || "A+"}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Award className="w-4 h-4" />
                  <span className="text-sm">{livesSaved} Lives Saved</span>
                </div>
              </div>
            </div>
            <div className="hidden md:flex items-center justify-center">
              <img src="images/bloodbridge.jpg" alt="Blood donation hero" className="w-full max-w-sm rounded-2xl" />
            </div>
          </div>
        </Card>

        {/* Header Card */}
        <Card className="p-6 bg-gradient-to-br from-primary to-primary/80 text-white shadow-xl">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, {user?.fullName || "Donor"}</h1>
              <div className="flex items-center gap-2 mb-1">
                <Droplet className="w-5 h-5" />
                <span className="text-lg font-semibold">Blood Group: {user?.bloodGroup || "A+"}</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Next Eligible: {nextDonationDate}</span>
              </div>
            </div>
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Heart className="w-8 h-8" />
            </div>
          </div>
        </Card>

        {/* Eligibility Status */}
        <Card
          className={`p-6 border-2 shadow-lg ${eligibilityStatus === "eligible" ? "bg-gradient-to-br from-green-50 to-green-100 border-green-300" : "bg-gradient-to-br from-orange-50 to-orange-100 border-orange-300"}`}
        >
          <div className="flex items-center gap-4">
            {eligibilityStatus === "eligible" ? (
              <>
                <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-green-900 mb-2">You're Ready to Save Lives!</h3>
                  <p className="text-base text-green-800 leading-relaxed">
                    Thank you for being eligible and willing to donate. Check the requests below and be someone's hero
                    today.
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="w-14 h-14 bg-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <AlertCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-orange-900 mb-2">Rest & Recover</h3>
                  <p className="text-base text-orange-800 leading-relaxed">
                    You can donate again on {nextDonationDate}. Take care of yourself - you've already done so much
                    good!
                  </p>
                </div>
              </>
            )}
          </div>
        </Card>

        {/* Impact Section */}
        <Card className="relative overflow-hidden p-0 border-0 shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 opacity-90" />
          <div className="relative p-8">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-2xl flex-shrink-0">
                <Award className="w-12 h-12 text-orange-600" />
              </div>
              <div className="flex-1 text-white">
                <h3 className="text-3xl font-bold mb-2">Your Incredible Impact</h3>
                <p className="text-4xl font-bold mb-1">
                  {livesSaved} <span className="text-2xl font-semibold">lives saved!</span>
                </p>
                <p className="text-lg text-white/90 leading-relaxed">
                  You're a real-life superhero. Every donation makes a lasting difference.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Active Blood Requests */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-foreground px-2 flex items-center gap-3">
            <Users className="w-8 h-8 text-primary" />
            People Need Your Help
          </h2>

          {requests.length > 0 ? (
            requests.map((request) => (
              <Card
                key={request.id}
                className={`p-6 border-2 shadow-lg ${
                  request.urgency === "emergency"
                    ? "border-red-400 bg-gradient-to-r from-red-50 to-red-100"
                    : request.urgency === "urgent"
                      ? "border-orange-400 bg-gradient-to-r from-orange-50 to-orange-100"
                      : "border-blue-400 bg-gradient-to-r from-blue-50 to-blue-100"
                }`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-2xl font-bold">{request.patientName}</h3>
                      {request.urgency === "emergency" && (
                        <span className="px-3 py-1.5 bg-red-600 text-white text-sm font-bold rounded-full shadow-md animate-pulse">
                          EMERGENCY
                        </span>
                      )}
                      {request.urgency === "urgent" && (
                        <span className="px-3 py-1.5 bg-orange-600 text-white text-sm font-bold rounded-full shadow-md">
                          URGENT
                        </span>
                      )}
                    </div>
                    <div className="space-y-2 text-base text-foreground/90">
                      <div className="flex items-center gap-3">
                        <Droplet className="w-5 h-5 text-primary" />
                        <span className="font-semibold">
                          {request.bloodGroup} Blood - {request.units} units needed
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="w-5 h-5 text-primary" />
                        <span>
                          {request.hospital} <span className="text-foreground/60">({request.distance} away)</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => handleAccept(request.id)}
                    className="flex-1 gap-2 bg-green-600 hover:bg-green-700 h-12 text-lg shadow-lg"
                    size="lg"
                  >
                    <CheckCircle className="w-5 h-5" />
                    I'll Help
                  </Button>
                  <Button
                    onClick={() => handleDecline(request.id)}
                    variant="outline"
                    className="gap-2 bg-white h-12 shadow-md"
                    size="lg"
                  >
                    <X className="w-5 h-5" />
                    Not Now
                  </Button>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-12 text-center bg-gradient-to-br from-white to-primary/5 border-2 border-dashed border-primary/30">
              <div className="max-w-md mx-auto space-y-4">
                <img src="/peaceful-waiting-illustration--clock--calm.jpg" alt="No requests" className="w-48 h-48 mx-auto opacity-60" />
                <h3 className="text-2xl font-bold text-foreground">No Active Requests Right Now</h3>
                <p className="text-lg text-foreground/70 leading-relaxed">
                  There are no blood requests matching your blood group at the moment. But stay ready - when someone
                  needs you, you'll be their hero!
                </p>
                <div className="pt-4">
                  <Button variant="outline" size="lg" className="gap-2 bg-transparent">
                    <Bell className="w-5 h-5" />
                    Enable Notifications
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

        {/* Trust Message */}
        <Card className="p-5 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <p className="text-center text-sm text-foreground/80">
            <span className="font-semibold">Your generosity saves lives.</span> Thank you for being part of the
            JeevanSetu community.
          </p>
        </Card>
      </div>
    </div>
  )
}
