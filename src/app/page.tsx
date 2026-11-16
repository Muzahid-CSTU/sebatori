import CommunityGallery from "@/components/home/community-gallery";
import FeaturesSection from "@/components/home/features-section";
import Hero from "@/components/home/hero";
import NewsletterSection from "@/components/home/newsletter-section";
import RecentUpcomingEvents from "@/components/home/recent-upcoming-events";
import { SocialAuthToast } from "@/components/social-auth-toast";

export default function HomePage() {
  return (
    <main className="flex-1">
      <SocialAuthToast />
      <Hero />
      <FeaturesSection />
      <RecentUpcomingEvents />
      <CommunityGallery />
      <NewsletterSection />
    </main>
  );
}
