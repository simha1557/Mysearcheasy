"use client"
import { Navigation } from "./components/Navigation"
import { HeroSection } from "./components/HeroSection"
import { FeaturesSection } from "./components/FeaturesSection"
import { TestimonialsSection } from "./components/TestimonialsSection"
import { FAQSection } from "./components/FAQSection"
import { Footer } from "./components/Footer"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import type { Database } from "@/types/supabase"

type Program = Database["public"]["Tables"]["programs"]["Row"]

interface Filters {
  category?: string
  ageGroup?: string
  maxPrice?: number
  location?: string
}

export default function App() {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    // Only try to load programs if Supabase is properly initialized
    if (supabase) {
      loadFeaturedPrograms()
    }
  }, [])

  const loadFeaturedPrograms = async () => {
    // Skip if Supabase is not available
    if (!supabase) return

    setLoading(true)
    try {
      const { data, error } = await supabase.from("programs").select("*").limit(6)
      if (error) throw error
      // Handle the data if needed
      console.log("Featured programs loaded:", data)
    } catch (error) {
      console.error("Error loading programs:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FEFBF6]">
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}
