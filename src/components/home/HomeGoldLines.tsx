import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const lines = [
  { left: "8%", height: "120%", speed: [0, -120] as [number, number], opacity: 0.06, width: 1 },
  { left: "22%", height: "140%", speed: [0, -200] as [number, number], opacity: 0.04, width: 1 },
  { left: "38%", height: "110%", speed: [0, -80] as [number, number], opacity: 0.07, width: 1 },
  { left: "55%", height: "130%", speed: [0, -160] as [number, number], opacity: 0.05, width: 1 },
  { left: "72%", height: "150%", speed: [0, -240] as [number, number], opacity: 0.04, width: 1 },
  { left: "88%", height: "120%", speed: [0, -100] as [number, number], opacity: 0.06, width: 1 },
  // Diagonal accents
  { left: "15%", height: "80%", speed: [0, -140] as [number, number], opacity: 0.03, width: 1, rotate: 15 },
  { left: "65%", height: "90%", speed: [0, -180] as [number, number], opacity: 0.03, width: 1, rotate: -10 },
];

export const HomeGoldLines = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {lines.map((line, i) => (
        <GoldLine key={i} scrollYProgress={scrollYProgress} {...line} />
      ))}
    </div>
  );
};

function GoldLine({
  left,
  height,
  speed,
  opacity,
  width,
  rotate,
  scrollYProgress,
}: {
  left: string;
  height: string;
  speed: [number, number];
  opacity: number;
  width: number;
  rotate?: number;
  scrollYProgress: any;
}) {
  const y = useTransform(scrollYProgress, [0, 1], speed);

  return (
    <motion.div
      style={{
        left,
        height,
        y,
        opacity,
        width: `${width}px`,
        rotate: rotate ? `${rotate}deg` : undefined,
        background: "linear-gradient(180deg, transparent 0%, hsl(42 35% 53%) 30%, hsl(42 35% 53%) 70%, transparent 100%)",
      }}
      className="absolute top-0"
    />
  );
}
