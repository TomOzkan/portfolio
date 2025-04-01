import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import webpush from "web-push";

export async function GET() {
  const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
  const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;

  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
    return NextResponse.json(
      { error: "VAPID keys are missing" },
      { status: 500 }
    );
  }

  webpush.setVapidDetails(
    "mailto:tomozkan0@icloud.com",
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY
  );

  const subscriptionsPath = path.resolve("./subscriptions.json");
  let subscriptions = [];

  try {
    const rawData = await fs.readFile(subscriptionsPath, "utf-8");
    const parsed = JSON.parse(rawData);
    if (Array.isArray(parsed)) {
      subscriptions = parsed;
    } else {
      throw new Error("subscriptions.json must contain an array");
    }
  } catch (error) {
    return NextResponse.json(
      { error: "subscriptions.json illisible ou absent" },
      { status: 500 }
    );
  }

  const notification = {
    title: "📰 Nouvelle veille tech dispo !",
    options: {
      body: "Viens découvrir les nouveaux articles du jour.",
      icon: "/icon-192.png",
    },
  };

  const results = await Promise.allSettled(
    subscriptions.map((sub) =>
      webpush.sendNotification(sub, JSON.stringify(notification))
    )
  );

  const success = results.filter((r) => r.status === "fulfilled").length;
  const errors = results.filter((r) => r.status === "rejected").length;

  return NextResponse.json({
    message: `Notifications envoyées à ${success} abonnés. Erreurs: ${errors}`,
  });
}
