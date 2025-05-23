"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

export default function MyFavPage() {
  const [articles, setArticles] = useState<
    {
      image?: string;
      title: string;
      source: string;
      published_at: string;
      url: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push("/login");
      else setUser(data.user);
    });
  }, [router]);

  useEffect(() => {
    if (user) {
      supabase
        .from("saved_articles")
        .select("*")
        .eq("user_id", user.id)
        .order("published_at", { ascending: false })
        .then(({ data }) => {
          setArticles(data || []);
          setLoading(false);
        });
    }
  }, [user]);

  return (
    <div className="p-6 mb-auto min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Mes favoris</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : articles.length === 0 ? (
        <p>Aucun article sauvegardé pour le moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between h-full"
            >
              {article.image && (
                <Image
                  src={article.image}
                  alt="illustration"
                  className="rounded-xl mb-4 object-cover w-full h-48"
                  width={400}
                  height={200}
                />
              )}
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                  {article.title}
                </h2>
              </div>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span>{article.source}</span>
                <span>
                  {new Date(article.published_at).toLocaleDateString()}
                </span>
              </div>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-blue-600 hover:underline text-sm font-medium"
              >
                Lire l&apos;article →
              </a>
            </div>
          ))}
        </div>
      )}
      <button
        onClick={() => router.push("/veille")}
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md
        hover:bg-blue-700 transition"
      >
        Aller à la veille
      </button>
    </div>
  );
}
