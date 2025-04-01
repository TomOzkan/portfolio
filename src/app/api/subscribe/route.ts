import { NextResponse } from "next/server";
import * as fsPromises from "fs/promises";
import * as pathModule from "path";

const SUBSCRIPTION_FILE = pathModule.resolve("./subscriptions.json");

export async function POST(req: Request) {
  const body = await req.json();
  const fileExists = await fsPromises
    .stat(SUBSCRIPTION_FILE)
    .then(() => true)
    .catch(() => false);

  const subscriptions = fileExists
    ? JSON.parse(await fsPromises.readFile(SUBSCRIPTION_FILE, "utf-8"))
    : [];

  // éviter les doublons
  const alreadyExists = subscriptions.some(
    (sub: any) => sub.endpoint === body.endpoint
  );
  if (!alreadyExists) {
    subscriptions.push(body);
    await fsPromises.writeFile(
      SUBSCRIPTION_FILE,
      JSON.stringify(subscriptions, null, 2)
    );
  }

  return NextResponse.json({ ok: true });
}
