import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const bootLines = [
  { text: "$ ssh antoine@portfolio.sisr", delay: 0, type: "command" as const },
  { text: "Connecting to 192.168.1.42...", delay: 600, type: "info" as const },
  { text: "Authentication successful.", delay: 1200, type: "success" as const },
  { text: "", delay: 1500, type: "blank" as const },
  { text: "$ cat /etc/motd", delay: 1700, type: "command" as const },
  { text: "╔══════════════════════════════════════╗", delay: 2100, type: "ascii" as const },
  { text: "║   ANTOINE DUHAUTBOIS — BTS SIO SISR  ║", delay: 2200, type: "ascii" as const },
  { text: "╚══════════════════════════════════════╝", delay: 2300, type: "ascii" as const },
  { text: "", delay: 2500, type: "blank" as const },
  { text: "$ systemctl status portfolio.service", delay: 2700, type: "command" as const },
  { text: "● portfolio.service - Portfolio Web Server", delay: 3100, type: "info" as const },
  { text: "   Active: active (running)", delay: 3300, type: "success" as const },
  { text: "   Memory: 128M", delay: 3400, type: "info" as const },
  { text: "", delay: 3600, type: "blank" as const },
  { text: "$ ./launch-portfolio.sh", delay: 3800, type: "command" as const },
  { text: "[██████████████████████████] 100%", delay: 4200, type: "progress" as const },
  { text: "Initializing interface...", delay: 4600, type: "success" as const },
];

const colorMap: Record<string, string> = {
  command: "text-primary",
  info: "text-muted-foreground",
  success: "text-terminal-green",
  ascii: "text-primary",
  blank: "",
  progress: "text-primary",
};

interface TerminalIntroProps {
  onComplete: () => void;
}

const TerminalIntro = ({ onComplete }: TerminalIntroProps) => {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [showCursor, setShowCursor] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    bootLines.forEach((line, i) => {
      timers.push(
        setTimeout(() => setVisibleLines(i + 1), line.delay)
      );
    });

    // Trigger exit
    timers.push(
      setTimeout(() => setExiting(true), 5200)
    );

    timers.push(
      setTimeout(() => onComplete(), 5800)
    );

    // Cursor blink
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(cursorInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Scanline overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.03]"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(180 65% 50% / 0.1) 2px, hsl(180 65% 50% / 0.1) 4px)",
            }}
          />

          {/* Terminal window */}
          <div className="w-full max-w-2xl mx-4">
            {/* Title bar */}
            <div className="bg-secondary rounded-t-lg px-4 py-2.5 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/70" />
                <div className="w-3 h-3 rounded-full bg-accent/70" />
                <div className="w-3 h-3 rounded-full bg-terminal-green/70" />
              </div>
              <span className="font-mono text-xs text-muted-foreground ml-3">
                antoine@sisr — bash
              </span>
            </div>

            {/* Terminal body */}
            <div className="bg-card/90 border border-border border-t-0 rounded-b-lg p-5 font-mono text-sm min-h-[340px] overflow-hidden backdrop-blur-sm">
              {bootLines.slice(0, visibleLines).map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -5 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`${colorMap[line.type]} leading-relaxed ${line.type === "blank" ? "h-4" : ""}`}
                >
                  {line.type === "progress" ? (
                    <ProgressBar />
                  ) : (
                    line.text
                  )}
                </motion.div>
              ))}

              {/* Blinking cursor */}
              <span
                className={`inline-block w-2.5 h-4 bg-primary mt-1 ${
                  showCursor ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </div>

          {/* Skip hint */}
          <motion.button
            className="absolute bottom-8 font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={() => {
              setExiting(true);
              setTimeout(onComplete, 400);
            }}
          >
            Appuyer pour passer ›
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          className="fixed inset-0 z-[100] bg-background"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      )}
    </AnimatePresence>
  );
};

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + 4;
      });
    }, 15);
    return () => clearInterval(interval);
  }, []);

  const filled = Math.floor(progress / 4);
  const bar = "█".repeat(filled) + "░".repeat(25 - filled);

  return (
    <span>
      [{bar}] {progress}%
    </span>
  );
};

export default TerminalIntro;
