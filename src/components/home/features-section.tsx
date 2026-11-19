import {
  CalendarDays,
  HeartHandshake,
  Users,
  HandHeart,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    number: "01",
    icon: CalendarDays,
    title: "Discover Events",
    description:
      "Explore upcoming community events and find meaningful opportunities to volunteer and contribute.",
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    number: "02",
    icon: HeartHandshake,
    title: "Create Events",
    description:
      "Turn your ideas into action by organizing events and bringing people together for a good cause.",
    color: "bg-rose-500/10 text-rose-600",
  },
  {
    number: "03",
    icon: Users,
    title: "Join Community",
    description:
      "Connect with like-minded people, meet passionate volunteers, and become part of a caring community.",
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    number: "04",
    icon: HandHeart,
    title: "Make an Impact",
    description:
      "Share your time, skills, and kindness to create positive changes in the lives of others.",
    color: "bg-emerald-500/10 text-emerald-600",
  },
];

export default function FeaturesSection() {
  return (
    <section className="px-4 py-8 sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Section Introduction */}
        <div className="mb-9 grid gap-5 sm:mb-14 sm:gap-8 md:grid-cols-2 md:items-end">
          <div>
            <h2 className="max-w-xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Small Actions.
              <span className="block text-primary">
                Big Changes.
              </span>
            </h2>
          </div>

          <div className="md:pb-2">
            <p className="max-w-lg text-sm leading-6 text-muted-foreground sm:text-base sm:leading-8 lg:text-lg">
              Every positive change begins with a small step.
              SebaTori brings people together to discover opportunities,
              organize community events, and turn kindness into action.
            </p>

            <div className="mt-4 flex items-center gap-3 sm:mt-6">
              <div className="flex -space-x-2">
                <span className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-blue-100 text-blue-700 sm:size-9">
                  <Users className="size-3.5 sm:size-4" />
                </span>

                <span className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-rose-100 text-rose-700 sm:size-9">
                  <HeartHandshake className="size-3.5 sm:size-4" />
                </span>

                <span className="flex size-8 items-center justify-center rounded-full border-2 border-background bg-emerald-100 text-emerald-700 sm:size-9">
                  <HandHeart className="size-3.5 sm:size-4" />
                </span>
              </div>

              <span className="text-xs font-medium text-muted-foreground sm:text-sm">
                Together, we can make a difference.
              </span>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.number}
                className="group relative flex min-h-[235px] flex-col overflow-hidden rounded-xl border bg-card p-4 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg sm:min-h-[290px] sm:rounded-2xl sm:p-7"
              >
                {/* Card Number */}
                <span className="absolute right-3 top-3 text-3xl font-bold tracking-tight text-muted-foreground/10 sm:right-5 sm:top-4 sm:text-5xl">
                  {feature.number}
                </span>

                {/* Icon */}
                <div
                  className={`mb-5 flex size-11 items-center justify-center rounded-xl ${feature.color} transition-transform duration-300 group-hover:scale-110 sm:mb-8 sm:size-16 sm:rounded-2xl`}
                >
                  <Icon className="size-5 sm:size-8" />
                </div>

                {/* Feature Title */}
                <h3 className="text-sm font-bold tracking-tight sm:text-xl">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="mt-2 flex-1 text-xs leading-5 text-muted-foreground sm:mt-3 sm:text-sm sm:leading-7">
                  {feature.description}
                </p>

                {/* Bottom Decoration */}
                <div className="mt-4 flex items-center justify-between border-t pt-3 sm:mt-6 sm:pt-4">
                  <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground sm:text-xs">
                    SebaTori
                  </span>

                  <ArrowUpRight className="size-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-primary sm:size-5" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
