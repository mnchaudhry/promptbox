"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, useCallback } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@promptbox/ui";
import { Search, Plus, Trash2, Loader2 } from "lucide-react";
import { CreatePromptModal } from "@/components/CreatePromptModal";
import { createClerkSupabaseClient } from "@/lib/supabase";
import { useUser, useAuth } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

interface Prompt {
  id: string;
  title: string;
  body: string;
  tags?: string[];
  created_at: string;
}

export default function PromptsLibrary() {

  ////////////////////////////////////////// VARIABLES ////////////////////////////////////////// 
  const { user } = useUser();
  const { getToken } = useAuth();
  const searchParams = useSearchParams();
  const tagParam = searchParams.get("tag");
  
  ////////////////////////////////////////// STATES ////////////////////////////////////////// 
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(tagParam || "");
  
  ////////////////////////////////////////// CALLBACKS ////////////////////////////////////////// 
  const fetchPrompts = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const token = await getToken({ template: 'supabase' });
      const authenticatedClient = createClerkSupabaseClient(token || undefined);

      const { data, error } = await authenticatedClient
        .from("prompts")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPrompts(data || []);
    } catch (err) {
      console.error("Error fetching prompts:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user, getToken]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    
    try {
      const token = await getToken({ template: 'supabase' });
      const authenticatedClient = createClerkSupabaseClient(token || undefined);

      const { error } = await authenticatedClient.from("prompts").delete().eq("id", id);
      if (error) throw error;
      fetchPrompts();
    } catch (err) {
      console.error("Error deleting prompt:", err);
      alert("Failed to delete prompt.");
    }
  };


  ////////////////////////////////////////// EFFECTS ////////////////////////////////////////// 
  useEffect(() => {
    const init = async () => {
      await fetchPrompts();
    };
    init();
  }, [fetchPrompts]);

  ////////////////////////////////////////// RENDER ////////////////////////////////////////// 
  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto w-full">
      {/* Header Area */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-3 border-outline pb-6">
        <div className="space-y-4">
          <div className="bg-primary text-black px-3 py-1 inline-block font-mono text-[10px] font-bold uppercase tracking-widest">
            My Collection
          </div>
          <h1 className="text-4xl font-bold uppercase tracking-tightest leading-none">
            My Stuff<span className="text-primary">:</span>
          </h1>
          <p className="font-mono text-highest uppercase text-sm tracking-widest">
            {prompts.length} items saved
          </p>
        </div>

        <Button size="lg" className="px-6 flex gap-2" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-5 h-5" /> Add New
        </Button>
      </header>

      {/* Control Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-surface-container-high p-4 border-3 border-outline">
        <div className="relative w-full md:w-96 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-highest group-focus-within:text-secondary" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-surface-lowest border-2 border-outline py-3 pl-12 pr-4 font-mono text-xs focus:outline-none focus:border-secondary transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <Button variant="outline" className="flex-1 md:flex-none border-2 border-outline font-mono text-[10px] uppercase">
            Sort by date
          </Button>
          <Button variant="outline" className="flex-1 md:flex-none border-2 border-outline font-mono text-[10px] uppercase">
             Save everything
          </Button>
        </div>
      </div>

      {/* Main Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="font-mono text-xs text-highest uppercase tracking-widest">Loading your items...</p>
        </div>
      ) : prompts.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border-3 border-dashed border-outline">
          <p className="font-mono text-sm text-highest uppercase">You haven&apos;t saved anything yet</p>
          <Button variant="outline" onClick={() => setIsModalOpen(true)} className="mt-4">+ Add your first one</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.filter(p => 
            p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            p.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
          ).map((prompt) => (
            <Card key={prompt.id} className="group border-3 border-outline bg-surface-container-low hover:border-primary transition-all flex flex-col h-[340px]">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
                <div className="space-y-1 overflow-hidden">
                  <CardTitle className="text-lg font-bold uppercase group-hover:text-primary transition-colors truncate">
                    {prompt.title}
                  </CardTitle>
                  <div className="flex gap-2 flex-wrap">
                    {prompt.tags?.map((t) => (
                      <span key={t} className="bg-highest/20 text-highest px-2 py-0.5 font-mono text-[9px] border border-outline">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-highest hover:text-red-500 -mr-2"
                    onClick={() => handleDelete(prompt.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="flex-1 overflow-hidden relative">
                <p className="font-mono text-xs text-highest leading-relaxed line-clamp-6 whitespace-pre-wrap">
                  {prompt.body}
                </p>
                <div className="absolute bottom-0 left-0 right-0 h-12 bg-linear-to-t from-surface-container-low to-transparent" />
              </CardContent>
              <div className="p-4 pt-0 mt-auto flex items-center justify-between border-t-2 border-outline font-mono text-[9px] text-highest uppercase">
                <span>Created: {new Date(prompt.created_at).toLocaleDateString()}</span>
                <div className="flex gap-3">
                  <button className="hover:text-white transition-colors">SAVE AS FILE</button>
                  <button className="text-primary hover:underline">OPEN</button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <CreatePromptModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={fetchPrompts}
      />
    </div>
  );
}
