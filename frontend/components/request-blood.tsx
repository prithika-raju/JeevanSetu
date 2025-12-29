"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Droplet, CheckCircle, Users, Clock, Heart, AlertCircle } from "lucide-react"

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

export default function RequestBlood({ onBack }) {
  const { user } = useApp()
  const [formData, setFormData] = useState({
    bloodGroup: user?.bloodGroup || "",
    units: "",
    hospital: "",
    urgency: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [requestStatus, setRequestStatus] = useState({
    donorsContacted: 0,
    donorsResponded: 0,
  })

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
  e.preventDefault()

  try {
    await fetch("http://localhost:5000/api/request", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        patientId: user.id,
        bloodGroup: formData.bloodGroup,
        units: formData.units,
        hospitalId: formData.hospitalId
      })
    })

    setSubmitted(true)   // keep UI feedback
  } catch (err) {
    alert("Failed to submit blood request")
  }
}


  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-white">
        <div className="px-4 py-6 max-w-3xl mx-auto">
          <Card className="p-8 md:p-12 text-center shadow-2xl border-2 border-green-200 bg-gradient-to-br from-white to-green-50">
            <div className="mb-6">
              <img src="images/success.jpg" alt="Success" className="w-80 h-50 mx-auto" />
            </div>
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-4xl font-bold text-primary mb-4 text-balance">Help is On the Way!</h2>
            <p className="text-xl text-foreground/70 mb-10 leading-relaxed max-w-xl mx-auto">
              We're connecting you with generous blood donors in your area right now. You're not alone in this.
            </p>

            <div className="space-y-4 mb-10">
              <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-300 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center shadow-md">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <span className="font-bold text-lg text-blue-900">Donors Contacted</span>
                  </div>
                  <span className="text-4xl font-bold text-blue-600">{requestStatus.donorsContacted}</span>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shadow-md">
                      <Heart className="w-7 h-7 text-white" />
                    </div>
                    <span className="font-bold text-lg text-green-900">Positive Responses</span>
                  </div>
                  <span className="text-4xl font-bold text-green-600">{requestStatus.donorsResponded}</span>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-r from-orange-50 to-orange-100 border-2 border-orange-300 shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center shadow-md flex-shrink-0">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <p className="text-base text-orange-900 leading-relaxed font-medium text-left">
                    You will receive a call or SMS from donors very soon. Please keep your phone accessible.
                  </p>
                </div>
              </Card>
            </div>

            <Button onClick={onBack} size="lg" className="w-full h-14 text-lg shadow-lg">
              Back to Dashboard
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-white">
      <div className="px-4 py-6 max-w-2xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-6 gap-2 hover:bg-primary/10">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        <Card className="p-8 mb-6 bg-gradient-to-br from-primary/5 to-red-50 border-2 border-primary/20 shadow-lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Droplet className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Request Blood</h1>
          </div>
          <p className="text-lg text-foreground/70 leading-relaxed">
            Fill in the details below and we'll immediately connect you with available blood donors in your area. Help
            is just moments away.
          </p>
        </Card>

        <Card className="p-8 shadow-xl border-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="bloodGroup" className="text-base">
                Blood Group Required *
              </Label>
              <select
                id="bloodGroup"
                value={formData.bloodGroup}
                onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
                required
                className="mt-1 w-full h-12 text-base px-3 rounded-lg border border-input bg-background"
              >
                <option value="">Select Blood Group</option>
                {bloodGroups.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label htmlFor="units" className="text-base">
                Units Required *
              </Label>
              <Input
                id="units"
                type="number"
                value={formData.units}
                onChange={(e) => handleInputChange("units", e.target.value)}
                required
                className="mt-1 h-12 text-base"
                placeholder="e.g., 2"
                min="1"
              />
            </div>

            <div>
              <Label htmlFor="hospital" className="text-base">
                Hospital Name *
              </Label>
              <Input
                id="hospital"
                type="text"
                value={formData.hospital}
                onChange={(e) => handleInputChange("hospital", e.target.value)}
                required
                className="mt-1 h-12 text-base"
                placeholder="Enter hospital name"
              />
            </div>

            <div>
              <Label htmlFor="urgency" className="text-base">
                Urgency Level *
              </Label>
              <select
                id="urgency"
                value={formData.urgency}
                onChange={(e) => handleInputChange("urgency", e.target.value)}
                required
                className="mt-1 w-full h-12 text-base px-3 rounded-lg border border-input bg-background"
              >
                <option value="">Select Urgency</option>
                <option value="emergency">Emergency (within 24 hours)</option>
                <option value="urgent">Urgent (within 3 days)</option>
                <option value="planned">Planned (within a week)</option>
              </select>
            </div>

            <Card className="p-5 bg-blue-50 border-2 border-blue-200">
              <div className="flex gap-3">
                <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                <p className="text-base text-blue-900 leading-relaxed">
                  Your request will be sent to all matching blood donors in your city. You will receive notifications as
                  donors respond. We're here to help.
                </p>
              </div>
            </Card>

            <Button type="submit" size="lg" className="w-full h-16 text-xl font-bold shadow-lg">
              <Heart className="w-6 h-6 mr-2" />
              Submit Request
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
