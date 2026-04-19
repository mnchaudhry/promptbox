"use client";

import { useState } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle, Input } from "@promptly/ui";
import { CreatePromptModal } from "@/components/CreatePromptModal";

export default function Dashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex-1 flex flex-col p-8 space-y-12 max-w-7xl mx-auto w-full">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold uppercase tracking-tightest leading-none">
            Gallery<span className="text-primary">.</span>
          </h1>
          <p className="font-mono text-highest uppercase text-sm tracking-widest">
            32 Prompts Synced // Active Session
          </p>
        </div>
        
        <div className="flex gap-4">
          <Input 
            placeholder="SEARCH_BY_TAG_OR_TITLE..." 
            className="md:w-80"
          />
          <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
            + New_Prompt
          </Button>
        </div>
      </header>

      {/* Folders/Filters */}
      <nav className="flex flex-wrap gap-3">
        {["All_Prompts", "Marketing", "Code_Gen", "Copywriting", "Creative"].map((tab) => (
          <button 
            key={tab}
            className="px-4 py-2 border-3 border-outline font-mono text-xs uppercase hover:border-secondary transition-colors"
          >
            {tab}
          </button>
        ))}
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Card key={i} className="hover:shadow-brutalist-orange transition-shadow group">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle>Prompt_Ref_{i}</CardTitle>
                <div className="bg-outline px-2 py-0.5 font-mono text-[10px]">#TAG</div>
              </div>
            </CardHeader>
            <CardContent className="line-clamp-4">
              "Create a high-performance brutalist design system for a browser extension using Tailwind CSS and Next.js. Focus on 0px border radius and 3px strokes..."
            </CardContent>
            <div className="flex justify-between items-center pt-4 border-t-3 border-outline mt-auto">
              <span className="text-[10px] font-mono text-highest">2026-04-19</span>
              <Button variant="outline" className="h-8 px-3 text-[10px]">Edit</Button>
            </div>
          </Card>
        ))}
      </div>

      <CreatePromptModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
