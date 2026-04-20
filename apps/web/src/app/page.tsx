import Link from "next/link";
import { Button } from "@promptbox/ui";
import { ArrowRight, Zap, Target, Shield } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

export default async function LandingPage() {
  const { userId } = await auth();

  return (
    <div className="flex-1 flex flex-col bg-background selection:bg-secondary selection:text-black">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto w-full border-b-3 border-outline">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-none flex items-center justify-center border-2 border-black shadow-brutalist-orange">
            <span className="text-black font-black text-xl">P</span>
          </div>
          <h1 className="text-xl font-bold uppercase tracking-tighter">
            promptbox<span className="text-primary">.</span>
          </h1>
        </div>
        <div className="flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-highest">
          {userId ? (
            <>
              <Link href="/dashboard" className="hover:text-primary transition-colors">Home</Link>
              <UserButton />
            </>
          ) : (
            <Link href="/sign-in">
              <Button variant="secondary" className="px-6">Sign In</Button>
            </Link>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center">
        {/* Welcome Section */}
        <section className="w-full flex flex-col items-center justify-center text-center px-6 pt-20 pb-40 md:pb-60 md:pt-30 space-y-12 max-w-5xl mx-auto">
          <div className="space-y-8">
            <div className="inline-block bg-primary text-black px-4 py-1.5 font-mono text-[11px] font-black uppercase tracking-widest border-2 border-black shadow-brutalist">
              VERSION 1.0 // STABLE
            </div>
            <h2 className="text-5xl md:text-8xl font-bold uppercase tracking-tightest leading-[0.85] text-white">
              Save your <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary via-white to-secondary">best prompts.</span>
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-highest font-mono uppercase tracking-tight leading-relaxed">
              One place to store, sync, and find your prompts instantly.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <Link href="/dashboard">
              <Button size="lg" className="px-12 py-8 text-lg group bg-primary hover:bg-white hover:text-black border-4 border-black shadow-brutalist transition-all">
                Open Your Vault <ArrowRight className="ml-4 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
            <Link href="https://github.com/mnchaudhry/promptbox">
              <Button variant="outline" size="lg" className="px-12 py-8 text-lg border-4 border-outline hover:border-white transition-all">
                Get Code
              </Button>
            </Link>
          </div>
        </section>

        {/* Feature Grid - The Foundation */}
        <section className="w-full bg-surface border-y-4 border-outline">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y-4 md:divide-y-0 md:divide-x-4 divide-outline">
            <div className="p-12 space-y-4 hover:bg-primary/5 transition-colors group">
              <div className="w-12 h-12 bg-white flex items-center justify-center border-3 border-black group-hover:bg-primary group-hover:text-white transition-colors">
                <Zap className="w-6 h-6 text-black group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter">Fast Access</h3>
              <p className="text-highest font-mono text-sm uppercase leading-relaxed">
                Find any prompt in seconds. Built for people who work fast.
              </p>
            </div>
            <div className="p-12 space-y-4 hover:bg-secondary/5 transition-colors group">
              <div className="w-12 h-12 bg-white flex items-center justify-center border-3 border-black group-hover:bg-secondary group-hover:text-white transition-colors">
                <Target className="w-6 h-6 text-black group-hover:text-white" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter">Easy Sorting</h3>
              <p className="text-highest font-mono text-sm uppercase leading-relaxed">
                Add tags to keep everything clean and easy to find.
              </p>
            </div>
            <div className="p-12 space-y-4 hover:bg-white/5 transition-colors group">
              <div className="w-12 h-12 bg-white flex items-center justify-center border-3 border-black group-hover:bg-white group-hover:text-black transition-colors">
                <Shield className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter">Private</h3>
              <p className="text-highest font-mono text-sm uppercase leading-relaxed">
                Your prompts are private. No one else can see them.
              </p>
            </div>
          </div>
        </section>

        {/* Scanning Marquee */}
        <section className="w-full bg-black py-4 border-b-4 border-outline overflow-hidden whitespace-nowrap">
          <div className="flex animate-marquee gap-20">
            {[...Array(6)].map((_, i) => (
              <span key={i} className="text-primary font-mono text-[10px] uppercase font-bold tracking-[0.3em]">
                SYNCING VAULT // SAVING DATA // READY...
              </span>
            ))}
          </div>
        </section>

        {/* Extension Teaser */}
        <section className="w-full py-60 px-6 flex flex-col items-center justify-center text-center space-y-12 bg-linear-to-b from-background to-surface">
          <div className="border-4 border-white p-1 shadow-brutalist-white">
             <div className="bg-white text-black px-8 py-3 font-black uppercase tracking-widest text-lg">
               Browser Extension
             </div>
          </div>
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter max-w-5xl leading-[0.9]">
            Save from <span className="text-secondary">anywhere.</span>
          </h2>
          <p className="max-w-xl text-highest font-mono uppercase tracking-tight text-sm leading-relaxed">
            One click to save text from any website into your vault.
          </p>
          <div className="pt-10">
            <Link href="/dashboard/install">
              <Button variant="secondary" className="px-10 py-6 border-4 border-black text-black">
                Install Tool
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="p-12 border-t-4 border-outline bg-surface-lowest">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-black uppercase tracking-tighter">
              promptbox<span className="text-primary">.</span>
            </h2>
          </div>
          <p className="font-mono text-[10px] text-highest uppercase tracking-widest opacity-50">
            © 2026 promptbox // PROMPTS ARE ASSETS // MNCHAUDHRY
          </p>
          <div className="flex gap-8 font-mono text-[10px] uppercase tracking-widest text-highest">
            <Link href="#" className="hover:text-primary">Privacy</Link>
            <Link href="#" className="hover:text-primary">Terms</Link>
            <Link href="#" className="hover:text-primary">System</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
