"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Heart,
  Droplet,
  Shield,
  Share2,
  BookOpen,
  AlertCircle,
  Activity,
  Play,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Users,
  Building2,
  Globe,
} from "lucide-react"

const bannerImages = [
  {
    url: "/images/image1.jpg",
    title: "Opportunities to improve lives",
    subtitle: "Learn about rare conditions and how you can help",
  },
  {
    url: "/images/image2.jpg",
    title: "Compassionate Care",
    subtitle: "Supporting patients every step of the way",
  },
  {
    url: "/diverse-patients-receiving-blood-transfusion-care.jpg",
    title: "Life-Saving Transfusions",
    subtitle: "Every donation makes a difference",
  },
  {
    url: "/community-support-healthcare-volunteers.jpg",
    title: "Community Support",
    subtitle: "Together we are stronger",
  },
  {
    url: "/images/image4.jpg",
    title: "Be a Hero",
    subtitle: "Your blood donation saves lives",
  },
]

const quickLinks = [
  {
    id: 1,
    title: "Thalassemia International Federation",
    icon: Globe,
    image: "/images/federation.jpg",
    description: "Global resource for Thalassemia information and research",
    link: "https://thalassaemia.org.cy",
  },
  {
    id: 2,
    title: "National Thalassemia Society",
    icon: Users,
    image: "/national-thalassemia-society.jpg",
    description: "Support and advocacy for Thalassemia patients nationwide",
    link: "#",
  },
  {
    id: 3,
    title: "Research & Clinical Trials",
    icon: Activity,
    image: "/medical-research-clinical-trials.jpg",
    description: "Latest advances in Thalassemia treatment",
    link: "#",
  },
]

const awarenessContent = [
  {
    id: 1,
    title: "What is Thalassemia?",
    icon: Activity,
    category: "RARE DISEASES 2025",
    image: "/medical-blood-cells-thalassemia-illustration.jpg",
    didYouKnow: "1 in 8 people carry the thalassemia trait without knowing it",
    content:
      "Thalassemia is an inherited blood disorder affecting hemoglobin production. Early diagnosis and proper treatment are essential.",
    actionText: "Early diagnosis saves lives",
  },
  {
    id: 2,
    title: "Blood Donation Importance",
    icon: Droplet,
    category: "CARDIOVASCULAR HEALTH 2025",
    image: "/images/importance.jpg",
    didYouKnow: "One donation can save up to 3 lives",
    content: "Regular blood transfusions are essential for thalassemia patients. Each donation is a gift of life.",
    actionText: "Be a lifesaver today",
  },
  {
    id: 3,
    title: "Prevention & Screening",
    icon: Shield,
    category: "PREVENTION 2025",
    image: "/genetic-screening-medical-test-prevention.jpg",
    didYouKnow: "Pre-marriage screening can prevent 90% of cases",
    content: "Genetic counseling and carrier screening help prevent thalassemia. Knowledge is prevention.",
    actionText: "Get screened today",
  },
]

const bloodPlatforms = [
  {
    id: 1,
    title: "e-RaktKosh",
    image: "/images/erakt.jpg",
    description:
      "India's largest blood bank management system. Find nearby blood banks, check availability, and request blood online.",
    link: "https://www.eraktkosh.in",
    features: ["Real-time availability", "Nationwide network", "24/7 access"],
  },
  {
    id: 2,
    title: "Blood Bridge",
    image: "/images/bloodbridge.jpg",
    description:
      "Connect with voluntary blood donors instantly. Emergency blood requests and donor network management platform.",
    link: "#",
    features: ["Emergency requests", "Donor matching", "Mobile app"],
  },
  {
    id: 3,
    title: "Indian Red Cross",
    image: "/images/redcross.jpg",
    description: "Trusted blood donation services across India. Organize blood donation camps and volunteer programs.",
    link: "https://www.indianredcross.org",
    features: ["Blood camps", "Volunteer programs", "Trust & reliability"],
  },
  {
    id: 4,
    title: "Friends2Support",
    image: "/images/support.jpg",
    description:
      "Community-driven platform connecting blood donors with patients. Social network for blood donation awareness.",
    link: "#",
    features: ["Community support", "Social network", "Awareness campaigns"],
  },
]

const educationalVideos = [
  {
    id: 1,
    title: "Understanding Thalassemia",
    videoId: "th_GSpXFEp4",
    description: "Learn the basics of Thalassemia",
  },
  {
    id: 2,
    title: "Living Well with Thalassemia",
    videoId: "bxq-TYVlct8",
    description: "Daily life management tips",
  },
  {
    id: 3,
    title: "Blood Transfusion Process",
    videoId: "58Gp8Tiui1E",
    description: "What to expect during transfusion",
  },
]

