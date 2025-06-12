"use client"

import type React from "react"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"

export default function CreateProgramForm() {
  const { user } = useUser()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "sports" as "sports" | "arts" | "fun",
    price: "",
    age_group: "",
    schedule_type: "after-school" as "after-school" | "weekend" | "camp",
    location: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    setLoading(true)

    try {
      // TODO: Implement geocoding for location coordinates
      // TODO: Add image upload functionality

      const { error } = await supabase.from("programs").insert({
        business_id: user.id,
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: Number.parseFloat(formData.price),
        age_group: formData.age_group,
        schedule_type: formData.schedule_type,
        location: formData.location,
      })

      if (error) throw error

      // Reset form
      setFormData({
        name: "",
        description: "",
        category: "sports",
        price: "",
        age_group: "",
        schedule_type: "after-school",
        location: "",
      })

      // TODO: Show success message and refresh program list
      alert("Program created successfully!")
      window.location.reload()
    } catch (error) {
      console.error("Error creating program:", error)
      alert("Error creating program. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Program</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Program Name</label>
            <Input
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Soccer Training for Kids"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              required
              className="w-full p-2 border rounded-md"
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your activity program..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              className="w-full p-2 border rounded-md"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
            >
              <option value="sports">Sports</option>
              <option value="arts">Arts</option>
              <option value="fun">Fun</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Price ($)</label>
            <Input
              required
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="50.00"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Age Group</label>
            <Input
              required
              value={formData.age_group}
              onChange={(e) => setFormData({ ...formData, age_group: e.target.value })}
              placeholder="6-12 years"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Schedule Type</label>
            <select
              className="w-full p-2 border rounded-md"
              value={formData.schedule_type}
              onChange={(e) => setFormData({ ...formData, schedule_type: e.target.value as any })}
            >
              <option value="after-school">After School</option>
              <option value="weekend">Weekend</option>
              <option value="camp">Camp</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <Input
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="123 Main St, City, State"
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Creating..." : "Create Program"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
