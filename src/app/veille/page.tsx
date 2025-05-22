"use client";
import { useEffect, useState } from "react";
import { Menu, X, Heart, HeartIcon } from "lucide-react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";

const TOPICS = [
  { key: "default", label: "Tout" },
  { key: "devops", label: "DevOps" },
  { key: "cloud", label: "Cloud" },
  { key: "data", label: "BigData" },
  { key: "kubernetes", label: "Kubernetes" },
];

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = atob(base64);
  return Uint8Array.from(Array.from(rawData).map((char) => char.charCodeAt(0)));
}

export default function NewsPage() {
  const router = useRouter();
  const [articles, setArticles] = useState<
    {
      url: string;
      title: string;
      urlToImage?: string;
      description?: string;
      source?: { name?: string };
      language?: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("default");
  const [showMenu, setShowMenu] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [savedUrls, setSavedUrls] = useState(new Set());

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
        .select("url")
        .eq("user_id", user.id)
        .then(({ data }) => {
          setSavedUrls(new Set(data?.map((a) => a.url)));
        });
    }
  }, [user]);

  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js");
    }
    if ("Notification" in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.pushManager
          .getSubscription()
          .then(async (subscription) => {
            if (!subscription) {
              const response = await fetch("/api/subscribe-key");
              const { publicKey } = await response.json();
              const convertedKey = urlBase64ToUint8Array(publicKey);

              const sub = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: convertedKey,
              });

              await fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sub),
              });
            }
          });
      });
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/news?topic=${selected}`)
      .then((res) => res.json())
      .then((data) => {
        setArticles(data);
        setLoading(false);
      });
  }, [selected]);

  const handleSubscribe = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission !== "granted") return;

      const reg = await navigator.serviceWorker.ready;
      const res = await fetch("/api/subscribe-key");
      const { publicKey } = await res.json();
      const convertedKey = urlBase64ToUint8Array(publicKey);

      const subscription = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertedKey,
      });

      await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(subscription),
      });

      alert("✅ Notifications activées !");
    } catch (error) {
      console.error("Erreur d'abonnement :", error);
    }
  };

  const toggleFavorite = async (article: {
    url: string;
    title: string;
    urlToImage?: string;
    source?: { name?: string };
  }) => {
    if (!user) return;

    if (savedUrls.has(article.url)) {
      const { error } = await supabase
        .from("saved_articles")
        .delete()
        .eq("user_id", user.id)
        .eq("url", article.url);

      if (!error) {
        const updated = new Set(savedUrls);
        updated.delete(article.url);
        setSavedUrls(updated);
      }
    } else {
      const { error } = await supabase.from("saved_articles").insert({
        user_id: user.id,
        title: article.title,
        url: article.url,
        image: article.urlToImage,
        source: article.source?.name,
        published_at: new Date().toISOString(),
      });
      if (!error)
        setSavedUrls(new Set(Array.from(savedUrls).concat(article.url)));
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-stretch gap-8 ">
        <h1 className="text-3xl font-bold">
          Veille Tech : {TOPICS.find((t) => t.key === selected)?.label}
        </h1>
      </div>
      <button
        onClick={handleSubscribe}
        className="text-sm text-gray-500 border border-gray-300 px-3 py-1 my-4 rounded hover:text-black"
      >
        🔔 S&apos;abonner
      </button>

      {/* Menu burger mobile */}
      <div className="sm:hidden mb-4">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-2 px-4 py-2 border rounded-full text-gray-800 border-gray-300"
        >
          {showMenu ? <X size={20} /> : <Menu size={20} />} Catégories
        </button>
        {showMenu && (
          <div className="flex flex-col gap-2 mt-2">
            {TOPICS.map((topic) => (
              <button
                key={topic.key}
                onClick={() => {
                  setSelected(topic.key);
                  setShowMenu(false);
                }}
                className={`px-4 py-2 rounded-lg border text-left font-semibold ${
                  selected === topic.key
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                }`}
              >
                {topic.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Menu desktop */}
      <div className="hidden sm:flex gap-3 mb-6">
        {TOPICS.map((topic) => (
          <button
            key={topic.key}
            onClick={() => setSelected(topic.key)}
            className={`px-4 py-2 rounded-full border font-semibold ${
              selected === topic.key
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
            }`}
          >
            {topic.label}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between h-full"
            >
              {article.urlToImage && (
                <Image
                  src={article.urlToImage}
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
                <p className="text-sm text-gray-600 line-clamp-3">
                  {article.description}
                </p>
              </div>
              <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
                <span>{article.source?.name}</span>
                <span>{article.language === "fr" ? "🇫🇷" : "🇬🇧"}</span>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-blue-600 hover:underline text-sm font-medium"
                >
                  Lire l&apos;article →
                </a>
                <button
                  onClick={() => toggleFavorite(article)}
                  className="text-red-600 hover:text-red-800"
                >
                  {savedUrls.has(article.url) ? "❤️" : "🤍"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {savedUrls.size > 0 && (
        <div
          onClick={() => router.push("/myFav")}
          className="fixed bottom-4 right-4 bg-white border shadow-lg rounded-full px-4 py-2 text-sm text-blue-600 hover:text-blue-800 cursor-pointer transition-all"
        >
          Voir mes favoris
        </div>
      )}
    </div>
  );
}
