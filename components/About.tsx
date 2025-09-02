export default function About() {
  return (
    <section id="about" className="py-16 px-6 -mb-10">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-8">
              
            </div>

            <div className="flex justify-center pb-10">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2376-NRCcWK7PH1hN77mhnwslkG6j4mOcCk.png"
                alt="Costly app demonstration showing blocked app notification"
                className="w-full max-w-2xl h-auto rounded-2xl"
              />
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
              <h3
                className="text-3xl font-bold text-white uppercase tracking-wider leading-tight"
                style={{ fontFamily: "Patrick Hand SC, cursive" }}
              >
                At its core, Costly charges you when you slip up, helping you build tolerance to your impulses, urges
                and distractions. Helping you stay locked in: delete the app, delete your deposit and loose the chance to earn your money back.
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
