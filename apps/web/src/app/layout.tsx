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
      domain={process.env.NODE_ENV === "production" ? "promptbox.opstintechnologies.com" : undefined}
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
          
          userProfileCard: "border-4 border-outline bg-surface rounded-none shadow-[8px_8px_0px_0px_var(--color-primary)] overflow-hidden",
          userProfileNavbar: "border-r-4 border-outline bg-surface-lowest p-4",
          userProfileNavbarButton: "rounded-none hover:bg-primary/20 hover:text-primary transition-all font-mono uppercase text-[11px] tracking-widest py-4 border-b border-outline last:border-b-0",
          userProfileNavbarButton__active: "bg-primary !text-black shadow-brutalist border-black",
          userProfileScrollBox: "bg-surface",
          userProfilePage: "p-10",
          userProfileHeaderTitle: "font-sans uppercase tracking-tighter font-black text-4xl mb-2",
          userProfileHeaderSubtitle: "font-mono uppercase tracking-widest text-[11px] text-highest mb-8",
          profileSection: "border-3 border-outline p-6 mb-8 relative bg-surface-container-low",
          profileSectionTitle: "absolute -top-4 left-4 bg-primary text-black px-3 py-1 font-mono uppercase text-[10px] font-black tracking-widest border-2 border-black shadow-[2px_2px_0px_0px_black]",
          profileSectionTitleText: "font-mono uppercase tracking-widest",
          profilePage__profile: "gap-8",
          breadcrumbs: "hidden", // Clean up the UI
          badge: "rounded-none border-2 border-black font-mono text-[9px] uppercase tracking-tighter bg-secondary text-black px-2 py-0.5",
          accordionButton: "rounded-none border-2 border-outline mb-2",
          accordionContent: "bg-surface-lowest border-2 border-outline border-t-0 p-4",
          fileInputButtonPrimary: "bg-primary text-black rounded-none border-2 border-black font-bold uppercase tracking-widest text-[10px] py-2 px-4 shadow-brutalist",
          userProfileAvatarBox: "rounded-none border-3 border-outline w-24 h-24 shadow-brutalist",
          userProfileAvatarImage: "rounded-none",
          userProfileAvatarBox__profile: "w-24 h-24 mb-4",
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
