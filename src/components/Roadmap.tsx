import Button from "./Button"

export default function Roadmap() {
  const phases = [
    {
      title: "MVP",
      features: ["Set apps to be blocked", "Penalty Customization", "Send money into vault", "Referral Awards"],
    },
    {
      title: "Friends",
      features: [
        "Community features (Leaderboards)",
        "Option to send money to friends or Organizations",
        "UI/UX & Graph improvements",
      ],
    },
    {
      title: "QOL",
      features: ["Animations", "Customizability", "AI Peak Hours Prediction", "Dynamic penalties"],
    },
    {
      title: "TBD",
      features: ["•", "•"],
    },
    {
      title: "TBD",
      features: ["•", "•"],
    },
  ]

  return (
    <section id="roadmap" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-white mb-16">Roadmap</h2>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
            <h3 className="text-3xl font-bold text-white mb-8">How do we get there?</h3>
          </div>

          <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 space-y-6">
            <h3 className="text-2xl font-bold text-white text-center">
              Feel free to visit social media and check out the design on Figma.
            </h3>

            <div className="flex gap-4 justify-center">
              <Button variant="primary">Touch Me.</Button>
              <Button variant="secondary">Contact</Button>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <div className="bg-gray-900/30 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
            <h4 className="text-xl font-bold text-white mb-8 text-center">Costly Roadmap</h4>

            <div className="grid grid-cols-5 gap-4">
              {phases.map((phase, index) => (
                <div key={index} className="space-y-4">
                  <h5 className="text-lg font-bold text-white text-center">{phase.title}</h5>
                  <ul className="space-y-2">
                    {phase.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-gray-300">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 w-full h-2 bg-gray-700 rounded-full">
              <div className="w-1/5 h-full bg-yellow-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
