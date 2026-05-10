import underConstructionImg from "@/assets/under-construction.png";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

/* ─── SVG Construction Elements ─── */

const CautionTape = ({ top, rotate = 0, delay = 0 }: { top: string; rotate?: number; delay?: number }) => (
  <motion.div
    className="absolute left-0 right-0 h-6 overflow-hidden z-20 pointer-events-none"
    style={{ top, transform: `rotate(${rotate}deg)` }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay }}
  >
    <motion.div
      className="w-[400%] h-full"
      style={{
        background: "repeating-linear-gradient(45deg, #d4a31a 0px, #d4a31a 16px, #111 16px, #111 32px)",
      }}
      animate={{ x: [0, -64] }}
      transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
    />
  </motion.div>
);

const TrafficCone = ({ left, bottom, scale = 1, delay = 0 }: { left: string; bottom: string; scale?: number; delay?: number }) => (
  <motion.div
    className="absolute z-30 pointer-events-none"
    style={{ left, bottom, transform: `scale(${scale})` }}
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay, type: "spring", bounce: 0.3 }}
  >
    <svg width="40" height="56" viewBox="0 0 40 56" fill="none">
      <rect x="2" y="48" width="36" height="7" rx="2" fill="#222" stroke="#333" strokeWidth="0.5" />
      <polygon points="20,4 32,48 8,48" fill="#e85d04" />
      <polygon points="14,28 26,28 28,36 12,36" fill="white" opacity="0.85" />
      <polygon points="17,14 23,14 25,20 15,20" fill="white" opacity="0.85" />
      <polygon points="20,4 24,20 18,20" fill="#ff8c38" opacity="0.4" />
    </svg>
  </motion.div>
);

const Brick = ({ left, bottom, width = 50, delay = 0 }: { left: string; bottom: string; width?: number; delay?: number }) => (
  <motion.div
    className="absolute z-20 pointer-events-none"
    style={{ left, bottom }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay }}
  >
    <svg width={width} height={width * 0.55} viewBox="0 0 50 28" fill="none">
      <rect x="0" y="0" width="23" height="12" rx="1" fill="#8b4513" stroke="#6b3410" strokeWidth="0.5" />
      <rect x="25" y="0" width="23" height="12" rx="1" fill="#9b5523" stroke="#6b3410" strokeWidth="0.5" />
      <rect x="12" y="14" width="23" height="12" rx="1" fill="#7b3d10" stroke="#5b2a08" strokeWidth="0.5" />
      <rect x="0" y="14" width="10" height="12" rx="1" fill="#8b4513" stroke="#6b3410" strokeWidth="0.5" />
      <rect x="37" y="14" width="11" height="12" rx="1" fill="#9b5523" stroke="#6b3410" strokeWidth="0.5" />
    </svg>
  </motion.div>
);

const WarningLight = ({ left, top, delay = 0 }: { left: string; top: string; delay?: number }) => (
  <motion.div
    className="absolute z-30 pointer-events-none"
    style={{ left, top }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay }}
  >
    <div className="w-1.5 h-14 bg-gradient-to-b from-gray-500 to-gray-700 mx-auto rounded-sm" />
    <motion.div
      className="w-5 h-5 rounded-full mx-auto -mt-14"
      style={{ background: "radial-gradient(circle, #ff4400 20%, #cc2200 100%)" }}
      animate={{
        boxShadow: ["0 0 6px 2px rgba(255,68,0,0.4)", "0 0 25px 8px rgba(255,68,0,0.9)", "0 0 6px 2px rgba(255,68,0,0.4)"],
        opacity: [0.6, 1, 0.6],
      }}
      transition={{ duration: 1, repeat: Infinity, delay }}
    />
  </motion.div>
);

