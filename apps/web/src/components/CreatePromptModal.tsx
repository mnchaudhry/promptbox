import { useState } from "react";
import { Button, Card, Input } from "@promptbox/ui";
import { X, Save, Hash, Terminal, Loader2 } from "lucide-react";
import { createClerkSupabaseClient } from "@/lib/supabase";
import { useUser, useAuth } from "@clerk/nextjs";

export function CreatePromptModal({ isOpen, onClose, onSuccess }: { isOpen: boolean; onClose: () => void; onSuccess?: () => void; }) {

  //////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////
  const { user } = useUser();
  const { getToken } = useAuth();

  //////////////////////////////////////////////// STATES ////////////////////////////////////////////////
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  //////////////////////////////////////////////// FUNCTIONS ////////////////////////////////////////////////
  const handleSave = async () => {
    if (!user || !title || !body) return;
    setIsSaving(true);

    try {
      const token = await getToken({ template: 'supabase' });
      
      if (!token) {
        throw new Error("No database access token available. Please refresh and try again.");
      }

      const authenticatedClient = createClerkSupabaseClient(token);

      const tagsArray = tags.split(",").map(t => t.trim().toUpperCase()).filter(t => t !== "");

      // Ensure user.id is included for RLS
      const { error } = await authenticatedClient.from("prompts").insert([
        { 
          user_id: user.id, 
          title, 
          body, 
          tags: tagsArray,
        }
      ]);

      if (error) {
        console.error("Supabase Error:", error);
        throw error;
      }

      onSuccess?.();
      onClose();
      // Reset form
      setTitle("");
      setBody("");
      setTags("");
    } catch (err: unknown) {
      console.error("Error saving prompt:", err);
      const error = err as { message?: string };
      alert(`Something went wrong: ${error.message || "Unknown error"}. Please try again.`);
    } finally {
      setIsSaving(false);
    }
  };

  //////////////////////////////////////////////// RENDER ////////////////////////////////////////////////
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90">
      <Card className="w-full max-w-2xl bg-surface border-3 border-primary shadow-brutalist-orange">
        <div className="flex justify-between items-center p-5 border-b-3 border-outline">
          <div className="flex items-center gap-3">
            <Terminal className="text-primary w-4 h-4" />
            <h2 className="text-xl font-bold uppercase tracking-tighter">Add new prompt</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:text-primary transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-highest flex items-center gap-2">
                <Terminal className="w-3 h-3" /> Give it a name
              </label>
              <Input
                placeholder="e.g. Refactor my code"
                className="border-2 border-outline bg-surface-container rounded-none font-mono focus:border-primary"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-highest flex items-center gap-2">
                <Save className="w-3 h-3" /> The prompt
              </label>
              <textarea
                placeholder="Write or paste your prompt here..."
                rows={5}
                className="w-full border-2 border-outline bg-surface-container px-3 py-2 text-sm rounded-none font-mono focus:outline-none focus:border-primary resize-none"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold tracking-widest text-highest flex items-center gap-2">
                <Hash className="w-3 h-3" /> Add categories
              </label>
              <Input
                placeholder="Work, Personal, Art (separated by commas)"
                className="border-2 border-outline bg-surface-container rounded-none font-mono focus:border-primary"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <Button
              variant="outline"
              className="flex-1 rounded-none border-2 border-outline font-bold uppercase py-3"
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 rounded-none bg-primary hover:bg-primary/90 text-black font-bold uppercase py-3 border-2 border-black"
              onClick={handleSave}
              disabled={isSaving || !title || !body}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save it"
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
