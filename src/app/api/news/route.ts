// app/api/news/route.ts
import { NextResponse } from "next/server";

const sourcesEN = [
  "techcrunch.com",
  "thenewstack.io",
  "devops.com",
  "datanami.com",
  "infoq.com",
  "containerjournal.com",
  "theserverside.com",
  "analyticsvidhya.com",
  "venturebeat.com",
  "zdnet.com",
].join(",");

const sourcesFR = [
  "lemondeinformatique.fr",
  "zdnet.fr",
  "usinenouvelle.com",
  "01net.com",
  "journaldunet.com",
  "silicon.fr",
  "larevuedudigital.com",
].join(",");

const buildQuery = (topic: string) => {
  const keywords = {
    cloud: [
      '"cloud computing"',
      '"cloud storage"',
      '"AWS"',
      '"Azure"',
      '"Google Cloud"',
    ],
    devops: [
      '"DevOps"',
      '"CI/CD"',
      '"infrastructure as code"',
      '"terraform"',
      '"observability"',
    ],
    data: [
      '"big data"',
      '"data lake"',
      '"data analytics"',
      '"data warehouse"',
      '"ETL pipeline"',
    ],
    kubernetes: [
      '"Kubernetes"',
      '"containers"',
      '"container orchestration"',
      '"helm charts"',
    ],
    default: ['"DevOps"', '"cloud computing"', '"big data"', '"data lake"'],
  };
  return (keywords[topic as keyof typeof keywords] || keywords.default).join(
    " OR "
  );
};

export async function GET(request: Request) {
  const apiKey = process.env.NEWS_API_KEY;
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic") || "default";

  const query = buildQuery(topic);
  const baseUrl = "https://newsapi.org/v2/everything";

  const makeUrl = (lang: string, domains: string) =>
    `${baseUrl}?q=${encodeURIComponent(
      query
    )}&language=${lang}&domains=${domains}&sortBy=publishedAt&pageSize=8&apiKey=${apiKey}`;

  try {
    const [resEn, resFr] = await Promise.all([
      fetch(makeUrl("en", sourcesEN)).then((res) => res.json()),
      fetch(makeUrl("fr", sourcesFR)).then((res) => res.json()),
    ]);

    const articles = [...(resEn.articles || []), ...(resFr.articles || [])];

    return NextResponse.json(articles);
  } catch (err) {
    console.error("Erreur NewsAPI:", err);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
