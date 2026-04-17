import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-api-key, x-slug, x-title, x-excerpt, x-pillar, x-meta-title, x-meta-description, x-pillar-color, x-keywords, x-publish-date, x-reading-time, x-author, x-published',
  'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
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

  console.log(`[manage-articles] ${req.method} ${req.url}`)

  // Auth via x-api-key
  const apiKey = req.headers.get('x-api-key')
  const expectedKey = Deno.env.get('ARTICLES_API_KEY')
  console.log(`[manage-articles] apiKey present: ${!!apiKey}, expectedKey present: ${!!expectedKey}, match: ${apiKey === expectedKey}`)
  if (!apiKey || apiKey !== expectedKey) {
    return json({ error: 'Unauthorized' }, 401)
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  try {
    if (req.method === 'GET') {
      const { data, error } = await supabase
        .from('articles')
        .select('id, slug, title, pillar, published, created_at')
        .order('created_at', { ascending: false })

      if (error) return json({ error: error.message }, 500)
      return json({ articles: data })
    }

    if (req.method === 'POST') {
      // Accept either JSON body OR raw text/markdown body with metadata in headers/query params
      const url = new URL(req.url)
      const contentType = req.headers.get('content-type') || ''
      const rawText = await req.text()

      let body: Record<string, unknown> = {}
      if (contentType.includes('application/json') && rawText.trim().length > 0) {
        try {
          body = JSON.parse(rawText)
        } catch (parseErr) {
          return json({ error: 'Invalid JSON body', detail: parseErr instanceof Error ? parseErr.message : String(parseErr) }, 400)
        }
      } else {
        // Raw text/markdown mode: body becomes content, metadata comes from headers or query params
        const h = (name: string) => req.headers.get(name) || url.searchParams.get(name.replace(/^x-/, '')) || undefined
        body = {
          content: rawText,
          slug: h('x-slug'),
          title: h('x-title'),
          excerpt: h('x-excerpt'),
          pillar: h('x-pillar'),
          meta_title: h('x-meta-title'),
          meta_description: h('x-meta-description'),
          pillar_color: h('x-pillar-color'),
          keywords: h('x-keywords') ? h('x-keywords')!.split(',').map(k => k.trim()) : undefined,
          publish_date: h('x-publish-date'),
          reading_time: h('x-reading-time') ? Number(h('x-reading-time')) : undefined,
          author: h('x-author'),
          published: h('x-published') ? h('x-published') === 'true' : undefined,
        }
      }
      const { slug, title, excerpt, pillar, pillar_color, keywords, meta_title, meta_description, publish_date, reading_time, author, content, published } = body as any

      console.log(`[manage-articles] POST mode=${contentType.includes('application/json') ? 'json' : 'raw'} slug=${slug} title=${title} contentLen=${(content || '').length}`)

      if (!slug || !title || !content || !meta_title || !meta_description || !excerpt || !pillar) {
        return json({ error: 'Missing required fields: slug, title, excerpt, pillar, content, meta_title, meta_description', received: { slug: !!slug, title: !!title, excerpt: !!excerpt, pillar: !!pillar, content: !!content, meta_title: !!meta_title, meta_description: !!meta_description } }, 400)
      }

      const record: Record<string, unknown> = {
        slug, title, excerpt, pillar, content, meta_title, meta_description,
        updated_at: new Date().toISOString(),
      }
      if (pillar_color !== undefined) record.pillar_color = pillar_color
      if (keywords !== undefined) record.keywords = keywords
      if (publish_date !== undefined) record.publish_date = publish_date
      if (reading_time !== undefined) record.reading_time = reading_time
      if (author !== undefined) record.author = author
      if (published !== undefined) record.published = published

      const { data, error } = await supabase
        .from('articles')
        .upsert(record, { onConflict: 'slug' })
        .select('id, slug, title')
        .single()

      if (error) return json({ error: error.message }, 500)
      return json({ article: data, message: 'Upserted successfully' })
    }

    if (req.method === 'DELETE') {
      const body = await req.json()
      const { slug } = body
      if (!slug) return json({ error: 'Missing slug' }, 400)

      const { error } = await supabase
        .from('articles')
        .delete()
        .eq('slug', slug)

      if (error) return json({ error: error.message }, 500)
      return json({ message: `Deleted ${slug}` })
    }

    return json({ error: 'Method not allowed' }, 405)
  } catch (e) {
    console.error('[manage-articles] error:', e instanceof Error ? e.message : String(e), e instanceof Error ? e.stack : '')
    return json({ error: 'Internal server error', detail: e instanceof Error ? e.message : String(e) }, 500)
  }
})
