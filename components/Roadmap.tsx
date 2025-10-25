import Button from "./Button"

interface RoadmapProps {
  onNavigate: (section: string) => void
  activeSection: string
}

export default function Roadmap({ onNavigate, activeSection }: RoadmapProps) {
  const phases = [
    {
      title: "Core Features",
      features: ["Native app blocking via FamilyControls", "Stripe payment integration", "Convex cloud sync", "Clerk authentication"],
    },
    {
      title: "Accountability",
      features: [
        "Penalty escalation system",
        "Streak tracking & rewards",
        "Balance withdrawal goals",
        "Tamper-proof enforcement",
      ],
    },
    {
      title: "Premium",
      features: ["$2.99/month subscription", "Advanced block lists", "Custom difficulty multipliers", "Reward tracking"],
    },
    {
      title: "Security",
      features: ["TLS 1.3 encryption", "PCI DSS compliance", "Biometric MFA", "Double-entry ledger"],
    },
    {
      title: "Future",
      features: ["Plaid bank integration", "Advanced analytics", "Team accountability", "API access"],
    },
  ]

  return (
    <section id="roadmap" className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <div className="liquid-glass liquid-glass-intense rounded-2xl p-6 sm:p-8">
            <h4 className="text-xl sm:text-2xl font-bold text-white mb-8 text-center">Costly Roadmap</h4>

            {/* Desktop/Tablet view - 5 columns */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-5 gap-6">
                {phases.map((phase, index) => (
                  <div key={index} className="space-y-4">
                    <h5 className="text-lg font-bold text-silver-300 text-center">{phase.title}</h5>
                    <ul className="space-y-2">
                      {phase.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-sm text-gray-300 leading-relaxed">
                          • {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {/* Horizontal progress bar for desktop/tablet */}
              <div className="mt-8 w-full h-3 bg-gray-700 rounded-full">
                <div className="w-[8%] h-full bg-silver-300 rounded-full"></div>
              </div>
            </div>

            {/* Tablet view - 3 columns */}
            <div className="hidden md:block lg:hidden">
              <div className="grid grid-cols-3 gap-6">
                {phases.slice(0, 3).map((phase, index) => (
                  <div key={index} className="space-y-4">
                    <h5 className="text-lg font-bold text-silver-300 text-center">{phase.title}</h5>
                    <ul className="space-y-2">
                      {phase.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-sm text-gray-300 leading-relaxed">
                          • {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="mt-6 w-full h-3 bg-gray-700 rounded-full">
                <div className="w-[8%] h-full bg-silver-300 rounded-full"></div>
              </div>
            </div>

            {/* Mobile view - Collapsed scrollable with side progress bar */}
            <div className="md:hidden">
              <div className="max-h-96 overflow-y-auto scrollbar-hide">
                <div className="flex gap-4">
                  {/* Progress bar on the left */}
                  <div className="flex flex-col items-center">
                    <div className="w-2 h-full bg-gray-700 rounded-full relative">
                      <div className="absolute top-0 w-full h-[10%] bg-silver-300 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Stacked phases */}
                  <div className="flex-1 space-y-4">
                    {phases.map((phase, index) => (
                      <div key={index} className="liquid-glass liquid-glass-interactive rounded-lg p-4">
                        <h5 className="text-lg font-bold text-silver-300 mb-3">{phase.title}</h5>
                        <ul className="space-y-2">
                          {phase.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="text-sm text-gray-300 leading-relaxed">
                              • {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
