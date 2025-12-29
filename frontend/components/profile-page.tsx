"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, User, Phone, MapPin, Droplet, Edit2, Save, X, IndianRupee, Map } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

export default function ProfilePage({ onBack }) {
  const { user, logout } = useApp()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    mobile: user?.mobile || "",
    city: user?.city || "",
    state: user?.state || "",
    bloodGroup: user?.bloodGroup || "",
    incomeRange: user?.incomeRange || "< 5 lakhs",
  })
  const [consents, setConsents] = useState({
    dataSharing: true,
    emergencyNotifications: true,
  })

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = () => {
    console.log("[v0] Profile Updated:", formData, consents)
    setIsEditing(false)
    alert("Profile updated successfully!")
  }

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout()
    }
  }

  return (
    <div className="min-h-screen healthcare-gradient">
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-3xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-6 gap-2 hover:bg-primary/10 text-foreground">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-xl flex items-center justify-center">
              <User className="w-6 h-6 sm:w-7 sm:h-7 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Profile & Settings</h1>
          </div>
          {!isEditing && (
            <Button variant="outline" onClick={() => setIsEditing(true)} className="gap-2 bg-transparent">
              <Edit2 className="w-4 h-4" />
              <span className="hidden sm:inline">Edit</span>
            </Button>
          )}
        </div>

        <Card className="p-6 sm:p-8 mb-6 shadow-lg border-2">
          <h2 className="text-xl font-semibold mb-6 text-foreground">Personal Information</h2>

          <div className="space-y-5">
            <div>
              <Label htmlFor="fullName" className="text-base flex items-center gap-2 mb-2">
                <User className="w-4 h-4" />
                Full Name
              </Label>
              {isEditing ? (
                <Input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  className="h-12"
                />
              ) : (
                <p className="text-lg font-medium px-3 py-2 bg-muted/50 rounded-lg">{formData.fullName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="mobile" className="text-base flex items-center gap-2 mb-2">
                <Phone className="w-4 h-4" />
                Mobile Number
              </Label>
              {isEditing ? (
                <Input
                  id="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => handleInputChange("mobile", e.target.value)}
                  className="h-12"
                />
              ) : (
                <p className="text-lg font-medium px-3 py-2 bg-muted/50 rounded-lg">{formData.mobile}</p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="city" className="text-base flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4" />
                  City
                </Label>
                {isEditing ? (
                  <Input
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="h-12"
                  />
                ) : (
                  <p className="text-lg font-medium px-3 py-2 bg-muted/50 rounded-lg">{formData.city}</p>
                )}
              </div>

              <div>
                <Label htmlFor="state" className="text-base flex items-center gap-2 mb-2">
                  <Map className="w-4 h-4" />
                  State
                </Label>
                {isEditing ? (
                  <select
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    className="w-full h-12 px-3 rounded-md border bg-background"
                  >
                    <option value="">Select State</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Delhi">Delhi</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Punjab">Punjab</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                ) : (
                  <p className="text-lg font-medium px-3 py-2 bg-muted/50 rounded-lg">{formData.state}</p>
                )}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
  <Label className="text-base flex items-center gap-2 mb-2">
    <Droplet className="w-4 h-4" />
    Blood Group
  </Label>

  {isEditing ? (
    <select
      value={formData.bloodGroup}
      onChange={(e) => handleInputChange("bloodGroup", e.target.value)}
      className="w-full h-12 px-3 rounded-md border bg-background"
    >
      <option value="">Select Blood Group</option>
      <option value="A+">A+</option>
      <option value="A-">A-</option>
      <option value="B+">B+</option>
      <option value="B-">B-</option>
      <option value="AB+">AB+</option>
      <option value="AB-">AB-</option>
      <option value="O+">O+</option>
      <option value="O-">O-</option>
    </select>
  ) : (
    <p className="text-lg font-medium px-3 py-2 bg-primary/10 text-primary rounded-lg">
      {formData.bloodGroup}
    </p>
  )}
</div>


              <div>
                <Label htmlFor="incomeRange" className="text-base flex items-center gap-2 mb-2">
                  <IndianRupee className="w-4 h-4" />
                  Annual Income Range
                </Label>
                {isEditing ? (
                  <select
                    id="incomeRange"
                    value={formData.incomeRange}
                    onChange={(e) => handleInputChange("incomeRange", e.target.value)}
                    className="w-full h-12 px-3 rounded-md border bg-background"
                  >
                    <option value="< 2 lakhs">Less than ₹2 lakhs</option>
                    <option value="2-5 lakhs">₹2 - ₹5 lakhs</option>
                    <option value="5-10 lakhs">₹5 - ₹10 lakhs</option>
                    <option value="> 10 lakhs">More than ₹10 lakhs</option>
                  </select>
                ) : (
                  <p className="text-lg font-medium px-3 py-2 bg-muted/50 rounded-lg">{formData.incomeRange}</p>
                )}
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <Button onClick={handleSave} className="flex-1 gap-2">
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
              <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1 gap-2 bg-transparent">
                <X className="w-4 h-4" />
                Cancel
              </Button>
            </div>
          )}
        </Card>

        <Card className="p-6 sm:p-8 mb-6 shadow-lg border-2">
          <h2 className="text-xl font-semibold mb-6 text-foreground">Privacy & Consent</h2>

          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-accent/20 rounded-lg border-2 border-primary/20">
              <Checkbox
                id="dataSharing"
                checked={consents.dataSharing}
                onCheckedChange={(checked) => setConsents((prev) => ({ ...prev, dataSharing: checked }))}
                className="mt-1 border-2"
              />
              <Label htmlFor="dataSharing" className="text-base leading-relaxed cursor-pointer">
                Allow my data to be shared with blood donors, patients, and healthcare providers to save lives
              </Label>
            </div>

            <div className="flex items-start gap-3 p-4 bg-accent/20 rounded-lg border-2 border-primary/20">
              <Checkbox
                id="emergencyNotifications"
                checked={consents.emergencyNotifications}
                onCheckedChange={(checked) => setConsents((prev) => ({ ...prev, emergencyNotifications: checked }))}
                className="mt-1 border-2"
              />
              <Label htmlFor="emergencyNotifications" className="text-base leading-relaxed cursor-pointer">
                Receive emergency notifications for blood donation requests in my area
              </Label>
            </div>
          </div>
        </Card>

        <Card className="p-6 sm:p-8 bg-muted/50 mb-6 shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-lg mb-1 text-foreground">Account Role</h3>
              <p className="text-base text-muted-foreground capitalize">{user?.role || "Patient"}</p>
            </div>
          </div>
        </Card>

        <Button variant="destructive" onClick={handleLogout} className="w-full h-12 text-base shadow-lg">
          Logout from JeevanSetu
        </Button>
      </div>
    </div>
  )
}
