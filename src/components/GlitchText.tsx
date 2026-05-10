import { useState, useEffect } from "react";
import { useInView } from "framer-motion";
import { useRef } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!";

const GlitchText = ({ text, className = "" }: GlitchTextProps) => {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    if (!isInView || hasPlayed) return;
    setHasPlayed(true);

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return text[i];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iteration += 1 / 2;
      if (iteration >= text.length) {
        setDisplay(text);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isInView, text, hasPlayed]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
};

export default GlitchText;
