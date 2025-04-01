export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import webpush from "web-push";

export async function GET() {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const VAPID_PUBLIC_KEY = process.env.VAPID_PUBLIC_KEY;
  const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;

  if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
    return NextResponse.json(
      { error: "VAPID keys are missing" },
      { status: 500 }
    );
  }

  webpush.setVapidDetails(
    "mailto:admin@tonsite.com",
    VAPID_PUBLIC_KEY,
    VAPID_PRIVATE_KEY
  );

  const { data: subscriptions, error } = await supabase
    .from("subscriptions")
    .select("*");

  if (error) {
    return NextResponse.json(
      { error: "Erreur de lecture Supabase" },
      { status: 500 }
    );
  }

  if (!subscriptions || subscriptions.length === 0) {
    return NextResponse.json({ message: "Aucun abonné." });
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
