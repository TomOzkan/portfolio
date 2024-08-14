"use client";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import DotPattern from "@/components/magicui/dot-pattern";
import { jsonLd } from "@/constants/metadata";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  if (isLoading) {
    return (<PageTransition isLoading={isLoading} setIsLoading={setIsLoading} />)
  }
  const copy = () => {
    navigator.clipboard.writeText("tomozkan0@icloud.com");
  }
  return (
    <>
      <div className="flex flex-row mt-4 mr-4 fixed right-0 justify-end">
        <Link href={"https://github.com/TomOzkan"}> <Image src="/Github.png" alt="github icon" height={44} width={44}></Image> </Link>
        <Link href="https://www.linkedin.com/in/tom-ozkan-133693210/"><Image src="/Linkedin.png" alt="linkedin icon" height={44} width={44}></Image></Link>
      </div>
      {children}
      <Footer />
      <DotPattern />

    </>
  );
}