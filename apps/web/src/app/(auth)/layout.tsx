"use client";

export default function AuthLayout({ children, }: { children: React.ReactNode; }) {
  return (
    <div className="min-h-screen flex bg-background max-h-screen overflow-hidden">
      {/* Left Side: Auth Content */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 md:px-20 lg:px-32 relative overflow-y-auto">
        <div className="w-full max-w-sm mx-auto py-12">
          {/* Brand Header (Mobile or simplified) */}
          <div className="mb-12 flex flex-col gap-2">
            <h1 className="text-3xl font-black uppercase tracking-tightest">
              promptbox<span className="text-primary">.</span>
            </h1>
            <p className="font-mono text-[10px] text-highest uppercase tracking-widest">
              Standard Access Protocol // v1.0
            </p>
          </div>

          {/* Form Content */}
          <div className="relative">
            {children}
          </div>

          {/* Footer Info */}
          <div className="mt-12 pt-8 border-t border-outline/50">
            <p className="font-mono text-[10px] text-highest uppercase tracking-widest leading-relaxed">
              By accessing this terminal, you agree to our <br />
              <span className="text-white">Industrial Terms of Service</span> & <span className="text-white">Privacy Policy.</span>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Product Graphic */}
      <div className="hidden lg:flex flex-1 bg-surface-lowest border-l-4 border-outline relative overflow-hidden group">
        {/* Background Mesh/Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#333_1px,transparent_1px)] bg-size-[20px_20px]" />

        {/* The Graphic Container */}
        <div className="relative w-full h-full flex items-center justify-center p-12">
          <div className="w-full h-full border-2 border-outline relative flex flex-col items-center justify-center p-8 overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent pointer-events-none" />

            {/* If we have the image, we show it here. For now, a striking placeholder */}
            <div className="relative z-10 text-center space-y-6">
              <div className="inline-block border-2 border-primary px-3 py-1 font-mono text-[10px] text-primary uppercase tracking-tightest bg-primary/5">
                System Status: Online
              </div>
              <h2 className="text-6xl font-black uppercase tracking-tightest leading-none">
                Secure <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-white font-bold">Encrypted</span> <br />
                Storage
              </h2>
              <p className="font-mono text-xs text-highest uppercase tracking-widest max-w-xs mx-auto leading-relaxed">
                Professional grade prompt management for power users and terminal explorers.
              </p>
            </div>

            {/* Industrial Decals */}
            <div className="absolute top-4 left-4 font-mono text-[10px] text-outline uppercase tracking-widest">
              PBX-SYS-LOG: 204.09
            </div>
            <div className="absolute bottom-4 right-4 font-mono text-[10px] text-outline uppercase tracking-widest">
              AUTH_SPLIT_V1
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
