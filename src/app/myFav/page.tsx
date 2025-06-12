"use client";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const juryMode = searchParams.get("juryMode") === "true";

  // ID de l'utilisateur à afficher en mode jury
  const JURY_TARGET_USER_ID = "c074b3aa-8e00-403f-a8cc-dc22ed5931f9";

  // Client Supabase pour le mode jury (avec service key si nécessaire)
  const getSupabaseClient = useCallback(() => {
    if (juryMode) {
      // Si vous avez accès à la service key, utilisez-la pour contourner RLS
      // const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
      // const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
      // return createClient(supabaseUrl, supabaseServiceKey);

      // Sinon, utilisez le client normal
      return supabase;
    }
    return supabase;
  }, [juryMode]);

  useEffect(() => {
    if (!juryMode) {
      supabase.auth.getUser().then(({ data }) => {
        if (!data.user) router.push("/login");
        else setUser(data.user);
      });
    } else {
      setUser(null);
    }
  }, [router, juryMode]);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      const client = getSupabaseClient();

      if (juryMode) {
        console.log(
          "Mode jury activé, recherche pour user_id:",
          JURY_TARGET_USER_ID
        );

        try {
          // Première vérification : compter les articles pour cet utilisateur
          const { count, error: countError } = await client
            .from("saved_articles")
            .select("*", { count: "exact", head: true })
            .eq("user_id", JURY_TARGET_USER_ID);

          console.log("Nombre d'articles trouvés:", count);

          if (countError) {
            console.error("Erreur lors du comptage:", countError);
          }

          // Récupérer les articles
          const { data, error } = await client
            .from("saved_articles")
            .select("*")
            .eq("user_id", JURY_TARGET_USER_ID)
            .order("published_at", { ascending: false });

          console.log("Résultat requête jury mode:", {
            data,
            error,
            userIdRecherche: JURY_TARGET_USER_ID,
            nombreArticles: data?.length || 0,
          });

          if (error) {
            console.error("Error fetching articles in jury mode:", error);
            // Vérifier si c'est un problème de permissions
            if (
              error.code === "PGRST116" ||
              error.message?.includes("permission")
            ) {
              console.error("Problème de permissions RLS détecté!");
            }
            setArticles([]);
          } else {
            console.log(
              "Articles trouvés pour cet utilisateur:",
              data?.length || 0
            );
            setArticles(data || []);
          }
        } catch (err) {
          console.error("Erreur inattendue:", err);
          setArticles([]);
        }
      } else if (user) {
        // Mode normal : récupérer les articles de l'utilisateur connecté
        const { data, error } = await client
          .from("saved_articles")
          .select("*")
          .eq("user_id", user.id)
          .order("published_at", { ascending: false });

        if (error) {
          console.error("Error fetching user articles:", error);
          setArticles([]);
        } else {
          setArticles(data || []);
        }
      }

      setLoading(false);
    };

    if (juryMode || user) {
      fetchArticles();
    } else if (!juryMode && !user) {
      setLoading(false);
    }
  }, [user, juryMode]);

  return (
    <div className="p-6 mb-auto min-h-screen">
      {juryMode && (
        <div className="bg-yellow-200 text-yellow-800 p-3 rounded-md text-center mb-6">
          <div>
            Jury Viewing Mode: Articles sauvegardés de l&apos;utilisateur Tom
            Ozkan
          </div>
        </div>
      )}
      <h1 className="text-3xl font-bold mb-6">Mes favoris</h1>
      {loading ? (
        <p>Chargement des articles...</p>
      ) : articles.length === 0 ? (
        <div>
          <p className="mb-4">
            {juryMode
              ? "Aucun article trouvé pour cet utilisateur."
              : "Aucun article sauvegardé pour le moment."}
          </p>
          {juryMode && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <strong>Debug Info:</strong>
              <ul className="list-disc list-inside mt-2">
                <li>User ID recherché: {JURY_TARGET_USER_ID}</li>
                <li>Vérifiez les logs de la console pour plus de détails</li>
                <li>Vérifiez les politiques RLS de la table saved_articles</li>
              </ul>
            </div>
          )}
        </div>
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
        className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Aller à la veille
      </button>
    </div>
  );
}
