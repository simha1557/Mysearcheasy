import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { stripe } from "@/lib/stripe"
import { supabase } from "@/lib/supabase"

export async function POST(req: Request) {
  const { userId } = await auth()

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { programId, price } = await req.json()

    // TODO: Verify program exists and get details
    const { data: program, error } = await supabase.from("programs").select("*").eq("id", programId).single()

    if (error || !program) {
      return NextResponse.json({ error: "Program not found" }, { status: 404 })
    }

    // TODO: Check if user is already enrolled
    const { data: existingEnrollment } = await supabase
      .from("enrollments")
      .select("id")
      .eq("parent_id", userId)
      .eq("program_id", programId)
      .single()

    if (existingEnrollment) {
      return NextResponse.json({ error: "Already enrolled" }, { status: 400 })
    }

    // TODO: Create pending enrollment record
    const { data: enrollment, error: enrollmentError } = await supabase
      .from("enrollments")
      .insert({
        parent_id: userId,
        program_id: programId,
        payment_status: "pending",
      })
      .select()
      .single()

    if (enrollmentError) {
      return NextResponse.json({ error: "Failed to create enrollment" }, { status: 500 })
    }

    // TODO: Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: program.name,
              description: program.description,
            },
            unit_amount: Math.round(program.price * 100), // Convert to cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/programs/${programId}`,
      metadata: {
        enrollmentId: enrollment.id,
        programId,
        userId,
      },
    })

    // TODO: Update enrollment with Stripe session ID
    await supabase.from("enrollments").update({ stripe_session_id: session.id }).eq("id", enrollment.id)

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
