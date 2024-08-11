"use client";
import { useState } from "react";
import Image from "next/image";
import Badge from "./Badge";

type Props = {
  src: string;
  alt: string;
  hover: 'blue' | 'green' | 'yellow' | 'orange' | 'white' | 'black' | 'purple' | 'red' | 'pink';
  title: string;
  description: string;
  longtext: string;
  language?: string[];
};


export default function Card(props: Props) {
  const [isModal, setIsModal] = useState(false);
  const colorClasses = {
    blue: 'hover:bg-blue-500 hover:text-white',
    green: 'hover:bg-green-500 hover:text-white',
    yellow: 'hover:bg-yellow-500 hover:text-black',
    orange: 'hover:bg-orange-500 hover:text-white',
    white: 'hover:bg-white hover:text-black',
    black: 'hover:bg-black hover:text-white',
    purple: 'hover:bg-purple-500 hover:text-white',
    red: 'hover:bg-red-500 hover:text-white',
    pink: 'hover:bg-pink-500 hover:text-white',
  };
  const hoverColorClass = colorClasses[props.hover];
  return (
    <>
      {isModal ? (
        <div className="z-50 fixed duration-100 top-0 left-0 w-full h-full bg-black backdrop-blur-md bg-opacity-50 flex justify-center items-center">

          <div className="bg-white p-4 w-full h-5/6 lg:h-auto lg:w-3/5 rounded-lg">
            <div onClick={() => setIsModal(false)} className="flex justify-center text-white font-semibold bg-gray-400 w-6 h-6 hover:bg-red-600 rounded-full">X</div>
            <Image src={props.src} alt={props.alt} width={300} height={200} className="justify-between w-full object-contain min-h-44 max-h-44 rounded-md" />
            <h1 className="my-2 font-semibold text-xl">{props.title}</h1>
            <p>{props.longtext}</p>
            <div className="flex gap-2 my-4 flex-wrap flex-row text-nowrap">
              {props.language?.map((language, index) => (
                <div key={index}>
                  <Badge name={language} color="blue" />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
      <div onClick={() => setIsModal(true)} className={`cursor-pointer w-full lg:w-1/5 p-4 my-2 lg:my-8 lg:mx-4 rounded-lg duration-200 bg-slate-100 ${hoverColorClass}`}>
        <Image src={props.src} alt={props.alt} width={300} height={200} className="justify-between w-full object-contain min-h-44 max-h-44 rounded-md" />
        <h1 className="my-2 font-semibold text-xl">{props.title}</h1>
        <p>{props.description}</p>

      </div>
    </>
  );
}