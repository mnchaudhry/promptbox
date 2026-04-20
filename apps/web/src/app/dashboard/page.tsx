"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, Button } from "@promptbox/ui";
import { Zap, Activity, Database, Plus, Loader2 } from "lucide-react";
import Link from "next/link";
import { createClerkSupabaseClient, supabase } from "@/lib/supabase";
import { useAuth, useUser } from "@clerk/nextjs";

export default function DashboardPage() {

  //////////////////////////////////////////////// VARIABLES ////////////////////////////////////////////////
  const { user } = useUser();
  const { getToken } = useAuth();

  //////////////////////////////////////////////// STATES ////////////////////////////////////////////////
  const [stats, setStats] = useState({ total: 0, tags: 0 });
  const [isLoading, setIsLoading] = useState(true);

  //////////////////////////////////////////////// EFFECTS ////////////////////////////////////////////////
  useEffect(() => {
    async function fetchStats() {
      if (!user) return;

      try {
        const token = await getToken({ template: 'supabase' });
        const authenticatedClient = createClerkSupabaseClient(token || undefined);

        const { count } = await authenticatedClient
          .from("prompts")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id);

        const { data: tagsData } = await authenticatedClient
          .from("prompts")
          .select("tags")
          .eq("user_id", user.id);

        const uniqueTags = new Set((tagsData as { tags: string[] | null }[])?.flatMap(p => p.tags || []) || []);

        setStats({
          total: count || 0,
          tags: uniqueTags.size
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
    <div className="p-6 space-y-10 max-w-7xl w-full mx-auto">
      {/* Header */}
      <header className="flex items-end justify-between border-b-3 border-outline pb-6 transition-all">
        <div className="space-y-3">
          {isLoading ? "Starting up..." : "Ready"}
          <h1 className="text-4xl font-bold uppercase tracking-tightest leading-none">
            Overview<span className="text-primary">.</span>
          </h1>
          <p className="font-mono text-highest uppercase text-sm tracking-widest">
            My Account // {user?.firstName?.toUpperCase()}
          </p>
        </div>

        <Link href="/dashboard/prompts">
          <Button size="lg" className="px-8 flex gap-3">
            <Plus className="w-5 h-5" /> Add New
          </Button>
        </Link>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="bg-surface-container-high border-3 border-outline hover:shadow-brutalist-orange transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-mono uppercase tracking-widest text-highest">
              Saved items
            </CardTitle>
            <Database className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            ) : (
              <>
                <div className="text-3xl font-bold font-mono">{stats.total}</div>
                <p className="text-[10px] text-highest font-mono uppercase mt-1">
                  Safe in your account
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="bg-surface-container-high border-3 border-outline hover:shadow-brutalist-yellow transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-mono uppercase tracking-widest text-highest">
              Categories
            </CardTitle>
            <Zap className="w-4 h-4 text-secondary" />
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <Loader2 className="w-8 h-8 animate-spin text-secondary" />
            ) : (
              <>
                <div className="text-3xl font-bold font-mono">{stats.tags}</div>
                <p className="text-[10px] text-highest font-mono uppercase mt-1">
                  Organized for you
                </p>
              </>
            )}
          </CardContent>
        </Card>

        <Card className="bg-surface-container-high border-3 border-outline hover:shadow-brutalist-white transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-mono uppercase tracking-widest text-highest">
              Status
            </CardTitle>
            <Activity className="w-4 h-4 text-white" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold font-mono">99%</div>
            <p className="text-[10px] text-highest font-mono uppercase mt-1">
              Everything is up to date
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b-3 border-outline pb-3">
          <h2 className="text-xl font-bold uppercase">Recent Changes</h2>
          <Link href="/dashboard/prompts">
            <Button variant="outline" size="sm" className="font-mono">SEE ALL</Button>
          </Link>
        </div>

        <div className="border-3 border-outline bg-surface-container-low min-h-[160px] flex items-center justify-center">
          <p className="font-mono text-xs text-highest uppercase">Nothing to show yet...</p>
        </div>
      </div>
    </div>
  );
}
