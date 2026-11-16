
import {
  CalendarDays,
  HeartHandshake,
  Users,
  HandHeart,
} from "lucide-react";

const features = [
  {
    icon: CalendarDays,
    title: "Discover Events",
    description:
      "Explore upcoming community events and find opportunities to participate in meaningful activities.",
  },
  {
    icon: HeartHandshake,
    title: "Create Events",
    description:
      "Organize your own community initiatives and bring people together for a positive cause.",
  },
  {
    icon: Users,
    title: "Join Community",
    description:
      "Connect with volunteers who share your interests and work together to support your community.",
  },
  {
    icon: HandHeart,
    title: "Make an Impact",
    description:
      "Contribute your time and skills to create meaningful changes in people's lives.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
            What We Offer
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need to Make a Difference
          </h2>

          <p className="mt-4 leading-7 text-muted-foreground">
            SebaTori makes it easier to discover opportunities,
            organize events, and bring communities together.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-5 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="size-6" />
                </div>

                <h3 className="text-lg font-bold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
