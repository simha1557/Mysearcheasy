"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

export const HeroSection = () => {
  const [selectedLocation, setSelectedLocation] = useState("Select your city")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const locations = ["New York", "Mumbai", "London"]
  const [touchStart, setTouchStart] = useState(0)
  const [touchEnd, setTouchEnd] = useState(0)

  const images = [
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Download%20premium%20image%20of%20Young%20indian%20girl%20person%20female%20braid_%20by%20audi%20about%20books%2C%20person%2C%20shirt%2C%20education%2C%20and%20backpack%2014675945.jpg-7vQLwb3PIWhmlbyA2CE4fqtVFhLtfd.jpeg",
      alt: "Young student with books",
      caption: "Education",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Top%20Cricket%20Gear.jpg-R6awvTemtCo8A8XOByu2SusW5dJQ98.jpeg",
      alt: "Child playing cricket",
      caption: "Sports",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Mrigakshee%20GhoshDas.jpg-FWGCSADflJABSH9oEUaQqDPMTHdpUV.jpeg",
      alt: "Child performing classical dance",
      caption: "Arts",
    },
    {
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Robotics%20I%20Camp_%20Mechanics.jpg-4EpcSiUdb8be3mpLK8AoAAPAQJpFeT.jpeg",
      alt: "Children building robots",
      caption: "Technology",
    },
  ]

  // Add keyframe animations
  useEffect(() => {
    const style = document.createElement("style")
    style.textContent = `
    @keyframes expandWidth {
      from { width: 0; }
      to { width: 48px; }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideUp {
      from { transform: translateY(10px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
  `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  // Enhanced Auto-rotate with hover pause
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTransitioning) {
        goToNextImage()
      }
    }, 6000) // Increased to 6 seconds for better UX
    return () => clearInterval(interval)
  }, [currentImageIndex, isTransitioning])

  const goToNextImage = () => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
      setTimeout(() => setIsTransitioning(false), 500)
    }
  }

  const goToPrevImage = () => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
      setTimeout(() => setIsTransitioning(false), 500)
    }
  }

  const goToImage = (index: number) => {
    if (!isTransitioning && index !== currentImageIndex) {
      setIsTransitioning(true)
      setCurrentImageIndex(index)
      setTimeout(() => setIsTransitioning(false), 500)
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      goToNextImage()
    }
    if (isRightSwipe) {
      goToPrevImage()
    }
  }

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-white via-[#f8f7ff] to-[#7858a6]/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Column - Text Content */}
          <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-[#371b58] via-[#4c3575] to-[#5b4b8a] bg-clip-text text-transparent">
                Find the Best
              </span>
              <br />
              <span className="text-[#371b58]">for your kids</span>
            </h1>
            <p className="text-xl text-[#5b4b8a] mb-10 leading-relaxed">
              Seamlessly explore sports venues and play with sports enthusiasts just like you!
            </p>
            <div className="relative w-full max-w-sm">
              <button
                className="w-full flex items-center justify-between px-6 py-4 bg-white border-2 border-[#7858a6]/30 rounded-2xl hover:border-[#5b4b8a] hover:shadow-lg transition-all duration-300 backdrop-blur-sm"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <span className="text-[#371b58] font-medium">{selectedLocation}</span>
                <ChevronDown size={20} className="ml-2 text-[#7858a6]" />
              </button>
              {isDropdownOpen && (
                <div className="absolute mt-2 w-full bg-white rounded-xl shadow-xl border border-[#7858a6]/20 z-10 overflow-hidden">
                  {locations.map((location) => (
                    <button
                      key={location}
                      className="block w-full text-left px-6 py-3 hover:bg-gradient-to-r hover:from-[#7858a6]/10 hover:to-[#5b4b8a]/10 text-[#371b58] transition-all duration-200"
                      onClick={() => {
                        setSelectedLocation(location)
                        setIsDropdownOpen(false)
                      }}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Interactive Image Gallery */}
          <div className="lg:w-1/2">
            <div
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#7858a6]/20 bg-white transform hover:scale-[1.02] transition-transform duration-500"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              {/* Main Image Carousel with Enhanced Animations */}
              <div className="relative h-[280px] sm:h-[350px] md:h-[450px] lg:h-[500px] w-full overflow-hidden bg-gradient-to-br from-[#f8f7ff] to-[#7858a6]/5">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ease-out transform ${
                      index === currentImageIndex
                        ? "opacity-100 translate-x-0 scale-100"
                        : index < currentImageIndex
                          ? "opacity-0 -translate-x-full scale-95"
                          : "opacity-0 translate-x-full scale-95"
                    }`}
                  >
                    <div className="relative w-full h-full group">
                      <Image
                        src={image.src || "/placeholder.svg"}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                        priority={index === 0}
                      />

                      {/* Enhanced Animated Overlay - Mobile Optimized & Readable */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#371b58]/90 via-[#371b58]/40 to-transparent opacity-70 xs:opacity-60 sm:opacity-40 md:opacity-0 md:group-hover:opacity-80 transition-all duration-700 ease-in-out" />

                      {/* Additional readability layer for mobile */}
                      <div className="absolute inset-0 bg-black/20 opacity-100 xs:opacity-80 sm:opacity-60 md:opacity-0 md:group-hover:opacity-30 transition-all duration-500" />

                      {/* Text readability enhancement */}
                      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-100 xs:opacity-90 sm:opacity-70 md:opacity-0 md:group-hover:opacity-80 transition-all duration-600" />

                      {/* Enhanced Caption with Animation */}
                      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                        <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 sm:p-4 shadow-lg border border-[#7858a6]/20 animate-fadeIn transition-all duration-700 hover:bg-white hover:shadow-xl">
                          <p className="text-[#371b58] text-lg sm:text-xl font-bold mb-1 animate-slideUp">
                            {image.caption}
                          </p>
                          <div
                            className="w-0 h-1 bg-gradient-to-r from-[#5b4b8a] to-[#7858a6] rounded-full animate-expand"
                            style={{
                              animation: `expandWidth 0.8s forwards ${index === currentImageIndex ? "0.3s" : "0s"}`,
                            }}
                          ></div>
                          <p
                            className="text-[#5b4b8a] text-sm mt-2 opacity-0 animate-fadeIn"
                            style={{
                              animation: `fadeIn 0.5s forwards ${index === currentImageIndex ? "0.6s" : "0s"}`,
                            }}
                          >
                            Discover amazing {image.caption.toLowerCase()} activities for children
                          </p>
                        </div>
                      </div>

                      {/* Floating Activity Badge */}
                      <div
                        className={`absolute top-4 right-4 transform transition-all duration-500 ${
                          index === currentImageIndex
                            ? "translate-x-0 opacity-100 rotate-0"
                            : "translate-x-8 opacity-0 rotate-12"
                        }`}
                      >
                        <div className="bg-gradient-to-r from-[#5b4b8a] to-[#7858a6] text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                          {image.caption}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Enhanced Loading Animation */}
                <div
                  className={`absolute top-0 left-0 w-full h-1 bg-[#7858a6]/20 ${isTransitioning ? "block" : "hidden"}`}
                >
                  <div className="h-full bg-gradient-to-r from-[#5b4b8a] to-[#7858a6] animate-pulse"></div>
                </div>
              </div>

              {/* Enhanced Navigation Controls with Mobile Optimization */}
              <div className="absolute top-1/2 left-0 right-0 flex justify-between px-2 sm:px-4 -mt-6 z-20">
                <button
                  onClick={goToPrevImage}
                  className="p-2 sm:p-3 rounded-full bg-white/80 hover:bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 backdrop-blur-sm border border-[#7858a6]/20"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} className="text-[#371b58] sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={goToNextImage}
                  className="p-2 sm:p-3 rounded-full bg-white/80 hover:bg-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 backdrop-blur-sm border border-[#7858a6]/20"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} className="text-[#371b58] sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* Enhanced Progress Indicators */}
              <div className="flex justify-center gap-2 sm:gap-3 p-3 sm:p-4 bg-gradient-to-r from-white via-[#f8f7ff] to-white">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`relative transition-all duration-500 rounded-full overflow-hidden ${
                      index === currentImageIndex
                        ? "w-8 sm:w-10 h-2 bg-gradient-to-r from-[#5b4b8a] to-[#7858a6] shadow-lg"
                        : "w-2 h-2 bg-[#7858a6]/30 hover:bg-[#7858a6]/50 hover:scale-125"
                    }`}
                    aria-label={`Go to ${image.caption} image`}
                  >
                    {index === currentImageIndex && (
                      <div className="absolute inset-0 bg-gradient-to-r from-[#371b58] to-[#4c3575] animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>

              {/* Mobile Swipe Indicator */}
              <div className="block sm:hidden text-center py-2">
                <p className="text-[#7858a6] text-sm font-medium animate-bounce">← Swipe to explore →</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
