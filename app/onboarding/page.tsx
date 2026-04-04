"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import Button from "@/components/ui/Button";

export default function OnboardingPage() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) router.replace("/home");
  }, [isLoaded, isSignedIn, router]);

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-between px-6 py-12 max-w-lg mx-auto">
      {/* ─── Logo ───────────────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center">
          <BookOpen size={16} className="text-white" />
        </div>
        <span className="text-[17px] font-bold text-gray-900">NextChapter</span>
      </div>

      <div />

      {/* ─── Actions ────────────────────────────────────────────── */}
      <div className="w-full space-y-3">
        <Link href="/onboarding/signup" className="block">
          <Button variant="primary" size="xl" fullWidth>
            Get Started
          </Button>
        </Link>
        <Link href="/onboarding/signin" className="block">
          <Button variant="ghost" size="lg" fullWidth>
            I already have an account
          </Button>
        </Link>
      </div>
    </div>
  );
}
