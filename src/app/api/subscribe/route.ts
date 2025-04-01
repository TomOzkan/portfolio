import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const body = await req.json();

  // Vérifier si l'abonnement existe déjà
  const { data: existing, error: fetchError } = await supabase
    .from("subscriptions")
    .select("endpoint")
    .eq("endpoint", body.endpoint);

  if (fetchError) {
    console.error("Erreur de lecture Supabase:", fetchError);
    return NextResponse.json({ error: "Erreur côté serveur" }, { status: 500 });
  }

  if (existing && existing.length === 0) {
    const { error: insertError } = await supabase
      .from("subscriptions")
      .insert([body]);
    if (insertError) {
      console.error("Erreur d'insertion Supabase:", insertError);
      return NextResponse.json(
        { error: "Erreur à l'enregistrement" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ ok: true });
}
