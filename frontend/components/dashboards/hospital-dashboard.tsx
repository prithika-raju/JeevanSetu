"use client"

import { useState, useEffect } from "react"
import { useApp } from "@/lib/app-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building2, FileText, CheckCircle, Upload, Eye } from "lucide-react"
import Navigation from "@/components/navigation"
import AwarenessPage from "@/components/awareness-page"
import ProfilePage from "@/components/profile-page"

/* -----------------------------
   TEMP UI DATA (UNCHANGED)
------------------------------ */

const mockTodayTransfusions = [
  {
    id: 1,
    patientName: "Rajesh Kumar",
    bloodGroup: "A+",
    units: 2,
    time: "10:00 AM",
    status: "completed",
  },
  {
    id: 2,
    patientName: "Priya Sharma",
    bloodGroup: "B+",
    units: 1,
    time: "02:00 PM",
    status: "scheduled",
  },
]

const mockPatients = [
  {
    id: 1,
    name: "Rajesh Kumar",
    bloodGroup: "A+",
    lastTransfusion: "2024-12-10",
    nextTransfusion: "2024-12-25",
  },
]

/* -----------------------------
   COMPONENT
------------------------------ */

export default function HospitalDashboard() {
  const { user } = useApp()
  const [currentPage, setCurrentPage] = useState("home")

  // 🔹 REAL BLOOD REQUESTS FROM BACKEND
  const [bloodRequests, setBloodRequests] = useState([])

  /* -----------------------------
     FETCH BLOOD REQUESTS
  ------------------------------ */
  useEffect(() => {
    fetch("http://localhost:5000/api/hospital/requests")
      .then(res => res.json())
      .then(data => setBloodRequests(data))
      .catch(err => console.error("Failed to load requests", err))
  }, [])

  /* -----------------------------
     VERIFY REQUEST
  ------------------------------ */
  const handleVerifyDonation = async (id: number) => {
    try {
      await fetch("http://localhost:5000/api/hospital/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId: id }),
      })

      // Remove verified request from UI
      setBloodRequests(prev => prev.filter(req => req.id !== id))
    } catch (err) {
      alert("Verification failed")
    }
  }

  /* -----------------------------
     OTHER HANDLERS (UNCHANGED)
  ------------------------------ */
  const handleViewHistory = (patientId: number) => {
    alert("Patient history would be displayed here")
  }

  const handleUploadReport = () => {
    alert("File upload functionality would be implemented here")
  }

  /* -----------------------------
     PAGE SWITCHING
  ------------------------------ */
  if (currentPage === "awareness") {
    return <AwarenessPage onBack={() => setCurrentPage("home")} />
  }

  if (currentPage === "profile") {
    return <ProfilePage onBack={() => setCurrentPage("home")} />
  }

  /* -----------------------------
     UI (UNCHANGED)
  ------------------------------ */
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-white">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <div className="px-4 py-6 max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Building2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Hospital Dashboard</h1>
            <p className="text-muted-foreground">{user?.fullName || "Healthcare Professional"}</p>
          </div>
        </div>

        {/* Today's Transfusions */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Today's Transfusions</h2>
          <div className="space-y-3">
            {mockTodayTransfusions.map((transfusion) => (
              <Card key={transfusion.id} className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{transfusion.patientName}</h3>
                    <p className="text-sm text-foreground/70">
                      {transfusion.bloodGroup} • {transfusion.units} units • {transfusion.time}
                    </p>
                  </div>
                  {transfusion.status !== "completed" && (
                    <Button size="sm" className="gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Verify
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Blood Requests (REAL DATA) */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Blood Requests</h2>
          <div className="space-y-3">
            {bloodRequests.map((request) => (
              <Card key={request.id} className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {request.blood_group} - {request.units} units
                    </h3>
                    <p className="text-sm text-foreground/70">
                      Status: {request.status}
                    </p>
                  </div>

                  {request.status === "PENDING" && (
                    <Button
                      onClick={() => handleVerifyDonation(request.id)}
                      size="sm"
                      className="gap-2"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Verify
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Patient Management */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Patient Management</h2>
          <div className="space-y-3">
            {mockPatients.map((patient) => (
              <Card key={patient.id} className="p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">{patient.name}</h3>
                    <p className="text-sm text-foreground/70">
                      {patient.bloodGroup} • Last: {patient.lastTransfusion}
                    </p>
                  </div>
                  <Button
                    onClick={() => handleViewHistory(patient.id)}
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-transparent"
                  >
                    <Eye className="w-4 h-4" />
                    View History
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Upload Report */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Upload className="w-6 h-6 text-blue-700" />
              <div>
                <h3 className="font-semibold text-lg text-blue-900">Upload Patient Report</h3>
                <p className="text-sm text-blue-700">Upload test results and medical reports</p>
              </div>
            </div>
            <Button onClick={handleUploadReport} className="gap-2">
              <FileText className="w-4 h-4" />
              Upload
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
