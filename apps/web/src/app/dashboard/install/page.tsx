export const dynamic = "force-dynamic";

import { Button, Card } from "@promptbox/ui";
import { Download, Globe, ShieldCheck, Zap } from "lucide-react";

export default function InstallPage() {
  return (
    <div className="flex-1 p-8 md:p-12 space-y-12 max-w-5xl mx-auto">
      <div className="space-y-4">
        <h1 className="text-5xl font-black uppercase tracking-tighter">Install promptbox<span className="text-primary">.</span></h1>
        <p className="font-mono text-xs uppercase tracking-widest text-highest max-w-2xl leading-relaxed">
          The manual work ends here. Install the companion app to capture any text from any website directly into your vault.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8 border-4 border-primary bg-surface shadow-brutalist-orange space-y-6">
          <div className="flex items-center gap-4">
            <Globe className="w-10 h-10 text-primary" />
            <h2 className="text-2xl font-black uppercase tracking-tighter">Chrome Extension</h2>
          </div>
          <p className="font-mono text-xs uppercase text-highest leading-relaxed">
            Our most powerful companion. Works on Chrome, Brave, Arc, and all Chromium browsers.
          </p>
          <Button className="w-full py-6 bg-primary text-black font-black uppercase border-3 border-black shadow-brutalist hover:bg-white transition-all">
            Add to Browser
          </Button>
        </Card>

        <Card className="p-8 border-4 border-outline bg-surface-lowest space-y-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Download className="w-10 h-10 text-secondary" />
              <h2 className="text-2xl font-black uppercase tracking-tighter">Local App</h2>
            </div>
            <p className="font-mono text-xs uppercase text-highest leading-relaxed">
              Desktop companion for deeper system integration (Coming Sunday).
            </p>
          </div>
          <Button variant="outline" disabled className="w-full py-6 border-3 border-outline opacity-50 cursor-not-allowed">
            Coming Soon
          </Button>
        </Card>
      </div>

      <div className="border-t-4 border-outline pt-12">
        <h3 className="text-xl font-bold uppercase mb-8">Why install the companion?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-3">
            <Zap className="text-primary w-6 h-6" />
            <h4 className="font-bold uppercase text-sm">One-Click Save</h4>
            <p className="font-mono text-[10px] uppercase text-highest leading-relaxed">
              Highlight text on any site and click the popover or hotkey to save instantly.
            </p>
          </div>
          <div className="space-y-3">
            <ShieldCheck className="text-secondary w-6 h-6" />
            <h4 className="font-bold uppercase text-sm">Context Aware</h4>
            <p className="font-mono text-[10px] uppercase text-highest leading-relaxed">
              Automatically captures the URL and page title so you know where it came from.
            </p>
          </div>
          <div className="space-y-3">
            <Download className="text-white w-6 h-6" />
            <h4 className="font-bold uppercase text-sm">Offline Access</h4>
            <p className="font-mono text-[10px] uppercase text-highest leading-relaxed">
              Browse your prompts even when you aren&apos;t on the website.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
