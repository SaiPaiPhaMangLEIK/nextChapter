"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSignUp, useUser } from "@clerk/nextjs";
import { ArrowLeft, Eye, EyeOff, BookMarked, Bookmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ─── Brand icons ──────────────────────────────────────────────────────────────

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4zm-3.23-17.2c.05 1.96-1.4 3.56-3.29 3.71-.24-1.92 1.44-3.63 3.29-3.71z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-[18px] h-[18px]">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────

const ease = [0.16, 1, 0.3, 1] as const;
const STEP = 10;
const TOTAL = 11;

type FormStep = "form" | "verify";
type PasswordStrength = "weak" | "ok" | "strong";
type OAuthProvider = "apple" | "google";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AuthPage() {
  const router = useRouter();
  // Clerk v7: useSignUp returns { signUp, fetchStatus, errors }
  const { signUp, fetchStatus } = useSignUp();
  const { isSignedIn, isLoaded: userLoaded } = useUser();

  const [formStep, setFormStep] = useState<FormStep>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [code, setCode] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<OAuthProvider | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [strength, setStrength] = useState<PasswordStrength | null>(null);

  // Already signed-in → continue onboarding
  useEffect(() => {
    if (userLoaded && isSignedIn) router.replace("/onboarding/step-7");
  }, [userLoaded, isSignedIn, router]);

  // Password strength
  useEffect(() => {
    if (!password) { setStrength(null); return; }
    if (password.length < 8) setStrength("weak");
    else if (password.length < 12 || !/[^a-zA-Z0-9]/.test(password)) setStrength("ok");
    else setStrength("strong");
  }, [password]);

  const isFetching = fetchStatus === "fetching";
  const busy = localLoading || isFetching || !!oauthLoading;

  // ── OAuth (Clerk v7: signUp.sso) ───────────────────────────────────────────

  async function handleOAuth(provider: OAuthProvider) {
    if (!signUp) return;
    setOauthLoading(provider);
    setErrorMsg(null);
    const { error } = await signUp.sso({
      strategy: provider === "apple" ? "oauth_apple" : "oauth_google",
      redirectUrl: `${window.location.origin}/sso-callback`,
      redirectCallbackUrl: "/onboarding/step-7",
    });
    if (error) {
      setErrorMsg(error.message ?? "OAuth sign-in failed. Please try another method.");
      setOauthLoading(null);
    }
  }

  // ── Email signup (Clerk v7: signUp.password) ───────────────────────────────

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!signUp || !name.trim() || !email.trim() || !password) return;
    setLocalLoading(true);
    setErrorMsg(null);

    // Load onboarding state to attach to unsafeMetadata
    let onboardingState: Record<string, unknown> = {};
    try {
      onboardingState = JSON.parse(localStorage.getItem("onboarding_state") ?? "{}");
    } catch { /* ignore */ }

    const parts = name.trim().split(" ");
    const firstName = parts[0];
    const lastName = parts.slice(1).join(" ") || undefined;

    const { error } = await signUp.password({
      firstName,
      lastName,
      emailAddress: email.trim(),
      password,
      unsafeMetadata: { ...onboardingState, onboardingComplete: false },
    });

    if (error) {
      setErrorMsg(error.message ?? "Sign up failed. Please try again.");
      setLocalLoading(false);
      return;
    }

    // Email verification required — send the code
    if (signUp.status === "missing_requirements") {
      const { error: sendError } = await signUp.verifications.sendEmailCode();
      if (sendError) {
        setErrorMsg(sendError.message ?? "Failed to send verification code.");
        setLocalLoading(false);
        return;
      }
      setFormStep("verify");
    } else if (signUp.status === "complete") {
      await signUp.finalize();
      router.push("/onboarding/step-7");
    }
    setLocalLoading(false);
  }

  // ── Verification code (Clerk v7: signUp.verifications.verifyEmailCode) ─────

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!signUp || code.length < 6) return;
    setLocalLoading(true);
    setErrorMsg(null);

    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) {
      setErrorMsg(error.message ?? "Invalid code. Please try again.");
      setLocalLoading(false);
      return;
    }

    if (signUp.status === "complete") {
      // Mark onboarding as done in localStorage
      try {
        const state = JSON.parse(localStorage.getItem("onboarding_state") ?? "{}");
        localStorage.setItem(
          "onboarding_state",
          JSON.stringify({ ...state, onboardingComplete: true })
        );
      } catch { /* ignore */ }
      await signUp.finalize();
      router.push("/onboarding/step-7");
    } else {
      setErrorMsg("Verification not complete. Please try again.");
    }
    setLocalLoading(false);
  }

  const pct = Math.round((STEP / TOTAL) * 100);

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div
      className="min-h-screen pb-10"
      style={{
        background:
          "linear-gradient(180deg, #e6f0e3 0%, #f0f5ee 35%, #f5f2eb 100%)",
      }}
    >
      {/* ── Header ──────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 pt-14 pb-6">
        <Link
          href="/onboarding/preview"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-white/70 border border-white/80 shadow-sm text-ink-600 hover:text-ink-900 transition-colors"
        >
          <ArrowLeft size={16} strokeWidth={2} />
        </Link>
        <span className="font-bold text-[17px] text-forest-900 tracking-tight">
          NextChapter
        </span>
        <div className="w-[56px] h-[3px] bg-sage-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-brand-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 1, delay: 0.3, ease }}
          />
        </div>
      </div>

      <div className="px-5 space-y-5">
        {/* ── Title ─────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease }}
        >
          <h1 className="font-bold text-[30px] leading-[1.18] tracking-tight text-forest-900">
            Join the{" "}
            <em className="not-italic font-bold italic font-serif text-brand-600">
              next
            </em>{" "}
            chapter.
          </h1>
          <p className="mt-2 text-[13.5px] text-ink-400 leading-[1.65]">
            Create your account to save your library, track your reading
            progress, and receive curated book recommendations.
          </p>
        </motion.div>

        {/* ── OAuth buttons ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease }}
          className="flex flex-col gap-3"
        >
          <motion.button
            type="button"
            onClick={() => handleOAuth("apple")}
            disabled={busy}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="flex items-center justify-center gap-2.5 w-full py-[15px] rounded-full bg-forest-950 text-white font-semibold text-[15px] shadow-[0_2px_16px_rgba(0,0,0,0.20)] hover:bg-forest-900 transition-colors disabled:opacity-60"
          >
            {oauthLoading === "apple" ? (
              <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
            ) : (
              <><AppleIcon /> Continue with Apple</>
            )}
          </motion.button>

          <motion.button
            type="button"
            onClick={() => handleOAuth("google")}
            disabled={busy}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
            className="flex items-center justify-center gap-2.5 w-full py-[15px] rounded-full bg-white text-ink-800 font-semibold text-[15px] border border-sage-200 shadow-[0_1px_8px_rgba(0,0,0,0.06)] hover:bg-sage-50 transition-colors disabled:opacity-60"
          >
            {oauthLoading === "google" ? (
              <span className="w-4 h-4 rounded-full border-2 border-ink-200 border-t-ink-500 animate-spin" />
            ) : (
              <><GoogleIcon /> Continue with Google</>
            )}
          </motion.button>
        </motion.div>

        {/* ── Divider ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.32 }}
          className="flex items-center gap-3"
        >
          <div className="flex-1 h-px bg-sage-200" />
          <span className="text-[10px] font-bold tracking-[0.18em] text-ink-300 uppercase">
            Or use email
          </span>
          <div className="flex-1 h-px bg-sage-200" />
        </motion.div>

        {/* ── Form / Verify ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.38, ease }}
        >
          <AnimatePresence mode="wait">
            {formStep === "form" ? (
              /* ── Email form ─────────────────────────────────────── */
              <motion.form
                key="signup-form"
                onSubmit={handleEmailSubmit}
                className="flex flex-col gap-4"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
              >
                {/* Full name */}
                <div>
                  <label className="block text-[10.5px] font-bold tracking-[0.14em] text-ink-500 uppercase mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Eleanor Vance"
                    required
                    autoComplete="name"
                    className="w-full px-4 py-3.5 rounded-2xl bg-white border border-sage-200 text-[14px] text-ink-800 placeholder:text-ink-200 focus:outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100 transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[10.5px] font-bold tracking-[0.14em] text-ink-500 uppercase mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setErrorMsg(null); }}
                    placeholder="eleanor@example.com"
                    required
                    autoComplete="email"
                    className="w-full px-4 py-3.5 rounded-2xl bg-white border border-sage-200 text-[14px] text-ink-800 placeholder:text-ink-200 focus:outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100 transition-all"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="block text-[10.5px] font-bold tracking-[0.14em] text-ink-500 uppercase mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      autoComplete="new-password"
                      className="w-full px-4 py-3.5 pr-12 rounded-2xl bg-white border border-sage-200 text-[14px] text-ink-800 placeholder:text-ink-300 focus:outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-ink-300 hover:text-ink-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff size={17} strokeWidth={1.8} />
                      ) : (
                        <Eye size={17} strokeWidth={1.8} />
                      )}
                    </button>
                  </div>

                  {/* Strength bar */}
                  <AnimatePresence>
                    {strength && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 space-y-1.5 overflow-hidden"
                      >
                        <div className="flex gap-1">
                          {(["weak", "ok", "strong"] as PasswordStrength[]).map((s, i) => (
                            <div
                              key={s}
                              className={cn(
                                "flex-1 h-[3px] rounded-full transition-colors duration-300",
                                i <= (strength === "weak" ? 0 : strength === "ok" ? 1 : 2)
                                  ? strength === "weak"
                                    ? "bg-red-400"
                                    : strength === "ok"
                                    ? "bg-amber-400"
                                    : "bg-brand-600"
                                  : "bg-sage-100"
                              )}
                            />
                          ))}
                        </div>
                        <p
                          className={cn(
                            "text-[11px] font-medium",
                            strength === "weak" ? "text-red-400" :
                            strength === "ok" ? "text-amber-500" : "text-brand-600"
                          )}
                        >
                          {strength === "weak"
                            ? "Too short — use at least 8 characters"
                            : strength === "ok"
                            ? "Good — add symbols for a stronger password"
                            : "Strong password ✓"}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Inline error */}
                <AnimatePresence>
                  {errorMsg && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[12px] text-red-500 font-medium -mt-1"
                    >
                      {errorMsg}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={busy || !name.trim() || !email.trim() || !password}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 380, damping: 26 }}
                  className="w-full flex items-center justify-center py-[17px] rounded-full bg-forest-900 hover:bg-forest-800 text-white font-semibold text-[15px] shadow-[0_4px_22px_rgba(15,35,18,0.26)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {localLoading || isFetching ? (
                    <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  ) : (
                    "Create Account"
                  )}
                </motion.button>

                {/* Already have an account */}
                <p className="text-center text-[14px] text-ink-400 pt-1">
                  Already have an account?{" "}
                  <Link
                    href="/onboarding/signin"
                    className="font-bold text-forest-900 hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
              </motion.form>
            ) : (
              /* ── Verification code ──────────────────────────────── */
              <motion.form
                key="verify-form"
                onSubmit={handleVerify}
                className="flex flex-col gap-4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35, ease }}
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                    <BookMarked size={22} className="text-forest-700" strokeWidth={1.8} />
                  </div>
                  <p className="font-bold text-[16px] text-forest-900">
                    Check your inbox
                  </p>
                  <p className="text-[13px] text-ink-400 mt-1">
                    We sent a 6-digit code to{" "}
                    <span className="font-semibold text-ink-600">{email}</span>
                  </p>
                </div>

                <div>
                  <label className="block text-[10.5px] font-bold tracking-[0.14em] text-ink-500 uppercase mb-1.5">
                    Verification Code
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value.replace(/\D/g, "").slice(0, 6));
                      setErrorMsg(null);
                    }}
                    placeholder="••••••"
                    maxLength={6}
                    required
                    autoFocus
                    className="w-full px-4 py-3.5 rounded-2xl bg-white border border-sage-200 text-[22px] text-center font-bold tracking-[0.35em] text-ink-800 placeholder:text-ink-200 focus:outline-none focus:border-brand-300 focus:ring-2 focus:ring-brand-100 transition-all"
                  />
                </div>

                <AnimatePresence>
                  {errorMsg && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="text-[12px] text-red-500 font-medium -mt-1"
                    >
                      {errorMsg}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={busy || code.length < 6}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 380, damping: 26 }}
                  className="w-full flex items-center justify-center py-[17px] rounded-full bg-forest-900 hover:bg-forest-800 text-white font-semibold text-[15px] shadow-[0_4px_22px_rgba(15,35,18,0.26)] transition-colors disabled:opacity-50"
                >
                  {localLoading || isFetching ? (
                    <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
                  ) : (
                    "Verify & Continue"
                  )}
                </motion.button>

                <button
                  type="button"
                  onClick={() => { setFormStep("form"); setCode(""); setErrorMsg(null); }}
                  className="text-[12px] text-ink-400 hover:text-ink-600 transition-colors text-center"
                >
                  ← Use a different email
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Exclusive benefits ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.52, ease }}
          className="bg-white/60 border border-white/80 rounded-[20px] p-4"
        >
          <p className="font-bold text-[14px] text-forest-900 mb-3">
            Exclusive Benefits
          </p>
          <div className="flex flex-col gap-2">
            {[
              { icon: <BookMarked size={13} strokeWidth={2} />, label: "Early Access" },
              { icon: <Bookmark size={13} strokeWidth={2} />, label: "Unlimited Saves" },
            ].map(({ icon, label }) => (
              <div
                key={label}
                className="inline-flex items-center gap-2 px-3 py-2 bg-sage-50 rounded-xl w-fit"
              >
                <span className="text-forest-600">{icon}</span>
                <span className="text-[12.5px] font-semibold text-ink-700">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Legal ─────────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-[10.5px] text-ink-300 leading-relaxed px-2"
        >
          By signing up, you acknowledge that you have read and agree to
          NextChapter&apos;s{" "}
          <span className="text-brand-600 font-semibold">Terms of Service</span>{" "}
          and{" "}
          <span className="text-brand-600 font-semibold">Privacy Policy</span>.
          We use your data to personalize your reading experience.
        </motion.p>

        {/* ── Footer links ──────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          className="flex items-center justify-center gap-6 pb-4"
        >
          <button className="text-[11px] font-bold tracking-[0.14em] text-ink-300 hover:text-ink-500 uppercase transition-colors">
            Help Center
          </button>
          <Link
            href="/onboarding/signin"
            className="text-[11px] font-bold tracking-[0.14em] text-ink-300 hover:text-ink-500 uppercase transition-colors"
          >
            Log in instead
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