const Crane = ({ left, height = 280, delay = 0, flip = false }: { left: string; height?: number; delay?: number; flip?: boolean }) => (
  <motion.div
    className="absolute bottom-[10%] z-10 pointer-events-none hidden md:block"
    style={{ left, transform: flip ? "scaleX(-1)" : undefined }}
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 0.45, y: 0 }}
    transition={{ delay, duration: 1 }}
  >
    <svg width="160" height={height} viewBox={`0 0 160 ${height}`} fill="none">
      {/* Main tower */}
      <rect x="70" y={height - 240} width="8" height="240" fill="#3a3a3a" />
      <rect x="82" y={height - 240} width="8" height="240" fill="#2e2e2e" />
      {/* Cross braces on tower */}
      {Array.from({ length: 8 }).map((_, i) => (
        <g key={i}>
          <line x1="70" y1={height - 30 * i - 30} x2="90" y2={height - 30 * i - 60} stroke="#4a4a4a" strokeWidth="1.5" />
          <line x1="90" y1={height - 30 * i - 30} x2="70" y2={height - 30 * i - 60} stroke="#4a4a4a" strokeWidth="1.5" />
        </g>
      ))}
      {/* Horizontal jib */}
      <rect x="10" y={height - 245} width="150" height="5" fill="#3a3a3a" />
      {/* Jib support cables */}
      <line x1="80" y1={height - 270} x2="15" y2={height - 245} stroke="#555" strokeWidth="1.5" />
      <line x1="80" y1={height - 270} x2="155" y2={height - 245} stroke="#555" strokeWidth="1.5" />
      {/* Top mast */}
      <rect x="77" y={height - 275} width="6" height="35" fill="#3a3a3a" />
      {/* Counter weight */}
      <rect x="10" y={height - 243} width="20" height="14" fill="#555" rx="2" />
      {/* Hook cable */}
      <line x1="130" y1={height - 240} x2="130" y2={height - 180} stroke="#666" strokeWidth="1.5" />
      {/* Hook */}
      <motion.g
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d={`M126,${height - 182} L134,${height - 182} L134,${height - 172} Q130,${height - 165} 126,${height - 172} Z`} fill="#777" />
      </motion.g>
      {/* Cabin */}
      <rect x="72" y={height - 248} width="16" height="12" fill="#4a4030" rx="1" />
      <rect x="74" y={height - 246} width="5" height="4" fill="#6a5a40" opacity="0.6" rx="0.5" />
    </svg>
  </motion.div>
);

const Scaffold = ({ left, bottom, height = 180, delay = 0 }: { left: string; bottom: string; height?: number; delay?: number }) => (
  <motion.div
    className="absolute z-15 pointer-events-none"
    style={{ left, bottom }}
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 0.5, y: 0 }}
    transition={{ delay, duration: 0.7 }}
  >
    <svg width="80" height={height} viewBox={`0 0 80 ${height}`} fill="none">
      <rect x="5" y="0" width="4" height={height} fill="#4a4a4a" />
      <rect x="71" y="0" width="4" height={height} fill="#4a4a4a" />
      {Array.from({ length: Math.floor(height / 45) }).map((_, i) => (
        <g key={i}>
          <rect x="9" y={i * 45 + 2} width="62" height="3" fill="#5a5a5a" />
          <rect x="12" y={i * 45 - 1} width="56" height="4" fill="#7a6040" rx="1" />
          <line x1="9" y1={i * 45 + 5} x2="71" y2={(i + 1) * 45} stroke="#3a3a3a" strokeWidth="1" />
          <line x1="71" y1={i * 45 + 5} x2="9" y2={(i + 1) * 45} stroke="#3a3a3a" strokeWidth="1" />
        </g>
      ))}
    </svg>
  </motion.div>
);

const Barrier = ({ left, bottom, delay = 0 }: { left: string; bottom: string; delay?: number }) => (
  <motion.div
    className="absolute z-25 pointer-events-none"
    style={{ left, bottom }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay }}
  >
    <svg width="90" height="50" viewBox="0 0 90 50" fill="none">
      <rect x="5" y="12" width="80" height="16" rx="2" fill="#d4a31a" />
      <rect x="5" y="12" width="80" height="16" rx="2" fill="url(#stripes)" />
      <rect x="10" y="28" width="4" height="20" fill="#555" />
      <rect x="76" y="28" width="4" height="20" fill="#555" />
      <defs>
        <pattern id="stripes" width="20" height="16" patternUnits="userSpaceOnUse">
          <rect width="20" height="16" fill="#d4a31a" />
          <polygon points="0,0 10,0 0,16" fill="#111" opacity="0.5" />
          <polygon points="10,0 20,0 10,16 0,16" fill="#111" opacity="0.5" />
        </pattern>
      </defs>
    </svg>
  </motion.div>
);

