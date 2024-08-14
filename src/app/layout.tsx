import type { Metadata } from "next";
import { commonMetadata, jsonLd } from "@/constants/metadata";

import "./globals.css";

export const metadata: Metadata = commonMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="m-0 p-0 relative">
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>

    </html>
  );

}
