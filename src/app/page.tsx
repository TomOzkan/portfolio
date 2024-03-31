import ReseauxLink from "@/components/ReseauxLink";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import Image from 'next/image';
const words = `Full-stack developer & more
`;
        
export function TextGenerateEffectDemo() {
  return <TextGenerateEffect className="text-white" words={words} />;
}
export default function Home() {
  return (
    <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4 z-10">
        <div className="flex flex-row items-center text-3xl justify-between">
        <h1 className="relative z-10 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          OZKAN Tom
        </h1>
        <div className="relative z-10 w-32 h-32 rounded-full overflow-hidden"> 
        <Image layout="fill" objectFit="cover" src="/images/ozkan-tom.jpg" alt="moi" />
        </div>
        </div>
        <p className="text-neutral-500 max-w-lg mx-auto my-2 text-sm text-center relative z-10">
          {TextGenerateEffectDemo()}
        </p>
      </div>
      <ReseauxLink />
    </div>
  );
}
