"use client"

import { useState } from "react"
import { Menu, X, BookOpen, Trophy, Palette, Smile } from "lucide-react"

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-[#7858a6]/20">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <a
            href="#"
            className="text-2xl font-bold bg-gradient-to-r from-[#371b58] to-[#5b4b8a] bg-clip-text text-transparent"
          >
            Parent<span className="text-[#7858a6]">Friendly</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <div className="hidden lg:flex space-x-6">
            <a
              href="#"
              className="flex items-center space-x-2 text-[#371b58] hover:text-[#7858a6] font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:bg-[#7858a6]/10"
            >
              <BookOpen size={18} />
              <span>Education</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-[#371b58] hover:text-[#7858a6] font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:bg-[#7858a6]/10"
            >
              <Trophy size={18} />
              <span>Sports</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-[#371b58] hover:text-[#7858a6] font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:bg-[#7858a6]/10"
            >
              <Palette size={18} />
              <span>Arts</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-[#371b58] hover:text-[#7858a6] font-medium transition-all duration-300 px-3 py-2 rounded-lg hover:bg-[#7858a6]/10"
            >
              <Smile size={18} />
              <span>Fun</span>
            </a>
          </div>
          <button className="px-6 py-2 text-[#371b58] border-2 border-[#371b58] rounded-lg hover:bg-[#371b58] hover:text-white transition-all duration-300 font-medium">
            Login
          </button>
          <button className="px-6 py-2 bg-gradient-to-r from-[#5b4b8a] to-[#7858a6] text-white rounded-lg hover:from-[#4c3575] hover:to-[#5b4b8a] transition-all duration-300 font-medium shadow-lg hover:shadow-xl">
            Sign Up
          </button>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-[#371b58] hover:text-[#7858a6] transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md py-4 px-4 shadow-lg border-t border-[#7858a6]/20">
          <div className="flex flex-col space-y-4">
            <a
              href="#"
              className="flex items-center space-x-2 text-[#371b58] hover:text-[#7858a6] font-medium py-3 px-2 rounded-lg hover:bg-[#7858a6]/10 transition-all duration-300"
            >
              <BookOpen size={18} />
              <span>Education</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-[#371b58] hover:text-[#7858a6] font-medium py-3 px-2 rounded-lg hover:bg-[#7858a6]/10 transition-all duration-300"
            >
              <Trophy size={18} />
              <span>Sports</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-[#371b58] hover:text-[#7858a6] font-medium py-3 px-2 rounded-lg hover:bg-[#7858a6]/10 transition-all duration-300"
            >
              <Palette size={18} />
              <span>Arts</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-2 text-[#371b58] hover:text-[#7858a6] font-medium py-3 px-2 rounded-lg hover:bg-[#7858a6]/10 transition-all duration-300"
            >
              <Smile size={18} />
              <span>Fun</span>
            </a>
            <div className="flex flex-col space-y-3 pt-3 border-t border-[#7858a6]/20">
              <button className="px-4 py-3 text-[#371b58] border-2 border-[#371b58] rounded-lg hover:bg-[#371b58] hover:text-white w-full transition-all duration-300 font-medium">
                Login
              </button>
              <button className="px-4 py-3 bg-gradient-to-r from-[#5b4b8a] to-[#7858a6] text-white rounded-lg hover:from-[#4c3575] hover:to-[#5b4b8a] w-full transition-all duration-300 font-medium shadow-lg">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
