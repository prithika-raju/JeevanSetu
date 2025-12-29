"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, Droplet, Clock } from "lucide-react"

const mockTransfusions = [
  {
    id: 1,
    date: "2025-12-25",
    hospital: "City General Hospital",
    units: 2,
    status: "completed",
    bloodGroup: "B+",
  },
  {
    id: 2,
    date: "2025-11-25",
    hospital: "Central Medical Center",
    units: 2,
    status: "completed",
    bloodGroup: "B+",
  },
  {
    id: 3,
    date: "2025-10-25",
    hospital: "City General Hospital",
    units: 2,
    status: "completed",
    bloodGroup: "B+",
  },
  {
    id: 4,
    date: "2026-01-25",
    hospital: "City General Hospital",
    units: 2,
    status: "upcoming",
    bloodGroup: "B+",
  },
]

export default function TransfusionsPage({ onBack }) {
  const upcoming = mockTransfusions.filter((t) => t.status === "upcoming")
  const past = mockTransfusions.filter((t) => t.status === "completed")

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary/5 to-white">
      <div className="px-4 py-6 max-w-4xl mx-auto">
        <Button variant="ghost" onClick={onBack} className="mb-4 gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <Calendar className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-3xl font-bold">My Transfusions</h1>
        </div>

        {/* Upcoming Transfusions */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Upcoming</h2>
          {upcoming.length > 0 ? (
            <div className="space-y-3">
              {upcoming.map((transfusion) => (
                <Card key={transfusion.id} className="p-5 border-2 border-primary/30 bg-primary/5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-5 h-5 text-primary" />
                        <span className="font-semibold text-lg">{transfusion.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground mb-1">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{transfusion.hospital}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Droplet className="w-4 h-4" />
                        <span className="text-sm">
                          {transfusion.units} units - {transfusion.bloodGroup}
                        </span>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">
                      Upcoming
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-6 text-center">
              <Clock className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
              <p className="text-muted-foreground">No upcoming transfusions scheduled</p>
            </Card>
          )}
        </div>

        {/* Past Transfusions */}
        <div>
          <h2 className="text-2xl font-semibold mb-4">Past Transfusions</h2>
          <div className="space-y-3">
            {past.map((transfusion) => (
              <Card key={transfusion.id} className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar className="w-5 h-5 text-muted-foreground" />
                      <span className="font-semibold">{transfusion.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{transfusion.hospital}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Droplet className="w-4 h-4" />
                      <span className="text-sm">
                        {transfusion.units} units - {transfusion.bloodGroup}
                      </span>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    Completed
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
