import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, Clock, Users } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import type { Database } from "@/types/supabase"

type Program = Database["public"]["Tables"]["programs"]["Row"]

interface ProgramCardProps {
  program: Program & { distance_km?: number }
}

export default function ProgramCard({ program }: ProgramCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={program.image_url || "/placeholder-activity.jpg"}
          alt={program.name}
          fill
          className="object-cover"
        />
        <Badge className="absolute top-2 left-2" variant="secondary">
          {program.category}
        </Badge>
      </div>

      <CardHeader>
        <CardTitle className="text-lg">{program.name}</CardTitle>
        <p className="text-sm text-gray-600 line-clamp-2">{program.description}</p>
      </CardHeader>

      <CardContent>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="h-4 w-4 mr-1" />
            {program.location}
            {program.distance_km && (
              <span className="ml-2 text-blue-600">({program.distance_km.toFixed(1)}km away)</span>
            )}
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Clock className="h-4 w-4 mr-1" />
            {program.schedule_type}
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Users className="h-4 w-4 mr-1" />
            Ages {program.age_group}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-green-600">{formatPrice(program.price)}</span>
          <Link href={`/programs/${program.id}`}>
            <Button>View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
