"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Card } from "@promptbox/ui";
import { Tags as TagsIcon, Search, Loader2 } from "lucide-react";
import { createClerkSupabaseClient } from "@/lib/supabase";
import { useUser, useAuth } from "@clerk/nextjs";
import Link from "next/link";

interface TagStat {
  name: string;
  count: number;
}

export default function TagsPage() {

  //////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////
  const { user } = useUser();
  const { getToken } = useAuth();

  //////////////////////////////////////////////// STATES ////////////////////////////////////////////////
  const [tags, setTags] = useState<TagStat[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTags = tags.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()));

  //////////////////////////////////////////////// EFFECTS ////////////////////////////////////////////////
  useEffect(() => {
    async function fetchTags() {
      if (!user) return;
      setIsLoading(true);
      try {
        const token = await getToken({ template: 'supabase' });
        const authenticatedClient = createClerkSupabaseClient(token || undefined);

        const { data, error } = await authenticatedClient
          .from("prompts")
          .select("tags")
          .eq("user_id", user.id);

        if (error) throw error;

        const tagCounts: Record<string, number> = {};
        data?.forEach((prompt: { tags: string[] | null }) => {
          prompt.tags?.forEach((tag: string) => {
            const normalized = tag.toUpperCase();
            tagCounts[normalized] = (tagCounts[normalized] || 0) + 1;
          });
        });

        const sortedTags = Object.entries(tagCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count);

        setTags(sortedTags);
      } catch (err) {
        console.error("Error fetching tags:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTags();
  }, [user, getToken]);


  //////////////////////////////////////////////// RENDER ////////////////////////////////////////////////
  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto w-full">
      <header className="border-b-3 border-outline pb-6 space-y-4">
        <div className="flex items-center gap-3">
          <TagsIcon className="text-secondary w-6 h-6" />
          <h1 className="text-4xl font-bold uppercase tracking-tightest">Labels</h1>
        </div>
        <p className="font-mono text-highest uppercase text-sm tracking-widest">
          Browse your prompts by label
        </p>
      </header>

      {/* Search Labels */}
      <div className="relative w-full md:w-96">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-highest" />
        <input
          type="text"
          placeholder="Search labels..."
          className="w-full bg-surface-lowest border-2 border-outline py-3 pl-12 pr-4 font-mono text-xs focus:outline-none focus:border-secondary transition-colors"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="font-mono text-xs text-highest uppercase tracking-widest">Finding labels...</p>
        </div>
      ) : filteredTags.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 border-3 border-dashed border-outline">
          <p className="font-mono text-sm text-highest uppercase text-center px-4">
            {searchQuery ? "No labels match your search" : "No labels found yet. Add some to your prompts!"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {filteredTags.map((tag) => (
            <Link key={tag.name} href={`/dashboard/prompts?tag=${tag.name}`}>
              <Card className="group hover:border-secondary transition-all cursor-pointer bg-surface-container-low hover:shadow-brutalist-yellow">
                <div className="flex flex-col items-center justify-center gap-2 py-4">
                  <span className="text-xl font-bold text-white group-hover:text-secondary transition-colors">
                    {tag.name}
                  </span>
                  <span className="bg-highest/20 text-highest px-3 py-1 font-mono text-[9px] border border-outline uppercase">
                    {tag.count} {tag.count === 1 ? 'item' : 'items'}
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
