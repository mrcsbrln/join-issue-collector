"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { randomAvatarColor } from "@/lib/utils";
import JoinLogo from "@/components/ui/JoinLogo";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  EnvelopeIcon,
  LockIcon,
  PersonIcon,
  ArrowLeftIcon,
} from "@/components/ui/icons";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  policy?: string;
  general?: string;
}

function validate(
  name: string,
  email: string,
  password: string,
  confirm: string,
  policy: boolean,
): FormErrors {
  const errs: FormErrors = {};
  if (!name.trim()) errs.name = "Name is required.";
  if (!email.trim()) errs.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errs.email = "Invalid email address.";
  if (!password) errs.password = "Password is required.";
  else if (password.length < 8)
    errs.password = "At least 8 characters required.";
  if (password !== confirm) errs.confirmPassword = "Passwords do not match.";
  if (!policy) errs.policy = "Please accept the privacy policy.";
  return errs;
}

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(name, email, password, confirmPassword, acceptPolicy);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    const supabase = createClient();
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });
    if (authError || !data.user) {
      setLoading(false);
      return setErrors({
        general: authError?.message ?? "Registration failed.",
      });
    }

    const color = randomAvatarColor(name.trim());
    await supabase.from("profiles").upsert({
      id: data.user.id,
      name: name.trim(),
      email,
      color,
      is_guest: false,
    });
    await supabase.from("contacts").insert({ name: name.trim(), email, color });

    setLoading(false);
    router.push("/summary");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-bg-app flex flex-col">
      <header className="px-2 lg:px-8 py-6">
        <JoinLogo width={80} />
      </header>

      <main className="flex-1 flex items-center justify-center px-2 py-8">
        <div className="bg-white rounded-[30px] shadow-card w-full max-w-120 px-5 py-8 lg:px-12 lg:py-10">
          <div className="flex items-center justify-center gap-4 mb-2">
            <Link
              href="/login"
              className="hover:opacity-70 transition-opacity duration-100 flex-shrink-0"
            >
              <ArrowLeftIcon />
            </Link>
            <h1 className="text-4xl font-bold text-navy">Sign up</h1>
          </div>
          <div className="w-28 h-0.5 bg-blue mx-auto mt-2 mb-8" />

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
            noValidate
          >
            <Input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<PersonIcon />}
              error={errors.name}
              autoComplete="name"
            />
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<EnvelopeIcon />}
              error={errors.email}
              autoComplete="email"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<LockIcon />}
              error={errors.password}
              autoComplete="new-password"
            />
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={<LockIcon />}
              error={errors.confirmPassword}
              autoComplete="new-password"
            />

            <label className="flex items-center gap-3 cursor-pointer mt-1">
              <input
                type="checkbox"
                className="w-4 h-4 cursor-pointer accent-navy"
                checked={acceptPolicy}
                onChange={(e) => setAcceptPolicy(e.target.checked)}
              />
              <span className="text-sm text-navy">
                I accept the{" "}
                <Link
                  href="/privacy-policy"
                  className="text-blue hover:underline"
                >
                  Privacy policy
                </Link>
              </span>
            </label>
            {errors.policy ? (
              <p className="text-error text-sm">{errors.policy}</p>
            ) : null}
            {errors.general ? (
              <p className="text-error text-sm text-center">{errors.general}</p>
            ) : null}

            <div className="flex justify-center mt-2">
              <Button
                type="submit"
                variant="primary"
                loading={loading}
                disabled={
                  !name.trim() ||
                  !email.trim() ||
                  !password ||
                  !confirmPassword ||
                  !acceptPolicy
                }
              >
                Sign up
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
