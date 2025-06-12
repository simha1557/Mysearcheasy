import { notFound } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Clock, Users, Star } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { formatPrice } from "@/lib/utils"
import EnrollButton from "./enroll-button"
import ReviewSection from "./review-section"

interface ProgramPageProps {
  params: { id: string }
}

export default async function ProgramPage({ params }: ProgramPageProps) {
  // TODO: Fetch program details from Supabase
  const { data: program, error } = await supabase
    .from("programs")
    .select(`
      *,
      profiles:business_id (
        first_name,
        last_name
      )
    `)
    .eq("id", params.id)
    .single()

  if (error || !program) {
    notFound()
  }

  // TODO: Fetch reviews for this program
  const { data: reviews } = await supabase
    .from("reviews")
    .select(`
      *,
      profiles:parent_id (
        first_name,
        last_name
      )
    `)
    .eq("program_id", params.id)
    .order("created_at", { ascending: false })

  // TODO: Calculate average rating
  const averageRating = reviews?.length ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length : 0

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Program Image */}
          <div className="relative h-96 rounded-lg overflow-hidden mb-6">
            <Image
              src={program.image_url || "/placeholder-activity.jpg"}
              alt={program.name}
              fill
              className="object-cover"
            />
            <Badge className="absolute top-4 left-4" variant="secondary">
              {program.category}
            </Badge>
          </div>

          {/* Program Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{program.name}</h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span>
                    {averageRating.toFixed(1)} ({reviews?.length || 0} reviews)
                  </span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {program.location}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-3">Description</h2>
              <p className="text-gray-700 leading-relaxed">{program.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">Schedule</p>
                  <p className="text-sm text-gray-600">{program.schedule_type}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Users className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">Age Group</p>
                  <p className="text-sm text-gray-600">{program.age_group}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="font-medium">Location</p>
                  <p className="text-sm text-gray-600">{program.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <ReviewSection programId={params.id} reviews={reviews || []} />
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <CardHeader>
              <CardTitle className="text-2xl text-green-600">{formatPrice(program.price)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <EnrollButton programId={params.id} price={program.price} />

              <div className="text-sm text-gray-600">
                <p>• Secure payment with Stripe</p>
                <p>• Instant enrollment confirmation</p>
                <p>• Full refund if cancelled 24h before</p>
              </div>

              {/* Business Info */}
              <div className="border-t pt-4">
                <h3 className="font-medium mb-2">Provided by</h3>
                <p className="text-sm text-gray-600">
                  {program.profiles?.first_name} {program.profiles?.last_name}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
