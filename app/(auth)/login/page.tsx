"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import JoinLogo from "@/components/ui/JoinLogo";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { EnvelopeIcon, LockIcon } from "@/components/ui/icons";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return setError("Please enter your email.");
    if (!password) return setError("Please enter your password.");
    setError("");
    setLoading(true);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (authError) return setError("Wrong email or password.");
    router.push("/summary");
    router.refresh();
  }

  async function handleGuestLogin() {
    setError("");
    setGuestLoading(true);
    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInAnonymously();
    setGuestLoading(false);
    if (authError) return setError("Guest login failed. Please try again.");
    router.push("/summary");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-bg-app flex flex-col">
      <header className="flex items-center justify-between px-8 py-6">
        <JoinLogo width={80} />
        <div className="flex items-center gap-4">
          <span className="text-navy text-base hidden sm:block">
            Not a Join user?
          </span>
          <Link href="/register">
            <Button variant="primary">Sign up</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="bg-white rounded-[30px] shadow-card w-full max-w-120 px-5 py-8 lg:px-12 lg:py-10">
          <h1 className="text-4xl font-bold text-navy text-center">Log in</h1>
          <div className="w-28 h-0.5 bg-blue mx-auto mt-2 mb-8" />

          <form
            onSubmit={handleLogin}
            className="flex flex-col gap-4"
            noValidate
          >
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<EnvelopeIcon />}
              autoComplete="email"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<LockIcon />}
              autoComplete="current-password"
            />
            {error ? (
              <p className="text-error text-sm text-center">{error}</p>
            ) : null}

            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-center gap-4 mt-2">
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                className="whitespace-nowrap"
              >
                Log in
              </Button>
              <Button
                type="button"
                variant="secondary"
                loading={guestLoading}
                onClick={handleGuestLogin}
                className="whitespace-nowrap"
              >
                Guest Log in
              </Button>
            </div>
          </form>
        </div>
      </main>

      <footer className="flex items-center justify-center gap-6 py-6">
        <Link
          href="/privacy-policy"
          className="text-muted text-sm hover:text-navy transition-colors duration-100"
        >
          Privacy Policy
        </Link>
        <Link
          href="/legal-notice"
          className="text-muted text-sm hover:text-navy transition-colors duration-100"
        >
          Legal notice
        </Link>
      </footer>
    </div>
  );
}
