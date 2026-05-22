const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

const RSS_FEEDS: Record<string, string> = {
  "01net": "https://www.01net.com/rss/info/flux-rss/flux-toutes-les-actualites/",
  "clubic": "https://www.clubic.com/feed/news.rss",
  "developpez": "https://www.developpez.com/index/rss",
  "cnil": "https://www.cnil.fr/fr/rss.xml",
  "clusif": "https://clusif.fr/feed/",
};

interface RSSItem {
  title: string;
  link: string;
  date: string;
}

function extractItems(xml: string, maxItems = 5): RSSItem[] {
  const items: RSSItem[] = [];
  const itemRegex = /<item[^>]*>([\s\S]*?)<\/item>|<entry[^>]*>([\s\S]*?)<\/entry>/gi;
  let match;

  while ((match = itemRegex.exec(xml)) !== null && items.length < maxItems) {
    const block = match[1] || match[2];
    const titleMatch = block.match(/<title[^>]*>(?:<!\[CDATA\[)?(.*?)(?:\]\]>)?<\/title>/i);
    const linkMatch = block.match(/<link[^>]*href="([^"]*)"[^>]*\/?>/i) || block.match(/<link[^>]*>(.*?)<\/link>/i);
    const dateMatch = block.match(/<pubDate[^>]*>(.*?)<\/pubDate>/i) || block.match(/<updated[^>]*>(.*?)<\/updated>/i);

    if (titleMatch) {
      items.push({
        title: titleMatch[1].trim(),
        link: linkMatch ? linkMatch[1].trim() : "",
        date: dateMatch ? dateMatch[1].trim() : "",
      });
    }
  }
  return items;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const source = url.searchParams.get("source");

    if (!source || !RSS_FEEDS[source]) {
      return new Response(
        JSON.stringify({ error: "Invalid source. Use: " + Object.keys(RSS_FEEDS).join(", ") }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const feedUrl = RSS_FEEDS[source];
    const response = await fetch(feedUrl, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; RSSReader/1.0)" },
    });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: `Failed to fetch feed: ${response.status}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const xml = await response.text();
    const items = extractItems(xml, 5);

    return new Response(
      JSON.stringify({ source, items }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
