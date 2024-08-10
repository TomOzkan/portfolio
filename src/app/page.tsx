
import { mainInformation } from "@/constants/const";
import { textCard } from "@/constants/const";
import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/Badge";
import FlipWordsComponent from "@/components/FlipWord";
import Underline from "@/components/Underline";
import Card from "@/components/Card";



export default function Home() {


  return (
    <div>

      <div className="h-[20rem] container mx-auto my-4 flex justify-center">
        <div className="flex justify-center flex-col-reverse md:flex-row items-center">
          <div className="flex flex-col text-center">

            <FlipWordsComponent />
            <div className="text-start text-gray-600 w-2/3 mx-auto text-lg">
              Hello 👋 I'm interested in learning new technologies and always looking <Underline text="for new challenges." />
            </div>
          </div>
          <div className="image flex justify-center md:justify-start">
            <Image
              src='/mypp.jpg'
              alt={mainInformation.alt}
              width={200}
              height={200}
              className="rounded-full border-8 min-w-44 border-blue-500"
            />
          </div>
        </div>

      </div>
      <div className="w-full flex flex-row justify-center flex-wrap gap-2 mt-20 md:-mt-8">
        <Badge name="html" color="orange" />
        <Badge name="css" color="blue" />
        <Badge name="Javascript" color="yellow" />
        <Badge name="php" color="purple" />
        <Badge name="sql" color="pink" />
        <Badge name="mongodb" color="green" />
        <Badge name="react" color="blue" />
        <Badge name="next" color="blue" />
        <Badge name="angular" color="red" />
      </div>
      <div className="w-full flex flex-row justify-center flex-wrap gap-2 mt-2">
        <Badge name="typescript" color="blue" />
        <Badge name="Laravel" color="orange" />
        <Badge name="Symfony" color="purple" />

        <Badge name="framer motion" color="pink" />
        <Badge name="react native" color="green" />
      </div>
      <h1 className="text-3xl text-center text-gray-600 mt-16">My Last Experiences 🔭</h1>
      <div className="flex flex-col md:flex-row justify-center ">
        <Card src="/teliae.png" alt="Teliae logo" title="Web developper" description={textCard.teliae.description} longtext={textCard.teliae.longtext} language={textCard.teliae.languages} hover="purple" />
        <Card src="/G4.png" alt="G4 logo" title="Project Management" description={textCard.g4.description} longtext={textCard.g4.longtext} language={textCard.g4.languages} hover="yellow" />
        <Card src="/Pibaho.png" alt="Pibaho logo" title="Web developper" description={textCard.pibaho.description} longtext={textCard.pibaho.longtext} language={textCard.pibaho.languages} hover="green" />
        <Card src="/lycee.jpeg" alt="Lycée logo" title="Superior technician SNIR" description={textCard.bts.description} longtext={textCard.bts.longtext} language={textCard.bts.languages}hover="orange" />
      </div>

    </div>
  );
}
