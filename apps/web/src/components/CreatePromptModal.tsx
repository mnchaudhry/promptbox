"use client";

import { useState } from "react";
import { Button, Card, Input } from "@promptly/ui";
import { X, Save, Hash } from "lucide-react";

export function CreatePromptModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <Card className="w-full max-w-2xl bg-surface border-primary shadow-brutalist-orange">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold uppercase tracking-tighter">New_Prompt::Registry</h2>
          <button onClick={onClose} className="p-1 hover:text-primary transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase text-secondary tracking-widest">Entry_Identifier</label>
            <Input placeholder="PROMPT_TITLE_HERE..." className="border-primary" />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase text-secondary tracking-widest">Payload_Body</label>
            <textarea 
              className="w-full h-48 border-3 border-outline bg-surface-lowest p-4 font-mono text-sm focus:outline-none focus:border-secondary transition-colors resize-none"
              placeholder="PASTE_YOUR_PROMPT_HERE (CTRL+V)..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-mono uppercase text-secondary tracking-widest">Metadata_Tags</label>
            <div className="relative">
              <Input placeholder="marketing, creative, code..." className="pl-10" />
              <Hash size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-highest" />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline" onClick={onClose}>
              Abort
            </Button>
            <Button className="gap-2">
              <Save size={16} />
              Execute_Save
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
