"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import SearchFilters from "@/components/search-filters"
import ProgramCard from "@/components/program-card"
import { supabase } from "@/lib/supabase"
import type { Database } from "@/types/supabase"

type Program = Database["public"]["Tables"]["programs"]["Row"] & { distance_km?: number }

interface SearchFilterParams {
  category?: string
  ageGroup?: string
  maxPrice?: number
  location?: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const [programs, setPrograms] = useState<Program[]>([])
  const [loading, setLoading] = useState(true)
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  useEffect(() => {
    const query = searchParams.get("q") || ""
    const category = searchParams.get("category") || undefined

    handleSearch(query, { category })
    getUserLocation()
  }, [searchParams])

  const getUserLocation = () => {
    // TODO: Implement geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        },
        (error) => {
          console.error("Error getting location:", error)
        },
      )
    }
  }

  const handleSearch = async (query: string, filters: SearchFilterParams) => {
    setLoading(true)

    try {
      // TODO: Implement location-based search using Supabase RPC function
      if (userLocation) {
        // Use nearby_programs RPC function for location-based search
        const { data, error } = await supabase.rpc("nearby_programs", {
          lat: userLocation.lat,
          lng: userLocation.lng,
          radius_km: 50,
        })

        if (error) throw error

        // TODO: Apply additional filters to the results
        let filteredData = data || []

        if (query) {
          filteredData = filteredData.filter(
            (program) =>
              program.name.toLowerCase().includes(query.toLowerCase()) ||
              program.description.toLowerCase().includes(query.toLowerCase()),
          )
        }

        if (filters.category) {
          filteredData = filteredData.filter((program) => program.category === filters.category)
        }

        if (filters.maxPrice) {
          filteredData = filteredData.filter((program) => program.price <= filters.maxPrice!)
        }

        setPrograms(filteredData)
      } else {
        // Fallback to regular search without location
        let queryBuilder = supabase.from("programs").select("*")

        if (query) {
          queryBuilder = queryBuilder.or(`name.ilike.%${query}%,description.ilike.%${query}%`)
        }

        if (filters.category) {
          queryBuilder = queryBuilder.eq("category", filters.category)
        }

        if (filters.maxPrice) {
          queryBuilder = queryBuilder.lte("price", filters.maxPrice)
        }

        const { data, error } = await queryBuilder

        if (error) throw error
        setPrograms(data || [])
      }
    } catch (error) {
      console.error("Error searching programs:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Results</h1>
        <SearchFilters onSearch={handleSearch} />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
              <div className="h-48 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="mb-6">
            <p className="text-gray-600">
              Found {programs.length} activities
              {userLocation && " near you"}
            </p>
          </div>

          {programs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((program) => (
                <ProgramCard key={program.id} program={program} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or browse all activities.</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
