import Hero from "@/components/hero";
import { SocialAuthToast } from "@/components/social-auth-toast";

export default function HomePage() {
  return (
    <main className="flex-1">
      <SocialAuthToast />
      <Hero />
    </main>
  );
}
