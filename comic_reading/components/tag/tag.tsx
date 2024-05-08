"use client";
import React from "react";
import { useMotionTemplate, useMotionValue, motion } from "framer-motion";

interface TagProps {
    text: string;
    onClick: () => void;
}

export function Tag({ text, onClick }: TagProps) {
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
        className="p-[1px] rounded-xl w-fit h-fit transition duration-300 group/input m-0.5 mt-0"
      >
        <div onClick={onClick} className="p-1 bg-[#313131] text-white hover:bg rounded-xl w-fit h-fit">
            {text}
        </div>
    </motion.div>
    );
}

export default Tag;