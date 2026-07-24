"use client"

import Image from "next/image";

import passions from "@/data/passions.json";

interface PassionInterface {
  name: string,
  image: string,
}

export default function PassionSection() {
  return (
    <section id="passion" className="relative p-5 sm:p-20 flex flex-col gap-3">
      <h2>PASSIONS</h2>

      <ul className="flex justify-around flex-wrap gap-10 w-full">
        {
          passions.map((passion: PassionInterface, index) => (
            <li key={index} className="flex justify-content items-center flex-col gap-5">
              <div className="relative size-25 md:size-35 rounded-full overflow-hidden">
                <Image src={`/images/${passion.image}`} fill alt={`${passion.name} passion`} loading="lazy" />
              </div>
              <span>{passion.name}</span>
            </li>
          ))
        }
      </ul>
    </section>
  );
}
