import React from 'react';
import { motion } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  yOffset?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | string;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  delay = 0,
  className = '',
  yOffset = 24,
  direction = 'up',
}) => {
  let initialX = 0;
  let initialY = yOffset;

  if (direction === 'down') {
    initialY = -yOffset;
  } else if (direction === 'left') {
    initialX = yOffset;
    initialY = 0;
  } else if (direction === 'right') {
    initialX = -yOffset;
    initialY = 0;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: initialX, y: initialY }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1], // iOS native spring easing
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
