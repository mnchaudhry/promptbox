"use client";

import { useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@promptbox/ui";
import { Loader2, Chrome, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function SignUpForm() {
  
  //////////////////////////////////////////// VARIABLES //////////////////////////////////////////// 
  const { client, setActive } = useClerk();
  const signUp = client?.signUp;
  
  //////////////////////////////////////////// STATES //////////////////////////////////////////// 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  
  if (!signUp) return null;
  
  //////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////// 
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!signUp) return;

    setIsPending(true);
    setError(null);

    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: unknown) {
      const error = err as { errors?: { message: string }[] };
      setError(error.errors?.[0]?.message || "Creation failed");
    } finally {
      setIsPending(false);
    }
  }

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    if (!signUp) return;

    setIsPending(true);
    setError(null);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.push("/dashboard");
      }
    } catch (err: unknown) {
      const error = err as { errors?: { message: string }[] };
      setError(error.errors?.[0]?.message || "Verification failed");
    } finally {
      setIsPending(false);
    }
  }

  const handleOAuth = (strategy: "oauth_google") => {
    if (!signUp) return;
    signUp.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sign-up/sso-callback",
      redirectUrlComplete: "/dashboard",
    });
  };

  //////////////////////////////////////////// RENDER //////////////////////////////////////////// 
  if (pendingVerification) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold uppercase tracking-tightest">Verify Identity</h2>
          <p className="font-mono text-[10px] text-highest uppercase tracking-widest">
            A verification code was sent to {email}.
          </p>
        </div>

        {error && (
          <div className="p-4 bg-primary/10 border-2 border-primary/50 flex items-start gap-3 text-primary animate-in zoom-in-95 duration-200">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <p className="font-mono text-[10px] uppercase font-bold tracking-widest">{error}</p>
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="font-mono text-[10px] text-highest uppercase tracking-widest px-1">Access Code</label>
              <Input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="000000"
                required
                className="bg-surface-lowest border-2 border-outline focus:border-primary transition-all h-12 px-4 rounded-none text-center text-xl tracking-[0.5em]"
              />
            </div>
          </div>

          <Button 
            disabled={isPending}
            className="w-full h-14 bg-secondary text-black font-black uppercase text-sm tracking-widest border-2 border-black shadow-brutalist hover:shadow-brutalist-yellow transition-all"
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <span className="flex items-center gap-2">
                Verify Protocol <ShieldCheck className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold uppercase tracking-tightest">New Account</h2>
        <p className="font-mono text-[10px] text-highest uppercase tracking-widest">
          Register with the industrial network.
        </p>
      </div>

      {error && (
        <div className="p-4 bg-primary/10 border-2 border-primary/50 flex items-start gap-3 text-primary animate-in zoom-in-95 duration-200">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p className="font-mono text-[10px] uppercase font-bold tracking-widest">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4">
        <Button 
          variant="secondary" 
          className="w-full h-12 flex items-center justify-center gap-3 border-2 border-outline hover:bg-surface-container-high"
          onClick={() => handleOAuth("oauth_google")}
        >
          <Chrome className="w-4 h-4" />
          <span className="font-mono text-xs uppercase font-bold tracking-widest">Join with Google</span>
        </Button>
      </div>

      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-outline"></div>
        </div>
        <span className="relative px-4 bg-background text-outline font-mono text-[10px] uppercase tracking-widest">or</span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="font-mono text-[10px] text-highest uppercase tracking-widest px-1">Email Address</label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="future@promptbox.com"
              required
              className="bg-surface-lowest border-2 border-outline focus:border-primary transition-all h-12 px-4 rounded-none"
            />
          </div>
          <div className="space-y-2">
            <label className="font-mono text-[10px] text-highest uppercase tracking-widest px-1">Create Password</label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="bg-surface-lowest border-2 border-outline focus:border-primary transition-all h-12 px-4 rounded-none"
            />
          </div>
        </div>

        <Button 
          disabled={isPending}
          className="w-full h-14 bg-primary text-black font-black uppercase text-sm tracking-widest border-2 border-black shadow-brutalist hover:shadow-brutalist-orange transition-all"
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <span className="flex items-center gap-2">
              Join System <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </Button>
      </form>

      <p className="text-center font-mono text-[11px] text-highest uppercase tracking-widest">
        Already Joined?{" "}
        <Link href="/sign-in" className="text-white hover:text-primary transition-colors font-bold underline underline-offset-4">
          Sign In
        </Link>
      </p>
    </div>
  );
}
