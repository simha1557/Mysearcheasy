import Image from "next/image"

export const FeaturesSection = () => {
  const categories = [
    {
      title: "Academic Coaching",
      image: "/placeholder.svg?height=300&width=500",
      description: "Expert tutoring and academic support for all ages and subjects.",
      gradient: "from-[#371b58] to-[#4c3575]",
    },
    {
      title: "Sports Training",
      image: "/placeholder.svg?height=300&width=500",
      description: "Professional coaching in various sports for beginners to advanced athletes.",
      gradient: "from-[#4c3575] to-[#5b4b8a]",
    },
    {
      title: "Music & Dance",
      image: "/placeholder.svg?height=300&width=500",
      description: "Discover your rhythm with classes from experienced instructors.",
      gradient: "from-[#5b4b8a] to-[#7858a6]",
    },
    {
      title: "Fun Workshops",
      image: "/placeholder.svg?height=300&width=500",
      description: "Engaging workshops and activities for creativity and enjoyment.",
      gradient: "from-[#7858a6] to-[#5b4b8a]",
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          <span className="bg-gradient-to-r from-[#371b58] to-[#5b4b8a] bg-clip-text text-transparent">
            Explore Your Passions
          </span>
        </h2>
        <p className="text-xl text-[#5b4b8a] text-center mb-16 max-w-2xl mx-auto">
          Discover amazing activities and connect with like-minded people in your community
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-[#7858a6]/10 hover:border-[#5b4b8a]/30 hover:scale-105"
            >
              <div className="h-48 overflow-hidden relative">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.title}
                  width={500}
                  height={300}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
                ></div>
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3 text-[#371b58] group-hover:text-[#4c3575] transition-colors duration-300">
                  {category.title}
                </h3>
                <p className="text-[#5b4b8a] mb-4 leading-relaxed">{category.description}</p>
                <button className="text-[#7858a6] font-semibold hover:text-[#5b4b8a] transition-colors duration-300 flex items-center group">
                  Explore
                  <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
