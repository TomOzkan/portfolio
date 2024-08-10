import React from "react";
import { FlipWords } from "../components/ui/flip-words";

export default function FlipWordsComponent() {
  const words = ["Full-Stack Developper", "Apprentice in Web dev", "Web Artisan"];

  return (
      <div className="text-4xl text-start w-2/3 mx-auto font-normal text-neutral-600 dark:text-neutral-400">
        Tom Ozkan <br /> <FlipWords words={words} /> <br />
      </div>

  );
}
