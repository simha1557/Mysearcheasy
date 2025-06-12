import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { supabase } from "@/lib/supabase"
import ProgramList from "./program-list"
import CreateProgramForm from "./create-program-form"

export default async function DashboardPage() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/sign-in")
  }

  // TODO: Check if user has business role
  const { data: profile } = await supabase.from("profiles").select("role").eq("user_id", userId).single()

  if (!profile || profile.role !== "business") {
    redirect("/")
  }

  // TODO: Fetch business programs
  const { data: programs } = await supabase
    .from("programs")
    .select("*")
    .eq("business_id", userId)
    .order("created_at", { ascending: false })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Business Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your activity programs</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Program Form */}
        <div className="lg:col-span-1">
          <CreateProgramForm />
        </div>

        {/* Programs List */}
        <div className="lg:col-span-2">
          <ProgramList programs={programs || []} />
        </div>
      </div>
    </div>
  )
}
