"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"

export const FAQSection = () => {
  const faqs = [
    {
      question: "How do I book an activity?",
      answer:
        "Booking an activity is simple! Browse through our categories, select an activity that interests you, choose your preferred date and time, and complete the checkout process. You'll receive a confirmation email with all the details.",
    },
    {
      question: "Are the instructors verified?",
      answer:
        "Yes, all instructors on Activity Hub undergo a thorough verification process. We check their qualifications, experience, and perform background checks to ensure they meet our high standards for quality and safety.",
    },
    {
      question: "What is the cancellation policy?",
      answer:
        "Our cancellation policy varies by activity provider. Generally, full refunds are available if you cancel at least 48 hours before the scheduled activity. You can find the specific cancellation policy for each activity on its details page.",
    },
    {
      question: "How can I list my own workshop or class?",
      answer:
        "To become an activity provider, click on the 'Become a Partner' link in our footer. You'll need to complete an application form, provide details about your qualifications and the activities you want to offer, and pass our verification process.",
    },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-[#371b58] to-[#5b4b8a] bg-clip-text text-transparent">
            Frequently Asked Questions
          </span>
        </h2>
        <p className="text-xl text-[#5b4b8a] text-center mb-16 max-w-2xl mx-auto">
          Everything you need to know about getting started with ActivityHub
        </p>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-2 border-[#7858a6]/20 rounded-2xl overflow-hidden hover:border-[#5b4b8a]/40 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <button
                className="w-full flex justify-between items-center p-6 md:p-8 text-left bg-gradient-to-r from-white to-[#f8f7ff] hover:from-[#f8f7ff] hover:to-white transition-all duration-300"
                onClick={() => toggleFAQ(index)}
                aria-expanded={openIndex === index}
              >
                <span className="font-semibold text-lg md:text-xl text-[#371b58] pr-4">{faq.question}</span>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp size={24} className="text-[#7858a6]" />
                  ) : (
                    <ChevronDown size={24} className="text-[#7858a6]" />
                  )}
                </div>
              </button>
              {openIndex === index && (
                <div className="p-6 md:p-8 pt-0 md:pt-0 text-[#5b4b8a] bg-white leading-relaxed text-lg">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
