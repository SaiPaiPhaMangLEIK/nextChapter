"use client";

export const dynamic = "force-dynamic";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { SignUpButton, SignInButton } from "@clerk/nextjs";

export default function SignUpPage() {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded && isSignedIn) router.replace("/home");
  }, [isLoaded, isSignedIn, router]);

  return (
    <div className="min-h-screen bg-cream flex flex-col items-center justify-center px-6 py-12">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-10">
        <div className="w-8 h-8 rounded-xl bg-brand-500 flex items-center justify-center">
          <BookOpen size={16} className="text-white" />
        </div>
        <span className="text-[17px] font-bold text-gray-900">NextChapter</span>
      </div>

      <div className="w-full max-w-sm">
        <div className="bg-white rounded-3xl shadow-card p-7 text-center space-y-6">
            <div className="space-y-2">
              <h1 className="text-[20px] font-bold text-gray-900">Create your account</h1>
              <p className="text-sm text-gray-400">
                Start your reading journey today
              </p>
            </div>

            {/* Illustration */}
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-brand-400 to-sage-500 flex items-center justify-center mx-auto">
              <BookOpen size={30} className="text-white" strokeWidth={1.5} />
            </div>

            <div className="space-y-3">
              <SignUpButton mode="modal" forceRedirectUrl="/onboarding/setup">
                <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-500 text-white rounded-2xl text-[15px] font-semibold shadow-float active:bg-brand-600 transition-colors">
                  Sign Up — It&apos;s Free
                </button>
              </SignUpButton>

              <SignInButton mode="modal" forceRedirectUrl="/home">
                <button className="w-full flex items-center justify-center gap-2 py-3.5 bg-gray-100 text-gray-700 rounded-2xl text-[15px] font-medium active:bg-gray-200 transition-colors">
                  I already have an account
                </button>
              </SignInButton>
            </div>

            <p className="text-[11px] text-gray-300 leading-relaxed">
              By signing up you agree to our Terms of Service and Privacy Policy.
            </p>
        </div>

        <p className="mt-5 text-center text-sm text-gray-400">
          Just browsing?{" "}
          <Link href="/onboarding" className="text-brand-600 font-medium">
            See the tour
          </Link>
        </p>
      </div>
    </div>
  );
}
