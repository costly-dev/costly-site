export default function About() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-16">About</h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white uppercase tracking-wider">Opening a blocked app</h3>
              <div className="flex items-center gap-4">
                <div className="w-4 h-4 bg-yellow-400 rounded-full"></div>
                <span className="text-white text-lg">Oh no</span>
              </div>
            </div>

            <div className="flex gap-8">
              <div className="w-48 h-96 bg-gray-900/50 backdrop-blur-sm rounded-3xl border border-gray-700 p-4">
                <div className="w-full h-6 bg-gray-800 rounded-full mb-4"></div>
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(16)].map((_, i) => (
                    <div key={i} className="aspect-square bg-gray-700 rounded-lg"></div>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl">→</span>
                </div>
              </div>

              <div className="w-48 h-96 bg-gray-900/50 backdrop-blur-sm rounded-3xl border border-red-500 p-4">
                <div className="w-full h-6 bg-gray-800 rounded-full mb-4"></div>
                <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 mb-4">
                  <div className="flex items-center gap-2">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/icon-PS4vPKIEDNGx8DaZnerSDvbFjF5DZH.png"
                      alt="Costly"
                      className="w-4 h-4"
                    />
                    <span className="text-red-400 text-xs">Costly</span>
                  </div>
                  <p className="text-white text-xs mt-1">
                    You've been charged $5 for opening Instagram. Don't let your impulse win next time.
                  </p>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="aspect-square bg-gray-700 rounded-lg"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h3 className="text-3xl font-bold text-white uppercase tracking-wider leading-tight">
                At its core, Costly charges you when you slip up, helping you build tolerance to your impulses, urges
                and distractions.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
