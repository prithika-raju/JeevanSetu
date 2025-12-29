"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Check, Heart } from "lucide-react"

const roles = [
  { id: "patient", label: "Patient / Parent", icon: "🏥" },
  { id: "donor", label: "Blood Donor", icon: "🩸" },
  { id: "hospital", label: "Hospital / Doctor", icon: "⚕️" },
  { id: "volunteer", label: "Volunteer", icon: "🤝" },
]

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]

export default function Registration() {
  const { goToLogin } = useApp()
  const [selectedRole, setSelectedRole] = useState("")
  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    password: "",
    city: "",
    state: "",
    bloodGroup: "",
    hospitalName: "",
    transfusionFrequency: "",
    lastDonationDate: "",
    willingToDonatRegularly: "",
  })
  const [dataConsent, setDataConsent] = useState(false)
  const [emergencyConsent, setEmergencyConsent] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

 const handleSubmit = async (e) => {
  e.preventDefault()

  const payload = {
    role: selectedRole,
    ...formData
  }

  try {
    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.message || "Registration failed")
      return
    }

    setShowSuccess(true)
    setTimeout(() => {
      goToLogin()
    }, 2000)

  } catch (err) {
    alert("Backend not reachable")
  }
}

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/modern-healthcare-medical-facility-peaceful.jpg')",
          }}
        />
        <div className="absolute inset-0 backdrop-blur-md bg-background/70" />

        <Card className="p-10 max-w-md w-full text-center border-2 shadow-2xl relative bg-card/95 backdrop-blur-sm">
          <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Check className="w-12 h-12 text-primary-foreground" />
          </div>
          <h2 className="text-4xl font-bold text-primary mb-4">Registration Successful!</h2>
          <p className="text-muted-foreground text-lg">Redirecting you to login page...</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative overflow-auto">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/welcoming-healthcare-environment-community-support.jpg')",
        }}
      />
      <div className="absolute inset-0 backdrop-blur-sm bg-background/60" />

      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-xl">
              <Heart className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-foreground mb-4 text-balance">JeevanSetu</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-6 text-pretty">Bridging Lives with Blood & Care</p>
          <div className="inline-flex items-center gap-3 bg-primary/10 backdrop-blur-sm px-6 py-4 rounded-full border-2 border-primary/20">
            <span className="text-2xl">🔒</span>
            <p className="text-sm font-medium text-foreground">Your data is safe and used only to save lives.</p>
          </div>
        </div>

        <Card className="p-6 sm:p-8 md:p-10 bg-card/95 backdrop-blur-sm shadow-2xl border-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Role Selection */}
            <div>
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-balance text-foreground">Select Your Role</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {roles.map((role) => (
                  <Card
                    key={role.id}
                    className={`p-6 cursor-pointer transition-all duration-300 border-2 ${
                      selectedRole === role.id
                        ? "border-primary bg-primary/10 shadow-lg scale-105"
                        : "border-border hover:border-primary/50 hover:shadow-md hover:scale-[1.02]"
                    }`}
                    onClick={() => setSelectedRole(role.id)}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{role.icon}</span>
                      <div className="flex-1">
                        <p className="font-semibold text-lg text-foreground">{role.label}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Dynamic Form Fields */}
            {selectedRole && (
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-semibold text-balance text-foreground">Your Information</h2>

                {/* Common Fields */}
                <div className="space-y-5">
                  <div>
                    <Label htmlFor="fullName" className="text-base font-medium text-foreground">
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      required
                      className="mt-2 h-14 text-base border-2"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="mobile" className="text-base font-medium text-foreground">
                      Mobile Number *
                    </Label>
                    <Input
                      id="mobile"
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) => handleInputChange("mobile", e.target.value)}
                      required
                      className="mt-2 h-14 text-base border-2"
                      placeholder="Enter your mobile number"
                      pattern="[0-9]{10}"
                    />
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-base font-medium text-foreground">
                      Password *
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleInputChange("password", e.target.value)}
                      required
                      className="mt-2 h-14 text-base border-2"
                      placeholder="Create a password"
                      minLength={6}
                    />
                  </div>

                  <div>
                    <Label htmlFor="city" className="text-base font-medium text-foreground">
                      City *
                    </Label>
                    <Input
                      id="city"
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      required
                      className="mt-2 h-14 text-base border-2"
                      placeholder="Enter your city"
                    />
                  </div>

                  <div>
                    <Label htmlFor="state" className="text-base font-medium text-foreground">
                      State *
                    </Label>
                    <Input
                      id="state"
                      type="text"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      required
                      className="mt-2 h-14 text-base border-2"
                      placeholder="Enter your state"
                    />
                  </div>
                </div>

                {/* Patient / Parent Fields */}
                {selectedRole === "patient" && (
                  <div className="space-y-5 pt-6 border-t-2">
                    <h3 className="font-semibold text-xl text-foreground">Patient Details</h3>

                    <div>
                      <Label htmlFor="bloodGroup" className="text-base font-medium text-foreground">
                        Blood Group *
                      </Label>
                      <select
                        id="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
                        required
                        className="mt-2 w-full h-14 text-base px-4 rounded-lg border-2 border-input bg-background text-foreground"
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
                      <Label htmlFor="hospitalName" className="text-base font-medium text-foreground">
                        Hospital Name *
                      </Label>
                      <Input
                        id="hospitalName"
                        type="text"
                        value={formData.hospitalName}
                        onChange={(e) => handleInputChange("hospitalName", e.target.value)}
                        required
                        className="mt-2 h-14 text-base border-2"
                        placeholder="Enter hospital name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="transfusionFrequency" className="text-base font-medium text-foreground">
                        Transfusion Frequency *
                      </Label>
                      <Input
                        id="transfusionFrequency"
                        type="text"
                        value={formData.transfusionFrequency}
                        onChange={(e) => handleInputChange("transfusionFrequency", e.target.value)}
                        required
                        className="mt-2 h-14 text-base border-2"
                        placeholder="e.g., Once a month"
                      />
                    </div>
                  </div>
                )}

                {/* Blood Donor Fields */}
                {selectedRole === "donor" && (
                  <div className="space-y-5 pt-6 border-t-2">
                    <h3 className="font-semibold text-xl text-foreground">Donor Details</h3>

                    <div>
                      <Label htmlFor="bloodGroup" className="text-base font-medium text-foreground">
                        Blood Group *
                      </Label>
                      <select
                        id="bloodGroup"
                        value={formData.bloodGroup}
                        onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
                        required
                        className="mt-2 w-full h-14 text-base px-4 rounded-lg border-2 border-input bg-background text-foreground"
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
                      <Label htmlFor="lastDonationDate" className="text-base font-medium text-foreground">
                        Last Donation Date
                      </Label>
                      <Input
                        id="lastDonationDate"
                        type="date"
                        value={formData.lastDonationDate}
                        onChange={(e) => handleInputChange("lastDonationDate", e.target.value)}
                        className="mt-2 h-14 text-base border-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="willingToDonate" className="text-base font-medium text-foreground">
                        Willing to Donate Regularly? *
                      </Label>
                      <select
                        id="willingToDonate"
                        value={formData.willingToDonatRegularly}
                        onChange={(e) => handleInputChange("willingToDonatRegularly", e.target.value)}
                        required
                        className="mt-2 w-full h-14 text-base px-4 rounded-lg border-2 border-input bg-background text-foreground"
                      >
                        <option value="">Select Option</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Consent Section */}
            {selectedRole && (
              <div className="space-y-5 pt-8 border-t-2">
                <h2 className="text-3xl md:text-4xl font-semibold text-balance text-foreground">Consent</h2>

                <div className="flex items-start gap-4">
                  <Checkbox
                    id="dataConsent"
                    checked={dataConsent}
                    onCheckedChange={setDataConsent}
                    required
                    className="mt-1 border-2 border-primary/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label htmlFor="dataConsent" className="text-base leading-relaxed cursor-pointer text-foreground">
                    I consent to my data being stored and used for connecting with blood donors, patients, and
                    healthcare providers to save lives.
                  </Label>
                </div>

                <div className="flex items-start gap-4">
                  <Checkbox
                    id="emergencyConsent"
                    checked={emergencyConsent}
                    onCheckedChange={setEmergencyConsent}
                    required
                    className="mt-1 border-2 border-primary/60 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label
                    htmlFor="emergencyConsent"
                    className="text-base leading-relaxed cursor-pointer text-foreground"
                  >
                    I agree to receive emergency notifications for blood donation requests in my area.
                  </Label>
                </div>
              </div>
            )}

            {/* Submit Button */}
            {selectedRole && (
              <Button
                type="submit"
                size="lg"
                className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
                disabled={!dataConsent || !emergencyConsent}
              >
                Register & Continue
              </Button>
            )}
          </form>
        </Card>
      </div>
    </div>
  )
}
