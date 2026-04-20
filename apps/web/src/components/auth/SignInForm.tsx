"use client";

import { useClerk } from "@clerk/nextjs";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@promptbox/ui";
import { Loader2, Chrome, ArrowRight, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function SignInForm() {

  //////////////////////////////////////////// VARIABLES //////////////////////////////////////////// 
  const { client, setActive } = useClerk();
  const signIn = client?.signIn;

  //////////////////////////////////////////// STATES //////////////////////////////////////////// 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  if (!signIn) return null;

  //////////////////////////////////////////// FUNCTIONS //////////////////////////////////////////// 
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!signIn) return;

    setIsPending(true);
    setError(null);

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/dashboard");
      } else {
        console.log(result);
      }
    } catch (err: unknown) {
      const error = err as { errors?: { message: string }[] };
      setError(error.errors?.[0]?.message || "Authentication failed");
    } finally {
      setIsPending(false);
    }
  }

  const handleOAuth = (strategy: "oauth_google") => {
    if (!signIn) return;
    signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/dashboard",
    });
  };

  //////////////////////////////////////////// RENDER //////////////////////////////////////////// 
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold uppercase tracking-tightest">Sign In</h2>
        <p className="font-mono text-[10px] text-highest uppercase tracking-widest">
          Welcome back. Enter your credentials.
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
          <span className="font-mono text-xs uppercase font-bold tracking-widest">Google ID</span>
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
              placeholder="operator@system.com"
              required
              className="bg-surface-lowest border-2 border-outline focus:border-primary transition-all h-12 px-4 rounded-none"
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="font-mono text-[10px] text-highest uppercase tracking-widest">Password</label>
              <Link href="#" className="font-mono text-[10px] text-primary uppercase tracking-widest hover:underline">Forgot?</Link>
            </div>
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
              Authorize <ArrowRight className="w-4 h-4" />
            </span>
          )}
        </Button>
      </form>

      <p className="text-center font-mono text-[11px] text-highest uppercase tracking-widest">
        No Access?{" "}
        <Link href="/sign-up" className="text-white hover:text-primary transition-colors font-bold underline underline-offset-4">
          Request Entry
        </Link>
      </p>
    </div>
  );
}
