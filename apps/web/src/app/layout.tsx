import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "promptbox | Your prompt saver",
  description: "Save and use your prompts anywhere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#FF4F00", // promptbox orange
          colorBackground: "#131313",
          colorInputBackground: "#0E0E0E",
          colorInputText: "#FFFFFF",
          colorText: "#FFFFFF",
          borderRadius: "0px",
        },
        elements: {
          card: "border-3 border-outline bg-surface rounded-none shadow-brutalist-orange",
          headerTitle: "font-sans uppercase tracking-tighter font-bold text-2xl",
          headerSubtitle: "font-mono uppercase tracking-widest text-[10px] text-highest",
          formButtonPrimary: "bg-primary text-black hover:bg-primary/90 border-2 border-black uppercase font-bold rounded-none shadow-brutalist transition-all py-3 px-6",
          socialButtonsBlockButton: "border-2 border-outline rounded-none hover:bg-surface-container-high transition-all font-mono uppercase text-[10px] tracking-widest py-3",
          socialButtonsBlockButtonText: "font-mono uppercase tracking-widest",
          footerActionLink: "text-primary hover:text-primary/80 font-bold uppercase text-[10px] tracking-widest",
          footerActionText: "font-mono uppercase text-[10px] tracking-widest text-highest",
          formFieldLabel: "font-mono uppercase text-[10px] tracking-widest text-highest mb-1",
          formFieldInput: "border-2 border-outline bg-surface-lowest rounded-none focus:border-primary transition-all p-3",
          dividerText: "font-mono uppercase text-[10px] text-highest",
          identityPreviewText: "font-mono uppercase text-xs",
          
          // User Button & Dropdown - The Brutalist Version
          userButtonAvatarBox: "rounded-none border-2 border-primary w-10 h-10",
          userButtonTrigger: "rounded-none border-2 border-outline focus:shadow-none focus:border-primary p-0.5",
          userButtonPopoverCard: "border-4 border-outline bg-background rounded-none shadow-brutalist-orange overflow-hidden",
          userButtonPopoverMain: "bg-background p-0",
          userButtonPopoverHeaderTitle: "text-white font-bold uppercase tracking-tighter !text-white",
          userButtonPopoverHeaderSubtitle: "text-highest font-mono text-[10px] uppercase tracking-widest !text-white/60",
          userButtonPopoverActions: "p-2",
          userButtonPopoverActionButton: "rounded-none hover:bg-primary hover:text-black transition-all p-3 group",
          userButtonPopoverActionButtonText: "font-mono uppercase tracking-widest text-[10px] font-bold !text-white group-hover:!text-black",
          userButtonPopoverActionButtonIcon: "text-primary group-hover:!text-black",
          userProfileData: "p-4 border-b-2 border-outline",
          userButtonPopoverFooter: "hidden",
          
          userProfileCard: "border-3 border-outline bg-surface rounded-none shadow-brutalist-orange",
          userProfileNavbar: "border-r-3 border-outline bg-surface-lowest",
          userProfileNavbarButton: "rounded-none hover:bg-primary hover:text-black transition-all",
          userProfileNavbarButtonText: "font-mono uppercase tracking-widest text-[10px]",
        },
      }}
    >
      <html
        lang="en"
        className={`${spaceGrotesk.variable} ${spaceMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col bg-background text-white">{children}</body>
      </html>
    </ClerkProvider>
  );
}
