"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Verify payment status with Stripe
    if (sessionId) {
      // Payment verification logic here
      setLoading(false)
    }
  }, [sessionId])

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Confirming your enrollment...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <Card>
        <CardHeader className="text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <CardTitle className="text-2xl text-green-600">Enrollment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Thank you for your enrollment! You should receive a confirmation email shortly.
          </p>

          <div className="space-y-2">
            <p className="text-sm text-gray-500">What's next?</p>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Check your email for enrollment details</li>
              <li>• Mark your calendar for the activity dates</li>
              <li>• Contact us if you have any questions</li>
            </ul>
          </div>

          <div className="flex gap-4 justify-center pt-4">
            <Link href="/">
              <Button variant="outline">Browse More Activities</Button>
            </Link>
            <Link href="/my-enrollments">
              <Button>View My Enrollments</Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
