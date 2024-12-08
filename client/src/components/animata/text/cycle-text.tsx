import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function CycleText() {
  const words = ["Earn", "Flex", "Own"];
  const [index, setIndex] = useState(0);

  const total = words.length;
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % total);
    }, 1300);
    return () => clearInterval(interval);
  }, [total]);

  return (
    <div>
      <span className="text-3xl">
        <AnimatePresence mode="wait">
          <motion.h1
            key={`words_${index}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.08 }}
            className="inline-block flex justify-center items-center text-8xl "
          >
            &quot;{words[index]}&quot;
          </motion.h1>
        </AnimatePresence>
      </span>
    </div>
  );
}
