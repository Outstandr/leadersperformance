import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  pillar: string;
  pillar_color: string;
  keywords: string[];
  meta_title: string;
  meta_description: string;
  publish_date: string;
  reading_time: number;
  author: string;
  content: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export function useArticles() {
  return useQuery<Article[]>({
    queryKey: ["articles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("published", true)
        .order("publish_date", { ascending: false });
      if (error) throw error;
      return (data ?? []) as unknown as Article[];
    },
    staleTime: 5 * 60 * 1000,
  });
}

export function useArticleBySlug(slug: string) {
  return useQuery<Article | null>({
    queryKey: ["article", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("articles")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .maybeSingle();
      if (error) throw error;
      return data as unknown as Article | null;
    },
    staleTime: 5 * 60 * 1000,
    enabled: !!slug,
  });
}
