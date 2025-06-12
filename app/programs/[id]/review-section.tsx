"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"
import type { Database } from "@/types/supabase"

type Review = Database["public"]["Tables"]["reviews"]["Row"] & {
  profiles: {
    first_name: string | null
    last_name: string | null
  } | null
}

interface ReviewSectionProps {
  programId: string
  reviews: Review[]
}

export default function ReviewSection({ programId, reviews }: ReviewSectionProps) {
  const { isSignedIn } = useUser()
  const [showReviewForm, setShowReviewForm] = useState(false)

  // TODO: Implement review submission functionality
  const handleSubmitReview = async (rating: number, comment: string) => {
    // TODO: Submit review to Supabase
    console.log("Submit review:", { programId, rating, comment })
  }

  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Reviews ({reviews.length})</h2>
        {isSignedIn && (
          <Button variant="outline" onClick={() => setShowReviewForm(!showReviewForm)}>
            Write a Review
          </Button>
        )}
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Write a Review</CardTitle>
          </CardHeader>
          <CardContent>
            {/* TODO: Implement review form */}
            <p className="text-gray-600">Review form coming soon...</p>
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="font-medium">
                    {review.profiles?.first_name} {review.profiles?.last_name}
                  </p>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-500">{new Date(review.created_at).toLocaleDateString()}</p>
              </div>
              {review.comment && <p className="text-gray-700 mt-2">{review.comment}</p>}
            </CardContent>
          </Card>
        ))}

        {reviews.length === 0 && (
          <p className="text-gray-600 text-center py-8">No reviews yet. Be the first to review this activity!</p>
        )}
      </div>
    </div>
  )
}
