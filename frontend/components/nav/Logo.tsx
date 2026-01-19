"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Logo({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      style={{height: height / 4 }}
      className=""
    >
      {!mounted ? null : (
        <AnimatePresence mode="popLayout">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
            }}
          >
            <Image
              src={
                theme === "light"
                  ? "/logo_outline.png"
                  : "/logo_outline_dark.png"
              }
              alt="PachinGO! Logo"
              width={width}
              height={height}
              priority
            />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
