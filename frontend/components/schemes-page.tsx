"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Heart,
  Search,
  Filter,
  Sparkles,
  Building2,
  Users,
  FileText,
  ChevronRight,
  CheckCircle2,
  Droplet,
  MapPin,
  IndianRupee,
  Calendar,
  ChevronLeft,
  ExternalLink,
} from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useApp } from "@/lib/app-context"

const heroImages = [
  "/ngo-charity-medical-assistance.jpg",
  "images/sch4.jpg",
  "images/sch3.webp"
  
]

// Mock schemes data
const schemesData = [
  {
    id: 1,
    name: "Pradhan Mantri Jan Arogya Yojana (PMJAY)",
    provider: "Government",
    type: "Insurance",
    state: "All India",
    coverage: "₹5,00,000",
    aiMatched: true,
    image: "images/pmj.jpg",
    benefits: "Free treatment for Thalassemia including blood transfusions, iron chelation therapy",
    eligibility: ["Annual income below ₹5 lakhs", "Must have Ayushman Bharat card", "Indian citizen"],
    documents: ["Aadhaar card", "Income certificate", "Medical records", "Ayushman Bharat card"],
    applicationUrl: "https://pmjay.gov.in/",
    applicationSteps: [
      "Visit nearest Ayushman Mitra center",
      "Submit required documents",
      "Get Ayushman Bharat card",
      "Present card at empanelled hospitals for treatment",
    ],
  },
  {
    id: 2,
    name: "State Thalassemia Relief Fund",
    provider: "Government",
    type: "Subsidy",
    state: "Maharashtra",
    coverage: "₹2,00,000",
    aiMatched: true,
    image: "images/relief.jpg",
    benefits: "Financial assistance for regular blood transfusions and medications",
    eligibility: ["Resident of Maharashtra", "Diagnosed Thalassemia patient", "Annual income below ₹3 lakhs"],
    documents: ["Domicile certificate", "Medical diagnosis report", "Income certificate", "Bank account details"],
    applicationUrl: "#",
    applicationSteps: [
      "Download application from state health department website",
      "Fill form with all required details",
      "Attach supporting documents",
      "Submit at District Health Office",
      "Track application status online",
    ],
  },
  {
    id: 3,
    name: "Thalassemia Welfare Trust Fund",
    provider: "NGO",
    type: "Aid",
    state: "All India",
    coverage: "₹1,50,000",
    aiMatched: true,
    image: "/ngo-charity-medical-assistance.jpg",
    benefits: "Emergency financial support for transfusions and critical care",
    eligibility: ["Registered Thalassemia patient", "Financial hardship proof", "No other active financial aid"],
    documents: ["Patient registration certificate", "Medical emergency report", "Income proof", "Bank statement"],
    applicationUrl: "#",
    applicationSteps: [
      "Register on trust website",
      "Fill online application form",
      "Upload documents",
      "Wait for trust verification",
      "Receive funds within 7-10 days",
    ],
  },
  {
    id: 4,
    name: "Children with Special Needs Scheme",
    provider: "Government",
    type: "Subsidy",
    state: "Karnataka",
    coverage: "₹75,000",
    aiMatched: false,
    benefits: "Educational and medical support for children with Thalassemia",
    eligibility: ["Age below 18 years", "Karnataka resident", "Enrolled in school"],
    documents: ["Birth certificate", "School enrollment proof", "Medical certificate", "Parent income proof"],
    applicationSteps: [
      "Contact District Social Welfare Office",
      "Collect application form",
      "Submit with required documents",
      "Attend verification interview",
      "Receive benefits quarterly",
    ],
  },
  {
    id: 5,
    name: "Red Cross Emergency Medical Fund",
    provider: "NGO",
    type: "Aid",
    state: "All India",
    coverage: "₹1,00,000",
    aiMatched: false,
    benefits: "Emergency blood transfusion and hospitalization coverage",
    eligibility: ["Medical emergency", "Financial inability to pay", "Valid medical prescription"],
    documents: ["Emergency medical report", "Doctor prescription", "Hospital estimate", "ID proof"],
    applicationSteps: [
      "Contact nearest Red Cross office",
      "Explain emergency situation",
      "Provide medical documents",
      "Get approval within 24 hours",
      "Direct payment to hospital",
    ],
  },
]