const Bulldozer = ({ left, bottom, delay = 0, scale = 1 }: { left: string; bottom: string; delay?: number; scale?: number }) => (
  <motion.div
    className="absolute z-25 pointer-events-none hidden md:block"
    style={{ left, bottom, transform: `scale(${scale})` }}
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 0.55, x: 0 }}
    transition={{ delay, duration: 0.8 }}
  >
    <svg width="100" height="60" viewBox="0 0 100 60" fill="none">
      {/* Tracks */}
      <rect x="15" y="45" width="70" height="12" rx="6" fill="#333" stroke="#444" strokeWidth="1" />
      <circle cx="25" cy="51" r="4" fill="#444" stroke="#555" strokeWidth="0.5" />
      <circle cx="50" cy="51" r="4" fill="#444" stroke="#555" strokeWidth="0.5" />
      <circle cx="75" cy="51" r="4" fill="#444" stroke="#555" strokeWidth="0.5" />
      {/* Body */}
      <rect x="25" y="25" width="55" height="22" rx="3" fill="#c49a20" />
      <rect x="27" y="27" width="20" height="10" rx="2" fill="#333" opacity="0.4" />
      {/* Exhaust */}
      <rect x="72" y="18" width="4" height="10" fill="#555" rx="1" />
      <motion.circle
        cx="74" cy="16" r="3"
        fill="rgba(100,100,100,0.3)"
        animate={{ r: [3, 5, 3], opacity: [0.3, 0.1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      {/* Blade */}
      <rect x="5" y="28" width="8" height="22" rx="1" fill="#8a7a20" />
      <rect x="3" y="26" width="12" height="4" rx="1" fill="#aa9a30" />
      {/* Arm */}
      <rect x="13" y="32" width="14" height="3" fill="#aa9a30" rx="1" />
    </svg>
  </motion.div>
);

const Toolbox = ({ left, bottom, delay = 0 }: { left: string; bottom: string; delay?: number }) => (
  <motion.div
    className="absolute z-25 pointer-events-none"
    style={{ left, bottom }}
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.7 }}
    transition={{ delay }}
  >
    <svg width="35" height="25" viewBox="0 0 35 25" fill="none">
      <rect x="2" y="8" width="31" height="16" rx="2" fill="#cc2222" />
      <rect x="12" y="5" width="11" height="5" rx="1" fill="#aa1818" stroke="#881515" strokeWidth="0.5" />
      <rect x="14" y="6" width="7" height="2" rx="0.5" fill="#333" />
      <rect x="6" y="13" width="23" height="1.5" fill="#881515" />
    </svg>
  </motion.div>
);

const HardHatSVG = ({ left, top, delay = 0 }: { left: string; top: string; delay?: number }) => (
  <motion.div
    className="absolute z-25 pointer-events-none"
    style={{ left, top }}
    initial={{ opacity: 0, rotate: -20 }}
    animate={{ opacity: 0.5, rotate: 0 }}
    transition={{ delay }}
  >
    <svg width="35" height="25" viewBox="0 0 35 25" fill="none">
      <ellipse cx="17" cy="18" rx="16" ry="5" fill="#c49a10" />
      <path d="M6,18 Q6,5 17,4 Q28,5 28,18" fill="#d4aa20" />
      <rect x="5" y="16" width="25" height="3" rx="1" fill="#aa8a10" />
    </svg>
  </motion.div>
);

