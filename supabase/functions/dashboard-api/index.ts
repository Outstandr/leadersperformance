import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== 'GET') {
    return json({ error: 'Method not allowed' }, 405)
  }

  // API key auth
  const apiKey = req.headers.get('x-api-key')
  const expectedKey = Deno.env.get('DASHBOARD_API_KEY')
  if (!apiKey || apiKey !== expectedKey) {
    return json({ error: 'Unauthorized' }, 401)
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  )

  const url = new URL(req.url)
  const resource = url.searchParams.get('resource')

  try {
    if (resource === 'stats') {
      // Application counts
      const { count: totalApps } = await supabase
        .from('applications')
        .select('*', { count: 'exact', head: true })

      const { count: pendingApps } = await supabase
        .from('applications')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending')

      // Article counts
      const { count: totalArticles } = await supabase
        .from('articles')
        .select('*', { count: 'exact', head: true })

      const { count: publishedArticles } = await supabase
        .from('articles')
        .select('*', { count: 'exact', head: true })
        .eq('published', true)

      // 30-day trend
      const thirtyDaysAgo = new Date()
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

      const { data: recentApps } = await supabase
        .from('applications')
        .select('created_at')
        .gte('created_at', thirtyDaysAgo.toISOString())
        .order('created_at', { ascending: true })

      // Group by day
      const trend: Record<string, number> = {}
      for (let i = 0; i < 30; i++) {
        const d = new Date()
        d.setDate(d.getDate() - (29 - i))
        trend[d.toISOString().slice(0, 10)] = 0
      }
      if (recentApps) {
        for (const app of recentApps) {
          const day = app.created_at.slice(0, 10)
          if (trend[day] !== undefined) trend[day]++
        }
      }

      return json({
        applications: {
          total: totalApps ?? 0,
          pending: pendingApps ?? 0,
        },
        articles: {
          total: totalArticles ?? 0,
          published: publishedArticles ?? 0,
          draft: (totalArticles ?? 0) - (publishedArticles ?? 0),
        },
        trend_30d: Object.entries(trend).map(([date, count]) => ({ date, count })),
      })
    }

    if (resource === 'applications') {
      const limit = Math.min(parseInt(url.searchParams.get('limit') || '50', 10), 200)
      const offset = parseInt(url.searchParams.get('offset') || '0', 10)
      const status = url.searchParams.get('status')

      let query = supabase
        .from('applications')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (status) {
        query = query.eq('status', status)
      }

      const { data, count, error } = await query

      if (error) return json({ error: error.message }, 500)

      return json({ data, total: count ?? 0, limit, offset })
    }

    if (resource === 'articles') {
      const { data, error } = await supabase
        .from('articles')
        .select('id, slug, title, pillar, published, publish_date, reading_time, created_at')
        .order('created_at', { ascending: false })

      if (error) return json({ error: error.message }, 500)
      return json({ articles: data })
    }

    return json({ error: 'Invalid resource. Use: stats, applications, articles' }, 400)
  } catch (e) {
    return json({ error: 'Internal server error' }, 500)
  }
})
