'use client'
import React, { useState, useEffect } from 'react';

const CharBlurText = ({ 
  text, 
  className = "", 
  charClassName = "", 
  animationDelay = 0 
}: { 
  text: string;
  className?: string; 
  charClassName?: string; 
  animationDelay?: number;
}) => {
  const [clearChars, setClearChars] = useState<string[]>([]);

  useEffect(() => {
    if (text) {
      const chars = text.split('');
      const timer = setTimeout(() => {
        let currentIndex = 0;
        const revealInterval = setInterval(() => {
          if (currentIndex < chars.length) {
            setClearChars(prev => [...prev, chars[currentIndex]]);
            currentIndex++;
          } else {
            clearInterval(revealInterval);
          }
        }, 50);

        return () => {
          clearInterval(revealInterval);
        };
      }, animationDelay);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [text, animationDelay]);

  return (
    <div className={`inline-block ${className}`}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className={`
            inline-block 
            transition-all 
            duration-300 
            ${clearChars.includes(char) ? 'opacity-100' : 'opacity-0 blur-lg'}
            ${charClassName}
          `}
        >
          {char}
        </span>
      ))}
    </div>
  );
};

export default CharBlurText;