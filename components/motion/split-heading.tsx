"use client"

import { motion, useReducedMotion } from "framer-motion"

type SplitHeadingProps = {
  text: string
  className?: string
}

export default function SplitHeading({ text, className = "" }: SplitHeadingProps) {
  const reduce = useReducedMotion()
  const words = text.split(" ")

  if (reduce) {
    return <h2 className={className}>{text}</h2>
  }

  return (
    <h2 className={`${className}`} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="inline-block overflow-hidden mr-[0.28em] last:mr-0 align-bottom">
          <motion.span
            className="inline-block will-change-transform"
            initial={{ y: "115%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.06 + i * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </h2>
  )
}
