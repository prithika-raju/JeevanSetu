"use client"

import { useApp } from "@/lib/app-context"
import Registration from "@/components/registration"
import Login from "@/components/login"
import PatientDashboard from "@/components/dashboards/patient-dashboard"
import DonorDashboard from "@/components/dashboards/donor-dashboard"
import VolunteerDashboard from "@/components/dashboards/volunteer-dashboard"
import HospitalDashboard from "@/components/dashboards/hospital-dashboard"

export default function Home() {
  const { currentView, user } = useApp()

  if (currentView === "registration") {
    return (
      <main className="min-h-screen bg-white bg-pattern">
        <Registration />
      </main>
    )
  }

  if (currentView === "login") {
    return (
      <main className="min-h-screen bg-white bg-pattern">
        <Login />
      </main>
    )
  }

  if (currentView === "dashboard" && user) {
    return (
      <main className="min-h-screen bg-white bg-pattern">
        {user.role === "patient" && <PatientDashboard />}
        {user.role === "donor" && <DonorDashboard />}
        {user.role === "volunteer" && <VolunteerDashboard />}
        {user.role === "hospital" && <HospitalDashboard />}
      </main>
    )
  }

  return null
}
