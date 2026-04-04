"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSignIn, useUser } from "@clerk/nextjs";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ─── Brand icons ──────────────────────────────────────────────────────────────

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-[18px] h-[18px]"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4zm-3.23-17.2c.05 1.96-1.4 3.56-3.29 3.71-.24-1.92 1.44-3.63 3.29-3.71z" />
    </svg>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ease = [0.16, 1, 0.3, 1] as const;
type OAuthProvider = "apple" | "google";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SignInPage() {
  const router = useRouter();
  const { signIn, fetchStatus } = useSignIn();
  const { isSignedIn, isLoaded: userLoaded } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<OAuthProvider | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Already signed-in → skip to onboarding
  useEffect(() => {
    if (userLoaded && isSignedIn) router.replace("/home");
  }, [userLoaded, isSignedIn, router]);

  const isFetching = fetchStatus === "fetching";
  const busy = localLoading || isFetching || !!oauthLoading;
  const canSubmit = !busy && email.trim().length > 0 && password.length > 0;

  // ── OAuth ──────────────────────────────────────────────────────────────────

  async function handleOAuth(provider: OAuthProvider) {
    if (!signIn || busy) return;
    setOauthLoading(provider);
    setErrorMsg(null);
    const { error } = await signIn.sso({
      strategy: provider === "apple" ? "oauth_apple" : "oauth_google",
      redirectUrl: `${window.location.origin}/sso-callback`,
      redirectCallbackUrl: "/home",
    });
    if (error) {
      setErrorMsg(error.message ?? "OAuth sign-in failed. Please try another method.");
      setOauthLoading(null);
    }
  }

  // ── Email + Password ───────────────────────────────────────────────────────

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    if (!signIn || !canSubmit) return;
    setLocalLoading(true);
    setErrorMsg(null);

    try {
      const result = await signIn.create({
        identifier: email.trim(),
        password,
      });
      if (result.status === "complete") {
        router.push("/home");
      } else {
        setErrorMsg("Additional verification required. Please try again.");
      }
    } catch (err: unknown) {
      const clerkErr = err as { errors?: { message: string }[] };
      setErrorMsg(
        clerkErr.errors?.[0]?.message ?? "Incorrect email or password. Please try again."
      );
    }
    setLocalLoading(false);
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div
      className="min-h-screen pb-12"
      style={{
        background:
          "linear-gradient(180deg, #e6f0e3 0%, #f0f5ee 45%, #f5f2eb 100%)",
      }}
    >
      {/* ── Header ───────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 pt-14 pb-2">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-white/70 border border-white/80 shadow-sm text-ink-600 hover:text-ink-900 transition-colors"
        >
          <ArrowLeft size={16} strokeWidth={2} />
        </button>
        <span className="font-bold text-[17px] text-forest-900 tracking-tight">
          NextChapter
        </span>
        {/* Spacer keeps title centered */}
        <div className="w-8" />
      </div>

      <div className="px-6 pt-8">
        {/* ── Title ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.05, ease }}
          className="mb-8"
        >
          <h1 className="text-[34px] font-bold text-gray-900 leading-[1.08] tracking-tight">
            Welcome back.
          </h1>
          <p className="text-[14px] text-ink-400 leading-relaxed mt-2.5">
            Sign in to continue your reading journey.
          </p>
        </motion.div>

        {/* ── Form ─────────────────────────────────────────────────── */}
        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease }}
          onSubmit={handleSignIn}
          noValidate
          className="space-y-4"
        >
          {/* Email input */}
          <div>
            <label className="block text-[10.5px] font-bold tracking-[0.15em] uppercase text-ink-400 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="curator@nextchapter.com"
              autoComplete="email"
              autoCapitalize="none"
              disabled={busy}
              className="w-full bg-[#e4ede2] rounded-2xl px-4 py-[15px] text-[15px] text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-brand-400/60 transition-all disabled:opacity-60"
            />
          </div>

          {/* Password input */}
          <div>
            <label className="block text-[10.5px] font-bold tracking-[0.15em] uppercase text-ink-400 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={busy}
                className="w-full bg-[#e4ede2] rounded-2xl px-4 py-[15px] pr-12 text-[15px] text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-brand-400/60 transition-all disabled:opacity-60"
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff size={18} strokeWidth={1.8} />
                ) : (
                  <Eye size={18} strokeWidth={1.8} />
                )}
              </button>
            </div>
          </div>

          {/* Forgot password */}
          <div className="flex justify-end">
            <Link href="/onboarding/forgot-password">
              <span className="text-[11px] font-bold tracking-[0.12em] uppercase text-ink-400 hover:text-ink-700 transition-colors">
                Forgot password?
              </span>
            </Link>
          </div>

          {/* Error message */}
          <AnimatePresence>
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -4, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -4, height: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-red-50 border border-red-100 rounded-2xl px-4 py-3 overflow-hidden"
              >
                <p className="text-[13px] text-red-600 leading-snug">{errorMsg}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sign In button */}
          <motion.button
            type="submit"
            disabled={!canSubmit}
            whileTap={canSubmit ? { scale: 0.97 } : {}}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className={cn(
              "w-full py-[17px] rounded-full text-[16px] font-bold text-white mt-1 transition-all duration-200",
              canSubmit
                ? "bg-brand-500 hover:bg-brand-600 active:bg-brand-700 shadow-[0_4px_22px_rgba(42,168,101,0.38)]"
                : "bg-brand-300 cursor-not-allowed opacity-70"
            )}
          >
            {localLoading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                Signing in…
              </span>
            ) : (
              "Sign In"
            )}
          </motion.button>
        </motion.form>

        {/* ── OR divider ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.28, ease }}
          className="flex items-center gap-4 my-6"
        >
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-[12px] font-semibold text-gray-400 tracking-widest">OR</span>
          <div className="flex-1 h-px bg-gray-200" />
        </motion.div>

        {/* ── Social buttons ───────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.34, ease }}
          className="space-y-3"
        >
          {/* Google */}
          <button
            type="button"
            onClick={() => handleOAuth("google")}
            disabled={busy}
            className="w-full flex items-center justify-center gap-3 py-[15px] rounded-full bg-white border border-gray-200 text-[15px] font-semibold text-gray-800 shadow-sm hover:bg-gray-50 active:bg-gray-100 transition-all disabled:opacity-60"
          >
            {oauthLoading === "google" ? (
              <span className="w-4 h-4 rounded-full border-2 border-gray-300 border-t-gray-700 animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            Continue with Google
          </button>

          {/* Apple */}
          <button
            type="button"
            onClick={() => handleOAuth("apple")}
            disabled={busy}
            className="w-full flex items-center justify-center gap-3 py-[15px] rounded-full bg-gray-900 text-[15px] font-semibold text-white shadow-sm hover:bg-black active:bg-gray-800 transition-all disabled:opacity-60"
          >
            {oauthLoading === "apple" ? (
              <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <AppleIcon />
            )}
            Continue with Apple
          </button>
        </motion.div>

        {/* ── Footer ───────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.44, ease }}
          className="text-center text-[14px] text-gray-500 mt-8"
        >
          Don&apos;t have an account?{" "}
          <Link
            href="/onboarding/auth"
            className="font-bold text-forest-900 hover:underline"
          >
            Sign up
          </Link>
        </motion.p>
      </div>
    </div>
  );
}
