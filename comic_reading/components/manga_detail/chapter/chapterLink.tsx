"use client";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

interface ChapterLinkProps {
  name: string;
  chapter: string;
  chapterName: string;
  time: string;
  poster: string;
}

export function ChapterLink({ name, chapter, time, poster, chapterName }: ChapterLinkProps) {
  const radius = 100;
  const [visible, setVisible] = React.useState(false);

  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <Link to={`/read-manga/${chapter}`}>
      <motion.div
        style={{
          background: useMotionTemplate`
        radial-gradient(
          ${visible ? radius + "px" : "0px"} circle at ${mouseX}px ${mouseY}px,
          var(--orange-500),
          transparent 80%
        )
      `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="p-[1px] rounded-xl w-full h-fit transition duration-300 group/input mt-3"
      >
        <div className="p-3 bg-[#515151] text-white hover:bg rounded-xl w-full h-fit flex">
          <div className="w-8/12 ml-1">
            <h1 className="text-base font-semibold">Chapter {chapter}:  {chapterName}</h1>
          </div>
          <div className=" flex flex-col items-start">
            <h1 className="text-base font-medium">{time}</h1>
            <h1 className="text-base font-light">{poster}</h1>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}

export default ChapterLink;