"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Apple, Droplet, Heart, AlertCircle, Sun, Moon, Activity } from "lucide-react"
import Navigation from "@/components/navigation"

interface DietLifestylePageProps {
  onBack: () => void
}

export default function DietLifestylePage({ onBack }: DietLifestylePageProps) {
  const foodsToEat = [
    { name: "Leafy Greens", description: "Spinach, kale rich in folate", icon: "🥬" },
    { name: "Fruits", description: "Oranges, berries, bananas", icon: "🍊" },
    { name: "Whole Grains", description: "Brown rice, oats, quinoa", icon: "🌾" },
    { name: "Calcium Sources", description: "Milk, yogurt, cheese", icon: "🥛" },
    { name: "Vitamin D Foods", description: "Eggs, mushrooms, fortified foods", icon: "🥚" },
  ]

  const foodsToLimit = [
    { name: "Red Meat", description: "High in iron, may increase overload", icon: "🥩" },
    { name: "Iron Supplements", description: "Unless prescribed by doctor", icon: "💊" },
    { name: "Fortified Cereals", description: "Often high in added iron", icon: "🥣" },
    { name: "Liver & Organ Meats", description: "Very high iron content", icon: "🍖" },
  ]

  const dailyHabits = [
    { title: "Stay Hydrated", description: "Drink 8-10 glasses of water daily", icon: Droplet },
    { title: "Quality Sleep", description: "Get 7-8 hours of restful sleep", icon: Moon },
    { title: "Gentle Exercise", description: "Walking, yoga, light stretching", icon: Activity },
    { title: "Stress Management", description: "Meditation, deep breathing", icon: Sun },
  ]

  const careTips = [
    "Wash hands frequently to prevent infections",
    "Attend all scheduled transfusions and checkups",
    "Take prescribed medications on time",
    "Avoid self-medication without doctor consultation",
    "Keep emergency contact numbers handy",
    "Maintain a health diary for tracking",
  ]

  return (
    <div className="min-h-screen healthcare-gradient">
      <Navigation currentPage="diet" setCurrentPage={() => {}} />

      <div className="px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <Button onClick={onBack} variant="ghost" className="mb-4" size="lg">
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Dashboard
        </Button>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Apple className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Diet & Lifestyle Guidance</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Living well with Thalassemia means taking care of your whole self - body, mind, and spirit. Here's your
            friendly guide to daily wellness.
          </p>
        </div>

        {/* Foods to Eat */}
        <Card className="p-6 md:p-8 border-2 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground flex items-center gap-3">
            <span className="text-3xl">✅</span> Foods to Include
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {foodsToEat.map((food, index) => (
              <Card key={index} className="p-4 hover:shadow-md transition-shadow bg-primary/5 border-primary/20">
                <div className="flex items-start gap-3">
                  <span className="text-3xl flex-shrink-0">{food.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{food.name}</h3>
                    <p className="text-sm text-muted-foreground">{food.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Foods to Limit */}
        <Card className="p-6 md:p-8 border-2 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground flex items-center gap-3">
            <span className="text-3xl">⚠️</span> Foods to Limit or Avoid
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {foodsToLimit.map((food, index) => (
              <Card
                key={index}
                className="p-4 hover:shadow-md transition-shadow bg-destructive/5 border-destructive/20"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl flex-shrink-0">{food.icon}</span>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">{food.name}</h3>
                    <p className="text-sm text-muted-foreground">{food.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Card>

        {/* Daily Habits */}
        <Card className="p-6 md:p-8 border-2 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground flex items-center gap-3">
            <Heart className="w-8 h-8 text-primary" />
            Hydration & Daily Habits
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {dailyHabits.map((habit, index) => {
              const Icon = habit.icon
              return (
                <Card key={index} className="p-5 hover:shadow-md transition-shadow bg-accent/10 border-accent/30">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground mb-1">{habit.title}</h3>
                      <p className="text-sm text-muted-foreground">{habit.description}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>
        </Card>

        {/* Lifestyle Care Tips */}
        <Card className="p-6 md:p-8 border-2 shadow-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-foreground flex items-center gap-3">
            <Activity className="w-8 h-8 text-primary" />
            Lifestyle Care Tips
          </h2>
          <div className="space-y-3">
            {careTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/10 transition-colors">
                <span className="text-primary text-xl flex-shrink-0">•</span>
                <p className="text-base text-foreground">{tip}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Important Notice */}
        <Card className="p-6 md:p-8 border-2 border-amber-500/50 bg-amber-50 dark:bg-amber-950/20 shadow-lg">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-8 h-8 text-amber-600 dark:text-amber-500 flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-amber-900 dark:text-amber-100">Important Reminder</h3>
              <p className="text-base text-amber-800 dark:text-amber-200 leading-relaxed">
                Diet and lifestyle changes support your health, but they cannot treat Thalassemia on their own. Always
                follow your doctor's advice, attend regular checkups, and take prescribed medications. When in doubt,
                ask your healthcare team.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
