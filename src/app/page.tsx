"use client"

import { useState, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Scale, Eye, EyeOff } from "lucide-react"
import Image from "next/image"
import { AuthService } from "@/services/auth.service"
import { toast } from "sonner"
import { useAuthStore } from "@/stores/useAuthStore"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const loginStore = useAuthStore()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await AuthService.login(email, password)
      loginStore.login(response.user, response.accessToken)
      
      toast.success("Log In Successful!", {
        description: "You have been successfully logged in, welcome back.",
      })

      router.push('/dashboard')
    } catch (error: any) {
      console.log("An error occurred: ", error)

      if (error.status == 401) {
        toast.error("Failed to log In!", {
          description: "You have entered wrong credentials",
        })
      } else {
        toast.error("An unexpected error occured!", {
          description: "Check your network and retry. Contact support if error persist!",
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="min-h-screen w-full fixed flex flex-col lg:flex-row">
      {/* Left side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-background order-2 lg:order-1">
        <div className="w-full max-w-sm sm:max-w-md space-y-6 sm:space-y-8">
          {/* Logo and Header */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex flex-col items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-22 lg:h-22 rounded-lg bg-white">
                <Image 
                  src={"/Logo blue.png"} 
                  alt={"logo"} 
                  width={80} 
                  height={80}
                  className="object-contain w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20"
                  priority
                />
              </div>
              <div className="text-center">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">Cabinet D'Avocat</h1>
                <p className="text-sm sm:text-md font-semibold text-[#c2a349]">D. HAPPI</p>
              </div>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground text-center lg:text-left">
              Welcome back
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground text-center lg:text-left">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm sm:text-base">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-10 sm:h-11 text-sm sm:text-base"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm sm:text-base">Password</Label>
                <button 
                  type="button" 
                  className="text-xs sm:text-sm text-[#c2a349] hover:text-[#d4b55f] transition-colors"
                  onClick={() => {/* Add forgot password logic */}}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-10 sm:h-11 text-sm sm:text-base pr-10"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 sm:h-5 sm:w-5" />
                  ) : (
                    <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-10 sm:h-11 bg-[#152438] hover:bg-[#1e3a5f] text-white text-sm sm:text-base"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-xs sm:text-sm text-muted-foreground">
            Secure access to your legal management system
          </p>
        </div>
      </div>

      {/* Right side - Decorative Pattern */}
      <div className="w-full lg:w-1/2 bg-[#152438] relative overflow-hidden order-1 lg:order-2 min-h-[40vh] lg:min-h-screen">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="stripes"
                x="0"
                y="0"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <line x1="0" y1="0" x2="0" y2="40" stroke="#c2a349" strokeWidth="2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#stripes)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center p-6 sm:p-8 lg:p-16 text-white h-full">
          <div className="space-y-4 sm:space-y-6 max-w-lg mx-auto lg:mx-0">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-[#c2a349] mb-2 sm:mb-4">
              <Scale className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[#152438]" />
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-balance text-center lg:text-left">
              Professional Legal Management System
            </h2>

            <p className="text-sm sm:text-base lg:text-lg text-white/80 leading-relaxed text-center lg:text-left">
              Streamline your legal practice with our comprehensive case management platform. Secure, efficient, and
              designed for modern law firms.
            </p>

            <div className="space-y-3 sm:space-y-4 pt-4 sm:pt-6 lg:pt-8">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c2a349] mt-1.5 sm:mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base mb-1">Case Management</h3>
                  <p className="text-xs sm:text-sm text-white/70">Organize and track all your cases in one place</p>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c2a349] mt-1.5 sm:mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base mb-1">Document Control</h3>
                  <p className="text-xs sm:text-sm text-white/70">Secure storage and version control for legal documents</p>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#c2a349] mt-1.5 sm:mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-sm sm:text-base mb-1">Team Collaboration</h3>
                  <p className="text-xs sm:text-sm text-white/70">Work seamlessly with your legal team</p>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative elements - Hidden on mobile, visible on larger screens */}
          <div className="hidden lg:block absolute top-10 right-10 w-32 h-32 border-2 border-[#c2a349]/20 rounded-full" />
          <div className="hidden lg:block absolute bottom-20 right-32 w-20 h-20 border-2 border-[#c2a349]/20 rounded-full" />
          
          {/* Mobile decorative elements */}
          <div className="lg:hidden absolute top-4 right-4 w-16 h-16 border-2 border-[#c2a349]/20 rounded-full" />
          <div className="lg:hidden absolute bottom-8 right-8 w-12 h-12 border-2 border-[#c2a349]/20 rounded-full" />
        </div>
      </div>
    </div>
  )
}