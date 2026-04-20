export const dynamic = "force-dynamic";

import { Suspense } from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Download } from "lucide-react";
import { DashboardNav } from "@/components/DashboardNav";

export default function DashboardLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar - The Steel Frame */}
      <aside className="w-64 border-r-3 border-outline flex flex-col h-full overflow-hidden shrink-0">
        {/* Brand */}
        <div className="p-6 border-b-3 border-outline">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-none flex items-center justify-center border-2 border-black shadow-brutalist-orange shrink-0">
              <span className="text-black font-black text-xl">P</span>
            </div>
            <h2 className="text-xl font-bold uppercase tracking-tighter">
              promptbox<span className="text-primary">.</span>
            </h2>
          </Link>
          <div className="mt-2 font-mono text-[10px] text-highest uppercase tracking-widest">
            Your Toolbox
          </div>
        </div>

        {/* Primary Nav & Extension */}
        <div className="flex-1 overflow-y-auto flex flex-col justify-start">
          <DashboardNav />
          <div className="px-4 pb-4">
            <Link
              href="/dashboard/install"
              className="flex items-center justify-between h-14 p-4 bg-secondary/10 border-2 border-secondary/50 text-secondary hover:bg-secondary/20 transition-colors group"
            >
              <div className="flex items-center gap-3">
                <Download className="w-4 h-4" />
                <span className="font-mono text-[11px] uppercase font-bold">Get Browser App</span>
              </div>
              <span className="w-2 h-2 bg-secondary" />
            </Link>
          </div>
        </div>

        {/* User Profile Footer */}
        <div className="p-4 border-t-3 border-outline">
          <div className="w-full">
            <UserButton showName appearance={{
              elements: {
                userButtonTrigger: "w-full !flex !flex-row items-center justify-start h-14 p-4 !bg-secondary border-2 border-black rounded-none shadow-[4px_4px_0px_0px_white] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all",
                userButtonBox: "!flex !flex-row items-center gap-4 !w-full !max-w-none",
                userButtonAvatarBox: "!-order-1 rounded-none border-2 border-black w-7 h-7 shrink-0",
                userButtonOuterIdentifier: "font-mono text-[11px] uppercase font-black !text-black !opacity-100 tracking-widest",
              }
            }} />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto flex flex-col relative w-full h-screen overflow-x-hidden border-l-3 border-outline">
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </main>
    </div>
  );
}