export default function SchemesPage({ onBack }) {
  const { user } = useApp()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProvider, setSelectedProvider] = useState("All")
  const [selectedType, setSelectedType] = useState("All")
  const [selectedState, setSelectedState] = useState("All")
  const [selectedScheme, setSelectedScheme] = useState(null)
  const [showFilters, setShowFilters] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Auto-rotate banner images
  useState(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const filteredSchemes = schemesData.filter((scheme) => {
    const matchesSearch =
      scheme.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.benefits.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesProvider = selectedProvider === "All" || scheme.provider === selectedProvider
    const matchesType = selectedType === "All" || scheme.type === selectedType
    const matchesState = selectedState === "All" || scheme.state === selectedState || scheme.state === "All India"

    return matchesSearch && matchesProvider && matchesType && matchesState
  })

  const handleApply = (scheme) => {
    console.log(`[v0] Applying for scheme: ${scheme.name}`)
    if (scheme.applicationUrl && scheme.applicationUrl !== "#") {
      window.open(scheme.applicationUrl, "_blank")
    } else {
      alert(`Application process for ${scheme.name} will be available soon. Please check back later.`)
    }
  }

  return (
    <div className="min-h-screen healthcare-gradient">
      <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-7xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-6 gap-2 hover:bg-primary/10 text-foreground">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        {/* Hero Banner */}
        <Card className="relative overflow-hidden p-0 mb-8 md:mb-10 border-0 shadow-xl rounded-2xl">
          <div className="relative h-[300px] sm:h-[350px] md:h-[400px]">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <img src={image || "/placeholder.svg"} alt="Financial Support" className="w-full h-full object-cover" />
                <div className="absolute inset-0 hero-gradient opacity-30" />
              </div>
            ))}

            <button
              onClick={() => setCurrentImageIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length)}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all z-10"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
            <button
              onClick={() => setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all z-10"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            <div className="relative h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-12 z-10">
              <FileText className="w-12 h-12 sm:w-16 sm:h-16 text-white mb-4" />
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white mb-3 sm:mb-4 text-balance leading-tight">
                Schemes & Financial Support
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/95 max-w-2xl leading-relaxed text-pretty">
                Find financial help for treatment and transfusions
              </p>
            </div>

            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {heroImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${
                    index === currentImageIndex ? "bg-white w-6 sm:w-8" : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </Card>

        {/* Patient Profile Summary */}
        <Card className="p-6 sm:p-8 mb-8 shadow-lg border-2">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Users className="w-6 h-6 text-primary" />
            Your Profile
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Age</p>
              <p className="font-semibold text-foreground">{user?.age || "25"} years</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Blood Group</p>
              <p className="font-semibold text-foreground flex items-center gap-1">
                <Droplet className="w-4 h-4 text-primary" />
                {user?.bloodGroup || "B+"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Location</p>
              <p className="font-semibold text-foreground flex items-center gap-1">
                <MapPin className="w-4 h-4 text-primary" />
                {user?.city || "Chennai"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Income Range</p>
              <p className="font-semibold text-foreground flex items-center gap-1">
                <IndianRupee className="w-4 h-4 text-primary" />
                {"< 5L"}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Treatment</p>
              <p className="font-semibold text-foreground flex items-center gap-1">
                <Calendar className="w-4 h-4 text-primary" />
                Monthly
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">State</p>
              <p className="font-semibold text-foreground">{user?.state || "TamilNadu"}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-4 bg-accent/30 p-3 rounded-lg">
            💡 Based on your profile, we recommend schemes that match your eligibility
          </p>
        </Card>

        {/* AI Recommendations */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
            <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
            Recommended for You
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mb-6">
            AI-matched schemes based on your profile and eligibility
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filteredSchemes
              .filter((s) => s.aiMatched)
              .map((scheme) => (
                <Card
                  key={scheme.id}
                  className="p-6 hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 hover:border-primary relative group"
                  onClick={() => setSelectedScheme(scheme)}
                >
                  <Badge className="absolute top-4 right-4 bg-primary/20 text-primary border-primary gap-1">
                    <Sparkles className="w-3 h-3" />
                    AI Matched
                  </Badge>
                  {scheme.image && (
                    <div className="relative h-36 -mx-6 -mt-6 mb-4 overflow-hidden">
                      <img
                        src={scheme.image || "/placeholder.svg"}
                        alt={scheme.name}
                        className="w-full h-full object-contain bg-white"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                  )}
                  <div className="space-y-4 mt-2">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      {scheme.provider === "Government" ? (
                        <Building2 className="w-6 h-6 text-primary" />
                      ) : (
                        <Users className="w-6 h-6 text-primary" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-2 leading-tight">{scheme.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{scheme.benefits}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{scheme.provider}</Badge>
                      <Badge variant="outline">{scheme.type}</Badge>
                      <Badge variant="outline">{scheme.state}</Badge>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div>
                        <p className="text-xs text-muted-foreground">Coverage</p>
                        <p className="font-bold text-lg text-primary">{scheme.coverage}</p>
                      </div>
                      <Button size="sm" className="gap-1 group-hover:scale-105 transition-transform">
                        View Details
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>

        {/* Search & Filter */}
        <Card className="p-6 sm:p-8 mb-8 shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
            <Search className="w-7 h-7 sm:w-8 sm:h-8 text-primary" />
            Search All Schemes
          </h2>

          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search by scheme name or benefits..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button
                variant="outline"
                size="lg"
                onClick={() => setShowFilters(!showFilters)}
                className="gap-2 h-12 sm:w-auto"
              >
                <Filter className="w-5 h-5" />
                Filters
                {showFilters ? (
                  <ChevronRight className="w-4 h-4 rotate-90 transition-transform" />
                ) : (
                  <ChevronRight className="w-4 h-4 transition-transform" />
                )}
              </Button>
            </div>

            {showFilters && (
              <div className="grid sm:grid-cols-3 gap-4 p-4 bg-accent/20 rounded-lg">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Provider</label>
                  <select
                    value={selectedProvider}
                    onChange={(e) => setSelectedProvider(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border bg-background"
                  >
                    <option>All</option>
                    <option>Government</option>
                    <option>NGO</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border bg-background"
                  >
                    <option>All</option>
                    <option>Insurance</option>
                    <option>Subsidy</option>
                    <option>Aid</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">State</label>
                  <select
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border bg-background"
                  >
                    <option>All</option>
                    <option>All India</option>
                    <option>Maharashtra</option>
                    <option>Karnataka</option>
                    <option>Tamil Nadu</option>
                    <option>Gujarat</option>
                    <option>Delhi</option>
                    <option>West Bengal</option>
                    <option>Rajasthan</option>
                    <option>Punjab</option>
                  </select>
                </div>
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            Found {filteredSchemes.length} scheme{filteredSchemes.length !== 1 ? "s" : ""} matching your criteria
          </p>
        </Card>

        {/* All Schemes */}
        <div className="space-y-5">
          {filteredSchemes.map((scheme) => (
            <Card
              key={scheme.id}
              className="p-6 hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/50"
              onClick={() => setSelectedScheme(scheme)}
            >
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  {scheme.provider === "Government" ? (
                    <Building2 className="w-8 h-8 text-primary" />
                  ) : (
                    <Users className="w-8 h-8 text-primary" />
                  )}
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-xl text-foreground mb-1">{scheme.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{scheme.provider}</Badge>
                        <Badge variant="outline">{scheme.type}</Badge>
                        <Badge variant="outline">{scheme.state}</Badge>
                        {scheme.aiMatched && (
                          <Badge className="bg-primary/20 text-primary border-primary gap-1">
                            <Sparkles className="w-3 h-3" />
                            AI Match
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Coverage</p>
                      <p className="font-bold text-2xl text-primary">{scheme.coverage}</p>
                    </div>
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{scheme.benefits}</p>
                  <Button size="lg" className="gap-2 w-full sm:w-auto">
                    View Full Details
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Scheme Detail Dialog */}
        <Dialog open={!!selectedScheme} onOpenChange={(open) => !open && setSelectedScheme(null)}>
          <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                {selectedScheme?.provider === "Government" ? (
                  <Building2 className="w-7 h-7 text-primary" />
                ) : (
                  <Users className="w-7 h-7 text-primary" />
                )}
                {selectedScheme?.name}
              </DialogTitle>
              <DialogDescription className="text-base">{selectedScheme?.benefits}</DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              <div className="bg-primary/5 p-6 rounded-lg border-2 border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">Coverage Amount</p>
                <p className="text-3xl font-bold text-primary">{selectedScheme?.coverage}</p>
              </div>

              <div>
                <h4 className="font-bold text-lg text-foreground mb-3 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Benefits
                </h4>
                <p className="text-base text-muted-foreground leading-relaxed">{selectedScheme?.benefits}</p>
              </div>

              <div>
                <h4 className="font-bold text-lg text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                  Eligibility Criteria
                </h4>
                <ul className="space-y-2">
                  {selectedScheme?.eligibility.map((criterion, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      {criterion}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg text-foreground mb-3 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Required Documents
                </h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {selectedScheme?.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-accent/30 p-3 rounded-lg">
                      <FileText className="w-4 h-4 text-primary" />
                      <span className="text-sm text-foreground">{doc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-lg text-foreground mb-3">Application Steps</h4>
                <div className="space-y-3">
                  {selectedScheme?.applicationSteps.map((step, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm flex-shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed pt-1">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  size="lg"
                  className="flex-1 gap-2"
                  onClick={() => {
                    handleApply(selectedScheme)
                    setSelectedScheme(null)
                  }}
                >
                  <ExternalLink className="w-5 h-5" />
                  Apply Now
                </Button>
                <Button size="lg" variant="outline" className="flex-1 bg-transparent">
                  Save for Later
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2025 Jeevan Setu. All rights reserved. Made with <Heart className="w-4 h-4 inline text-primary" /> for
              Thalassemia patients.
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
