import "dotenv/config";
import fs from "fs";
import path from "path";
import webpush from "web-push";

const VAPID_PUBLIC_KEY =
  process.env.VAPID_PUBLIC_KEY ||
  (() => {
    throw new Error("VAPID_PUBLIC_KEY is not defined");
  })();
const VAPID_PRIVATE_KEY =
  process.env.VAPID_PRIVATE_KEY ||
  (() => {
    throw new Error("VAPID_PRIVATE_KEY is not defined");
  })();

webpush.setVapidDetails(
  "mailto:tomozkan0@icloud.com",
  VAPID_PUBLIC_KEY,
  VAPID_PRIVATE_KEY
);

const subscriptionsPath = path.resolve("./subscriptions.json");
const subscriptions = JSON.parse(fs.readFileSync(subscriptionsPath, "utf-8"));

const notification = {
  title: "📰 Nouvelle veille tech dispo !",
  options: {
    body: "Viens découvrir les nouveaux articles du jour.",
    icon: "./public/icon-192.png",
  },
};

subscriptions.forEach((sub) => {
  webpush.sendNotification(sub, JSON.stringify(notification)).catch((err) => {
    console.error("Erreur push vers un abonné :", err);
  });
});
