import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { Webhook } from "svix"
import { supabaseAdmin } from "@/lib/supabase"

const webhookSecret = process.env.CLERK_WEBHOOK_SECRET!

export async function POST(req: Request) {
  // TODO: Verify webhook signature
  const body = await req.text()
  const headerPayload = headers()
  const svixId = headerPayload.get("svix-id")
  const svixTimestamp = headerPayload.get("svix-timestamp")
  const svixSignature = headerPayload.get("svix-signature")

  if (!svixId || !svixTimestamp || !svixSignature) {
    return new Response("Error occurred -- no svix headers", {
      status: 400,
    })
  }

  const wh = new Webhook(webhookSecret)
  let evt: any

  try {
    evt = wh.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    })
  } catch (err) {
    console.error("Error verifying webhook:", err)
    return new Response("Error occurred", {
      status: 400,
    })
  }

  // TODO: Handle user creation event
  if (evt.type === "user.created") {
    const { id, email_addresses, first_name, last_name } = evt.data

    try {
      // Create profile in Supabase
      const { error } = await supabaseAdmin.from("profiles").insert({
        user_id: id,
        email: email_addresses[0]?.email_address || "",
        first_name: first_name || null,
        last_name: last_name || null,
        role: "parent", // Default role, can be changed later
      })

      if (error) {
        console.error("Error creating profile:", error)
        return new Response("Error creating profile", { status: 500 })
      }

      console.log("Profile created for user:", id)
    } catch (error) {
      console.error("Error in webhook handler:", error)
      return new Response("Error processing webhook", { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
