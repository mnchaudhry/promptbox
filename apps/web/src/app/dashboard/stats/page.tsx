"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@promptbox/ui";
import { BarChart3, Database, Zap, Clock, TrendingUp, Loader2 } from "lucide-react";
import { createClerkSupabaseClient } from "@/lib/supabase";
import { useUser, useAuth } from "@clerk/nextjs";

interface Stats {
  totalPrompts: number;
  totalTags: number;
  mostUsedTag: string;
  promptsThisWeek: number;
  averagePromptLength: number;
}

export default function StatisticsPage() {

  //////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////
  const { user } = useUser();
  const { getToken } = useAuth();

  //////////////////////////////////////////////// STATES ////////////////////////////////////////////////
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  //////////////////////////////////////////////// EFFECTS ////////////////////////////////////////////////
  useEffect(() => {
    async function fetchStats() {
      if (!user) return;
      setIsLoading(true);
      try {
        const token = await getToken({ template: 'supabase' });
        const authenticatedClient = createClerkSupabaseClient(token || undefined);

        const { data, error } = await authenticatedClient
          .from("prompts")
          .select("*")
          .eq("user_id", user.id);

        if (error) throw error;

        const prompts = data || [];
        const totalPrompts = prompts.length;

        const tagCounts: Record<string, number> = {};
        let totalChars = 0;
        let recentCount = 0;
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

        prompts.forEach((p: { tags: string[] | null; body: string; created_at: string }) => {
          p.tags?.forEach((t: string) => {
            const normalized = t.toUpperCase();
            tagCounts[normalized] = (tagCounts[normalized] || 0) + 1;
          });
          totalChars += p.body.length;
          if (new Date(p.created_at) > oneWeekAgo) {
            recentCount++;
          }
        });

        const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);
        const mostUsedTag = sortedTags[0]?.[0] || "None";
        const averagePromptLength = totalPrompts > 0 ? Math.round(totalChars / totalPrompts) : 0;

        setStats({
          totalPrompts,
          totalTags: Object.keys(tagCounts).length,
          mostUsedTag,
          promptsThisWeek: recentCount,
          averagePromptLength,
        });
      } catch (err) {
        console.error("Error fetching stats:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchStats();
  }, [user, getToken]);

  //////////////////////////////////////////////// RENDER ////////////////////////////////////////////////
  return (
    <div className="p-6 space-y-10 max-w-7xl mx-auto w-full">
      <header className="border-b-3 border-outline pb-6 space-y-4">
        <div className="flex items-center gap-3">
          <BarChart3 className="text-primary w-6 h-6" />
          <h1 className="text-4xl font-bold uppercase tracking-tightest">Numbers</h1>
        </div>
        <p className="font-mono text-highest uppercase text-sm tracking-widest">
          A quick look at your saving habits
        </p>
      </header>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <Loader2 className="w-12 h-12 text-primary animate-spin" />
          <p className="font-mono text-xs text-highest uppercase tracking-widest">Calculating numbers...</p>
        </div>
      ) : stats ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="bg-surface-container-low border-3 border-outline hover:shadow-brutalist-orange transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-mono uppercase tracking-widest text-highest">
                Total Saved
              </CardTitle>
              <Database className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold font-mono">{stats.totalPrompts}</div>
              <p className="text-[10px] text-highest font-mono uppercase mt-1">
                Everything stored safely
              </p>
            </CardContent>
          </Card>

          <Card className="bg-surface-container-low border-3 border-outline hover:shadow-brutalist-yellow transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-mono uppercase tracking-widest text-highest">
                Labels Used
              </CardTitle>
              <Zap className="w-4 h-4 text-secondary" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold font-mono">{stats.totalTags}</div>
              <p className="text-[10px] text-highest font-mono uppercase mt-1">
                Unique ways you organize
              </p>
            </CardContent>
          </Card>

          <Card className="bg-surface-container-low border-3 border-outline hover:shadow-brutalist-white transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-mono uppercase tracking-widest text-highest">
                New this week
              </CardTitle>
              <Clock className="w-4 h-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold font-mono">{stats.promptsThisWeek}</div>
              <p className="text-[10px] text-highest font-mono uppercase mt-1">
                Added in the last 7 days
              </p>
            </CardContent>
          </Card>

          <Card className="bg-surface-container-low border-3 border-outline col-span-1 md:col-span-2">
            <header className="p-5 border-b-3 border-outline flex justify-between items-center bg-surface-lowest">
              <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Top Label</h3>
              <TrendingUp className="w-4 h-4 text-primary" />
            </header>
            <CardContent className="p-10 flex items-center justify-center">
              <div className="text-6xl font-bold uppercase tracking-tightest text-white">
                {stats.mostUsedTag}
              </div>
            </CardContent>
            <footer className="p-4 border-t-3 border-outline text-center">
              <p className="text-[10px] font-mono text-highest uppercase">Your most frequent category</p>
            </footer>
          </Card>

          <Card className="bg-surface-container-low border-3 border-outline">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-mono uppercase tracking-widest text-highest">
                Avg Length
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center h-full pb-10">
              <div className="text-4xl font-bold font-mono">{stats.averagePromptLength}</div>
              <p className="text-[10px] text-highest font-mono uppercase mt-2">
                Characters per prompt
              </p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="flex items-center justify-center h-64">
          <p className="text-highest font-mono uppercase">Could not load statistics.</p>
        </div>
      )}
    </div>
  );
}
