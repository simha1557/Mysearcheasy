"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Eye } from "lucide-react"
import { formatPrice } from "@/lib/utils"
import type { Database } from "@/types/supabase"

type Program = Database["public"]["Tables"]["programs"]["Row"]

interface ProgramListProps {
  programs: Program[]
}

export default function ProgramList({ programs }: ProgramListProps) {
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null)

  // TODO: Implement edit and delete functionality
  const handleEdit = (program: Program) => {
    setSelectedProgram(program)
    // TODO: Open edit modal or form
  }

  const handleDelete = async (programId: string) => {
    // TODO: Implement delete functionality with confirmation
    if (confirm("Are you sure you want to delete this program?")) {
      // TODO: Delete from Supabase
      console.log("Delete program:", programId)
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Your Programs ({programs.length})</h2>
      </div>

      {programs.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">No programs yet</h3>
            <p className="text-gray-600">Create your first activity program to get started.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {programs.map((program) => (
            <Card key={program.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{program.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-2">
                      <Badge variant="secondary">{program.category}</Badge>
                      <Badge variant="outline">{program.schedule_type}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-green-600">{formatPrice(program.price)}</p>
                    <p className="text-sm text-gray-600">Ages {program.age_group}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4 line-clamp-2">{program.description}</p>
                <p className="text-sm text-gray-600 mb-4">📍 {program.location}</p>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleEdit(program)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDelete(program.id)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
