import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { stripe } from "@/lib/stripe"
import { supabaseAdmin } from "@/lib/supabase"
import { resend } from "@/lib/resend"

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get("stripe-signature")!

  let event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error("Webhook signature verification failed:", err.message)
    return new Response(`Webhook Error: ${err.message}`, { status: 400 })
  }

  // TODO: Handle successful payment
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any

    try {
      const { enrollmentId, programId, userId } = session.metadata

      // TODO: Update enrollment status to completed
      const { error: updateError } = await supabaseAdmin
        .from("enrollments")
        .update({ payment_status: "completed" })
        .eq("id", enrollmentId)

      if (updateError) {
        console.error("Error updating enrollment:", updateError)
        return new Response("Error updating enrollment", { status: 500 })
      }

      // TODO: Get user and program details for email
      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .select("email, first_name")
        .eq("user_id", userId)
        .single()

      const { data: program } = await supabaseAdmin
        .from("programs")
        .select("name, location")
        .eq("id", programId)
        .single()

      // TODO: Send enrollment confirmation email
      if (profile && program) {
        await resend.emails.send({
          from: "ActivityHub <noreply@activityhub.com>",
          to: profile.email,
          subject: "Enrollment Confirmation",
          html: `
            <h1>Enrollment Confirmed!</h1>
            <p>Hi ${profile.first_name},</p>
            <p>Your enrollment in <strong>${program.name}</strong> has been confirmed.</p>
            <p><strong>Location:</strong> ${program.location}</p>
            <p>We're excited to see you there!</p>
            <p>Best regards,<br>The ActivityHub Team</p>
          `,
        })
      }

      console.log("Enrollment completed:", enrollmentId)
    } catch (error) {
      console.error("Error processing payment webhook:", error)
      return new Response("Error processing payment", { status: 500 })
    }
  }

  return NextResponse.json({ received: true })
}
