"use client"

import { useState } from "react"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Check, Heart } from "lucide-react"

export default function Login() {
  const { goToRegistration, login } = useApp()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

const handleSubmit = async (e) => {
  e.preventDefault()

  const payload = {
  email,
  password
}

  try {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })

    const data = await res.json()

    if (!res.ok) {
      alert(data.message || "Login failed")
      return
    }

    login(data)
    setShowSuccess(true)

  } catch (error) {
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
          <h2 className="text-4xl font-bold text-primary mb-4">Login Successful!</h2>
          <p className="text-muted-foreground text-lg">Welcome back to JeevanSetu</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/serene-healthcare-environment-medical-care.jpg')",
        }}
      />
      <div className="absolute inset-0 backdrop-blur-md bg-background/70" />

      <div className="max-w-md w-full space-y-6 relative z-10">
        <div className="text-center">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-5 shadow-xl">
              <Heart className="w-10 h-10 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-4">JeevanSetu</h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-pretty">Bridging Lives with Blood & Care</p>
        </div>

        <Card className="p-8 md:p-10 border-2 bg-card/95 backdrop-blur-sm shadow-2xl">
          <h2 className="text-3xl font-semibold text-center mb-8 text-foreground">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-base font-medium text-foreground">
  Email Address
</Label>
<Input
  id="email"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  required
  className="mt-2 h-14 text-base border-2"
  placeholder="Enter your email address"
/>

            </div>

            <div>
              <Label htmlFor="password" className="text-base font-medium text-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2 h-14 text-base border-2"
                placeholder="Enter your password"
                minLength={6}
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Login
            </Button>

            <div className="text-center pt-6">
              <p className="text-sm text-muted-foreground">
                New user?{" "}
                <button type="button" onClick={goToRegistration} className="text-primary font-semibold hover:underline">
                  Please register first
                </button>
              </p>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}