const UnderConstruction = () => {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-between overflow-hidden"
      style={{ background: "#080604" }}
    >
      {/* Pure dark background matching image edges */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, #050403 0%, #080706 25%, #0a0908 50%, #0f0d0b 75%, #1a1510 95%, #2a211a 100%)",
        }}
      />

      {/* Stars matching the image sky */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 60 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 2 + 0.5,
              height: Math.random() * 2 + 0.5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 40}%`,
              background: `rgba(${210 + Math.random() * 45}, ${200 + Math.random() * 45}, ${180 + Math.random() * 45}, ${Math.random() * 0.4 + 0.05})`,
            }}
            animate={{ opacity: [0.1, 0.45, 0.1] }}
            transition={{ duration: Math.random() * 4 + 2, repeat: Infinity, delay: Math.random() * 3 }}
          />
        ))}
      </div>

      {/* Dust haze */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 75%, rgba(80,55,30,0.08) 0%, transparent 50%)" }} />

      {/* ─── CONSTRUCTION ELEMENTS ─── */}

      {/* Cranes */}
      <Crane left="2%" height={320} delay={0.4} />
      <Crane left="75%" height={260} delay={0.7} flip />

      {/* Caution tapes */}
      <CautionTape top="0px" delay={0.2} />
      <CautionTape top="32px" rotate={-0.5} delay={0.3} />

      {/* Scaffoldings */}
      <Scaffold left="-10px" bottom="12%" height={200} delay={0.5} />
      <Scaffold left="calc(100% - 70px)" bottom="15%" height={160} delay={0.8} />

      {/* Warning lights */}
      <WarningLight left="4%" top="20%" delay={0.4} />
      <WarningLight left="94%" top="18%" delay={0.9} />
      <WarningLight left="15%" top="55%" delay={1.2} />
      <WarningLight left="85%" top="50%" delay={0.7} />

      {/* Barriers */}
      <Barrier left="2%" bottom="6%" delay={0.5} />
      <Barrier left="75%" bottom="4%" delay={0.8} />

      {/* Traffic cones */}
      <TrafficCone left="18%" bottom="3%" scale={0.7} delay={0.3} />
      <TrafficCone left="25%" bottom="5%" scale={0.5} delay={0.5} />
      <TrafficCone left="70%" bottom="4%" scale={0.8} delay={0.4} />
      <TrafficCone left="60%" bottom="2%" scale={0.55} delay={0.6} />
      <TrafficCone left="92%" bottom="7%" scale={0.6} delay={0.7} />
      <TrafficCone left="1%" bottom="4%" scale={0.45} delay={0.9} />

      {/* Brick piles */}
      <Brick left="5%" bottom="9%" width={50} delay={0.4} />
      <Brick left="8%" bottom="6%" width={35} delay={0.6} />
      <Brick left="87%" bottom="10%" width={55} delay={0.5} />
      <Brick left="83%" bottom="7%" width={40} delay={0.8} />
      <Brick left="50%" bottom="2%" width={30} delay={0.7} />

      {/* Bulldozer */}
      <Bulldozer left="78%" bottom="12%" delay={1} scale={0.8} />

      {/* Toolboxes */}
      <Toolbox left="20%" bottom="4%" delay={0.8} />
      <Toolbox left="65%" bottom="3%" delay={1.1} />

      {/* Hard hats */}
      <HardHatSVG left="30%" top="65%" delay={1} />
      <HardHatSVG left="75%" top="60%" delay={1.3} />

      {/* Floating dust particles */}
      {Array.from({ length: 25 }).map((_, i) => (
        <motion.div
          key={`dust-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${45 + Math.random() * 45}%`,
            background: `rgba(140,110,70,${Math.random() * 0.1 + 0.02})`,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.03, 0.2, 0.03] }}
          transition={{ duration: Math.random() * 6 + 4, repeat: Infinity, delay: Math.random() * 4, ease: "easeInOut" }}
        />
      ))}

      {/* ─── CONTENT ─── */}
      <div className="relative z-30 flex flex-col items-center pt-16 md:pt-24 px-4">
        <motion.h1
          className="text-2xl md:text-5xl font-mono font-bold tracking-wide text-center mb-3"
          style={{ color: "#e0d5c5" }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Zone en <span style={{ color: "#d4a31a" }}>construction</span>
        </motion.h1>

        <motion.p
          className="text-center max-w-sm mb-5 text-sm font-mono"
          style={{ color: "rgba(180,160,130,0.45)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Notre petit ouvrier s'en occupe... Revenez bientôt !
        </motion.p>

        <motion.a
          href="/"
          className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-mono text-sm transition-all duration-300 backdrop-blur-sm"
          style={{ color: "#d4a31a", border: "1px solid rgba(212,163,26,0.25)", background: "rgba(212,163,26,0.05)" }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(212,163,26,0.12)" }}
          whileTap={{ scale: 0.97 }}
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Retour à l'accueil
        </motion.a>
      </div>

      {/* ─── CHARACTER IMAGE ─── */}
      <motion.div
        className="relative z-20 w-full flex justify-center"
        style={{ marginTop: "auto" }}
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
      >
        <div className="relative w-full flex justify-center">
          {/* Edge fades so image dissolves into the dark background */}
          <div className="absolute top-0 left-0 right-0 h-48 z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, #080604 0%, transparent 100%)" }} />
          <div className="absolute top-0 bottom-0 left-0 w-24 md:w-52 z-10 pointer-events-none" style={{ background: "linear-gradient(to right, #080604 0%, transparent 100%)" }} />
          <div className="absolute top-0 bottom-0 right-0 w-24 md:w-52 z-10 pointer-events-none" style={{ background: "linear-gradient(to left, #080604 0%, transparent 100%)" }} />
          <div className="absolute bottom-0 left-0 right-0 h-8 z-10 pointer-events-none" style={{ background: "linear-gradient(to top, #0f0d0b 0%, transparent 100%)" }} />
          <img
            src={underConstructionImg}
            alt="Page en construction"
            className="w-full max-w-3xl object-contain block"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default UnderConstruction;
