"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

export const TestimonialsSection = () => {
  const testimonials = [
    {
      quote:
        "Activity Hub helped me find the perfect piano lessons for my daughter. She's made incredible progress in just a few months!",
      name: "Sarah Johnson",
      rating: 5,
    },
    {
      quote:
        "As a busy parent, finding quality activities used to be time-consuming. Activity Hub made it simple to discover and book great classes.",
      name: "Michael Chen",
      rating: 5,
    },
    {
      quote:
        "The variety of workshops available is amazing. I've taken up pottery and made new friends in my community.",
      name: "Priya Sharma",
      rating: 4,
    },
  ]

  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          className={`w-6 h-6 ${i < rating ? "text-[#7858a6]" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))
  }

  return (
    <section className="py-20 bg-gradient-to-br from-[#f8f7ff] via-white to-[#7858a6]/5">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-[#371b58] to-[#5b4b8a] bg-clip-text text-transparent">
            What Our Community is Saying
          </span>
        </h2>
        <p className="text-xl text-[#5b4b8a] text-center mb-16 max-w-2xl mx-auto">
          Real stories from real people who found their passion through ActivityHub
        </p>
        <div className="relative max-w-4xl mx-auto">
          {/* Testimonial Card */}
          <div className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl border border-[#7858a6]/20">
            <div className="flex mb-6">{renderStars(testimonials[currentIndex].rating)}</div>
            <p className="text-xl md:text-2xl italic mb-8 text-[#371b58] leading-relaxed">
              "{testimonials[currentIndex].quote}"
            </p>
            <p className="font-semibold text-lg text-[#4c3575]">{testimonials[currentIndex].name}</p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex justify-between mt-10">
            <button
              onClick={prevSlide}
              className="p-4 rounded-full bg-white shadow-lg hover:shadow-xl border border-[#7858a6]/20 hover:bg-gradient-to-r hover:from-[#7858a6] hover:to-[#5b4b8a] hover:text-white transition-all duration-300 group"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} className="text-[#371b58] group-hover:text-white transition-colors" />
            </button>

            {/* Dots indicator */}
            <div className="flex items-center space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-4 h-4 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-gradient-to-r from-[#5b4b8a] to-[#7858a6] scale-125"
                      : "bg-gray-300 hover:bg-[#7858a6]/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-4 rounded-full bg-white shadow-lg hover:shadow-xl border border-[#7858a6]/20 hover:bg-gradient-to-r hover:from-[#7858a6] hover:to-[#5b4b8a] hover:text-white transition-all duration-300 group"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} className="text-[#371b58] group-hover:text-white transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