export default function AwarenessPage({ onBack }) {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % bannerImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const nextBanner = () => {
    setCurrentBannerIndex((prev) => (prev + 1) % bannerImages.length)
  }

  const prevBanner = () => {
    setCurrentBannerIndex((prev) => (prev - 1 + bannerImages.length) % bannerImages.length)
  }

  const handleShare = (title) => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: `Learn more about ${title} on Jeevan Setu`,
          url: window.location.href,
        })
        .then(() => console.log("Successfully shared"))
        .catch((error) => console.log("Error sharing:", error))
    } else {
      const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`
      window.open(shareUrl, "_blank", "width=600,height=400")
    }
  }

  return (
    <div className="min-h-screen healthcare-gradient">
      <div className="pb-6">
        <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <Button variant="ghost" onClick={onBack} className="mb-6 gap-2 hover:bg-primary/10 text-foreground">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </div>

        <Card className="relative overflow-hidden p-0 mb-8 md:mb-12 border-0 shadow-xl rounded-none mx-0">
          <div className="relative h-[400px] sm:h-[450px] md:h-[550px] lg:h-[600px] bg-slate-100">
            {bannerImages.map((banner, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentBannerIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={banner.url || "/placeholder.svg"}
                  alt={banner.title}
                  className="w-full h-full object-contain bg-slate-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>
            ))}

            <button
              onClick={prevBanner}
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all z-10"
              aria-label="Previous banner"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>
            <button
              onClick={nextBanner}
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all z-10"
              aria-label="Next banner"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            <div className="relative h-full flex flex-col justify-end p-6 sm:p-8 md:p-16 text-white z-10">
              <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 mb-4" />
              <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4 text-balance leading-tight">
                {bannerImages[currentBannerIndex].title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/95 max-w-3xl leading-relaxed">
                {bannerImages[currentBannerIndex].subtitle}
              </p>
            </div>

            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {bannerImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBannerIndex(index)}
                  className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all ${
                    index === currentBannerIndex ? "bg-white w-6 sm:w-8" : "bg-white/50"
                  }`}
                  aria-label={`Go to banner ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </Card>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-6 mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground px-2 flex items-center gap-3">
            <Globe className="w-7 h-7 sm:w-9 sm:h-9 text-primary" />
            Quick Resources
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {quickLinks.map((link) => {
              const Icon = link.icon
              return (
                <Card
                  key={link.id}
                  className="group overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 bg-card hover:scale-105"
                  onClick={() => window.open(link.link, "_blank")}
                >
                  <div className="relative h-48 bg-muted">
                    <img
                      src={link.image || "/placeholder.svg"}
                      alt={link.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                      <Icon className="w-6 h-6 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="p-6 space-y-3">
                    <h3 className="font-bold text-xl text-foreground">{link.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{link.description}</p>
                    <Button variant="outline" size="sm" className="w-full gap-2 bg-transparent">
                      <ExternalLink className="w-4 h-4" />
                      Visit Website
                    </Button>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>

        <div className="space-y-8 mb-10 md:mb-12">
          {awarenessContent.map((item, index) => {
            const Icon = item.icon

            return (
              <Card
                key={item.id}
                className="overflow-hidden border-0 shadow-lg bg-card hover:shadow-xl transition-shadow duration-300 rounded-xl"
              >
                <div className="grid sm:grid-cols-5 gap-0">
                  <div className={`relative sm:col-span-2 ${index % 2 === 0 ? "sm:order-1" : "sm:order-2"}`}>
                    <div className="h-72 sm:h-80 bg-muted flex items-center justify-center p-4">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-md shadow-lg">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div
                    className={`sm:col-span-3 p-6 sm:p-8 space-y-4 flex flex-col justify-center ${index % 2 === 0 ? "sm:order-2" : "sm:order-1"}`}
                  >
                    <h3 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">{item.title}</h3>

                    <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">{item.content}</p>

                    <div className="bg-accent/30 border-l-4 border-primary px-4 py-3 rounded-r-lg">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-xs text-foreground mb-1">Did you know?</p>
                          <p className="text-xs text-muted-foreground">{item.didYouKnow}</p>
                        </div>
                      </div>
                    </div>

                    <Button size="default" className="w-full sm:w-auto gap-2" onClick={() => handleShare(item.title)}>
                      <Share2 className="w-4 h-4" />
                      Share this
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Educational Videos Section */}
        <div className="space-y-6 mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground px-2 flex items-center gap-3">
            <Play className="w-7 h-7 sm:w-9 sm:h-9 text-primary" />
            Educational Videos
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-2">
            Watch these helpful videos to learn more about Thalassemia
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {educationalVideos.map((video) => (
              <Card key={video.id} className="overflow-hidden border-2 shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative aspect-video bg-muted">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.videoId}`}
                    title={video.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                  />
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-base sm:text-lg text-foreground leading-tight">{video.title}</h3>
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{video.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="space-y-6 mb-10 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground px-2 flex items-center gap-3">
            <Building2 className="w-7 h-7 sm:w-9 sm:h-9 text-primary" />
            Blood Donation Platforms
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-2">
            Connect with trusted blood donation services and management systems
          </p>

          <div className="grid sm:grid-cols-2 gap-5 md:gap-6">
            {bloodPlatforms.map((platform) => (
              <Card
                key={platform.id}
                className="group overflow-hidden border-2 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                onClick={() => window.open(platform.link, "_blank")}
              >
                <div className="relative h-64 sm:h-72 bg-slate-100 flex items-center justify-center p-6">
                  <img
                    src={platform.image || "/placeholder.svg"}
                    alt={platform.title}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="p-6 space-y-4">
                  <h3 className="font-bold text-2xl text-foreground">{platform.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{platform.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {platform.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="default"
                    size="lg"
                    className="w-full gap-2 group-hover:scale-105 transition-transform"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Visit Platform
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="p-8 sm:p-12 text-center bg-primary/5 border-2 border-primary/20 shadow-xl">
          <Heart className="w-16 h-16 sm:w-20 sm:h-20 text-primary mx-auto mb-6" />
          <h3 className="font-bold text-2xl sm:text-3xl md:text-4xl mb-5 text-foreground">
            Spread the Word, Save Lives
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-8">
            Help us create awareness by sharing these important messages. Together, we can build a stronger support
            network for thalassemia patients.
          </p>
          <Button size="lg" className="gap-2 h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg shadow-lg">
            <Share2 className="w-5 h-5" />
            Share All Content
          </Button>
        </Card>

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
