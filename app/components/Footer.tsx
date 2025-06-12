import { Facebook, Instagram, Twitter } from "lucide-react"

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-[#371b58] via-[#4c3575] to-[#5b4b8a] text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1 - Logo & Mission */}
          <div>
            <a href="#" className="text-3xl font-bold mb-6 block">
              Activity<span className="text-[#7858a6]">Hub</span>
            </a>
            <p className="text-purple-100 mb-8 leading-relaxed">
              Connecting communities through engaging, educational, and enriching activities for all ages.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-3 rounded-full bg-white/10 hover:bg-[#7858a6] transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-white/10 hover:bg-[#7858a6] transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="p-3 rounded-full bg-white/10 hover:bg-[#7858a6] transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-purple-100 hover:text-[#7858a6] transition-colors duration-300 hover:underline"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-purple-100 hover:text-[#7858a6] transition-colors duration-300 hover:underline"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-purple-100 hover:text-[#7858a6] transition-colors duration-300 hover:underline"
                >
                  Become a Partner
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-purple-100 hover:text-[#7858a6] transition-colors duration-300 hover:underline"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Support */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Support</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-purple-100 hover:text-[#7858a6] transition-colors duration-300 hover:underline"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-purple-100 hover:text-[#7858a6] transition-colors duration-300 hover:underline"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-purple-100 hover:text-[#7858a6] transition-colors duration-300 hover:underline"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-purple-100 hover:text-[#7858a6] transition-colors duration-300 hover:underline"
                >
                  Safety Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 - Contact Details */}
          <div>
            <h3 className="text-xl font-semibold mb-6 text-white">Contact Us</h3>
            <address className="not-italic text-purple-100 space-y-3">
              <p className="flex items-center">
                <span className="mr-2">📧</span>
                hello@activityhub.com
              </p>
              <p className="flex items-center">
                <span className="mr-2">📞</span>
                (123) 456-7890
              </p>
              <p className="flex items-start">
                <span className="mr-2 mt-1">📍</span>
                <span>
                  123 Activity Street
                  <br />
                  New York, NY 10001
                </span>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 mt-12 border-t border-white/20 text-center text-purple-100">
          <p className="text-lg">© 2024 Activity Hub. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
