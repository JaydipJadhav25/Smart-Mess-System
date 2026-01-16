import {
  Cpu,
  ScanFace,
  CreditCard,
  BarChart3,
  ShieldCheck,
} from "lucide-react"

const features = [
  {
    title: "AI Automation",
    desc: "Automated meal planning and smart workflows powered by AI & ML.",
    icon: Cpu,
  },
  {
    title: "Face Attendance",
    desc: "Fast and accurate attendance using face recognition technology.",
    icon: ScanFace,
  },
  {
    title: "Smart Payments",
    desc: "Seamless and transparent digital payment management.",
    icon: CreditCard,
  },
  {
    title: "Analytics Dashboard",
    desc: "Real-time insights for mess operations and consumption trends.",
    icon: BarChart3,
  },
  {
    title: "Blockchain Security",
    desc: "Tamper-proof records ensuring trust, transparency, and integrity.",
    icon: ShieldCheck,
  },
]

export default function HowItWorksSection() {
  return (
    <section className="relative py-20 bg-background/0">
      <div className="container mx-auto px-6">

        {/* Section Header */}
        <div className="mb-14 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary">
            How Smart Mess System Works
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Built with modern technologies to simplify, secure,
            and optimize mess management.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {features.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                className="
                  group rounded-xl border bg-background
                  p-6 text-center
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:shadow-lg
                "
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </div>

                <h3 className="text-sm font-semibold">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                  {item.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
