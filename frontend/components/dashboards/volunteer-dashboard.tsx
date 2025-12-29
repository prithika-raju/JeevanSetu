"use client"

import { useState, useEffect } from "react"
import { useApp } from "@/lib/app-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, Droplet, AlertTriangle, Phone, MapPin, Clock, CheckCircle } from "lucide-react"
import Navigation from "@/components/navigation"
import AwarenessPage from "@/components/awareness-page"
import ProfilePage from "@/components/profile-page"

export default function VolunteerDashboard() {
  const { user } = useApp()
  const [currentPage, setCurrentPage] = useState("home")
  const [requests, setRequests] = useState([])

  // ✅ FETCH DATA (ONLY LOGIC)
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch("/api/volunteer/requests")
        const data = await res.json()
        setRequests(data)
      } catch (err) {
        console.error("Failed to fetch requests", err)
      }
    }

    fetchRequests()
  }, [])

  const activeRequests = requests.filter(
    (r) => r.status === "pending" || r.status === "in-progress"
  )
  const emergencyCases = requests.filter((r) => r.urgency === "emergency")
  const rareBloodRequests = requests.filter((r) =>
    ["AB-", "B-", "A-", "O-"].includes(r.bloodGroup)
  )

  const handleViewDetails = (requestId) => {
    console.log("Viewing details for request:", requestId)
  }

  const handleContactDonor = async (requestId) => {
    try {
      await fetch(`/api/volunteer/contact/${requestId}`, {
        method: "POST",
      })
      alert("Donor contacted successfully")
    } catch (err) {
      console.error("Contact donor failed", err)
    }
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

      <div className="px-4 py-6 max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Volunteer Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome, {user?.fullName || "Volunteer"}
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="p-5 bg-blue-50 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-blue-700 mb-1">Active Requests</p>
                <p className="text-3xl font-bold text-blue-900">
                  {activeRequests.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-200 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-700" />
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-red-50 border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-700 mb-1">Emergency Cases</p>
                <p className="text-3xl font-bold text-red-900">
                  {emergencyCases.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-200 rounded-xl flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-700" />
              </div>
            </div>
          </Card>

          <Card className="p-5 bg-orange-50 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-orange-700 mb-1">Rare Blood Alerts</p>
                <p className="text-3xl font-bold text-orange-900">
                  {rareBloodRequests.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-200 rounded-xl flex items-center justify-center">
                <Droplet className="w-6 h-6 text-orange-700" />
              </div>
            </div>
          </Card>
        </div>

        {/* Request List */}
        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground px-2">All Requests</h2>

          {requests.map((request) => (
            <Card key={request.id} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold">{request.patientName}</h3>
                    {request.urgency === "emergency" && (
                      <span className="px-2 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
                        EMERGENCY
                      </span>
                    )}
                    {request.urgency === "urgent" && (
                      <span className="px-2 py-1 bg-orange-600 text-white text-xs font-bold rounded-full">
                        URGENT
                      </span>
                    )}
                    {request.status === "fulfilled" && (
                      <span className="px-2 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                        FULFILLED
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-foreground/80">
                    <div className="flex items-center gap-2">
                      <Droplet className="w-4 h-4" />
                      <span>
                        {request.bloodGroup} - {request.units} units
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{request.hospital}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      <span>{request.mobile}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span className="capitalize">
                        Status: {request.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 md:w-48">
                  <Button
                    onClick={() => handleViewDetails(request.id)}
                    variant="outline"
                    size="sm"
                    className="w-full bg-transparent"
                  >
                    View Details
                  </Button>
                  <Button
                    onClick={() => handleContactDonor(request.id)}
                    size="sm"
                    className="w-full"
                    disabled={request.status === "fulfilled"}
                  >
                    Contact Donor
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Help Text */}
        <Card className="p-5 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <p className="text-center text-sm text-foreground/80">
            <span className="font-semibold">Thank you for volunteering.</span>{" "}
            Your coordination helps save lives and brings hope to families in need.
          </p>
        </Card>
      </div>
    </div>
  )
}
