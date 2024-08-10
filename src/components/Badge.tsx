"use client";
import React from 'react';
import { motion } from "framer-motion"
type BadgeProps = {
  name: string;
  color: 'blue' | 'green' | 'yellow' | 'orange' | 'white' | 'black' | 'purple' | 'red' | 'pink';
  icon?: string;
};

export default function Badge(props: BadgeProps) {
  const colorClasses = {
    blue: 'bg-blue-500 text-white',
    green: 'bg-green-500 text-white',
    yellow: 'bg-yellow-500 text-black',
    orange: 'bg-orange-500 text-white',
    white: 'bg-white text-black',
    black: 'bg-black text-white',
    purple: 'bg-purple-500 text-white',
    red: 'bg-red-500 text-white',
    pink: 'bg-pink-500 text-white',
  };

  const badgeColorClass = colorClasses[props.color];

  return (
    <div>
      <motion.div drag dragConstraints={{ left: 0, right: 0, top:0, bottom:0 }}dragElastic={1} className={`cursor-grab item px-2 p-1 gap-1 rounded w-fit flex flex-row  ${badgeColorClass}`}>
        {props.icon ? <img src={props.icon} alt={props.name} /> : null}
        <h1 className="text-md font-semibold uppercase">{props.name}</h1>
      </motion.div>
    </div>
  );
}
