"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface EnrollButtonProps {
  programId: string
  price: number
}

export default function EnrollButton({ programId, price }: EnrollButtonProps) {
  const { isSignedIn, user } = useUser()
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleEnroll = async () => {
    if (!isSignedIn) {
      router.push("/sign-in")
      return
    }

    setLoading(true)

    try {
      // TODO: Create Stripe checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          programId,
          price,
          userId: user?.id,
        }),
      })

      const { url } = await response.json()

      if (url) {
        window.location.href = url
      }
    } catch (error) {
      console.error("Error creating checkout session:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleEnroll} disabled={loading} className="w-full" size="lg">
      {loading ? "Processing..." : "Enroll Now"}
    </Button>
  )
}
