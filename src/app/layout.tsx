import type { Metadata } from "next";
import { commonMetadata, jsonLd } from "@/constants/metadata";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import "./globals.css";
export const metadata: Metadata = commonMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const copy = () => {
    navigator.clipboard.writeText("tomozkan0@icloud.com");
  }
  return (
    <html lang="en">

      <body className={"m-0 p-0"}>
      <div className="flex flex-row mt-4 mr-4 fixed right-0 justify-end">

          <Link href={"https://github.com/TomOzkan"}> <Image src="/Github.png" alt="github icon" height={44} width={44}></Image> </Link>
          <Link href="https://www.linkedin.com/in/tom-ozkan-133693210/"><Image src="/Linkedin.png" alt="linkedin icon" height={44} width={44}></Image></Link>
        </div>
        {children}
        <Footer/>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </body>

    </html>
  );
}
