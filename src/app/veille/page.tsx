"use client";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const TOPICS = [
  { key: "default", label: "Tout" },
  { key: "devops", label: "DevOps" },
  { key: "cloud", label: "Cloud" },
  { key: "data", label: "Data" },
  { key: "kubernetes", label: "Kubernetes" },
];

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = atob(base64);
  return Uint8Array.from(Array.from(rawData).map((char) => char.charCodeAt(0)));
}

export default function NewsPage() {
  const [articles, setArticles] = useState<
    {
      urlToImage?: string;
      title: string;
      description: string;
      source?: { name: string };
      language?: string;
      url: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState("default");
  const [showMenu, setShowMenu] = useState(false);

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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Veille Tech : {TOPICS.find((t) => t.key === selected)?.label}
      </h1>

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
    </div>
  );
}
