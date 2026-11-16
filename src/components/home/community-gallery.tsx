
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

const galleryImages = [
  {
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b",
    title: "Tree Plantation",
    category: "Environment",
    className: "sm:col-span-2 sm:row-span-2",
  },
  {
    image:
      "https://images.unsplash.com/photo-1509099836639-18ba1795216d",
    title: "Helping Children",
    category: "Education",
    className: "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6",
    title: "Community Support",
    category: "Charity",
    className: "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1559027615-cd4628902d4a",
    title: "Volunteer Activities",
    category: "Community",
    className: "",
  },
  {
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433",
    title: "Food Distribution",
    category: "Donation",
    className: "",
  },
];

export default function CommunityGallery() {
  return (
    <section className="bg-muted/30 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our Community in Action
            </h2>

            <p className="mt-3 max-w-xl leading-7 text-muted-foreground">
              Every small action creates a meaningful impact.
              Explore moments of kindness, teamwork, and community service.
            </p>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid auto-rows-[190px] grid-cols-1 gap-4 sm:grid-cols-2 sm:auto-rows-[210px] lg:grid-cols-4">
          {galleryImages.map((item) => (
            <div
              key={item.title}
              className={`group relative overflow-hidden rounded-2xl ${item.className}`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div>
                  <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {item.category}
                  </span>

                  <h3 className="text-lg font-bold text-white">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
