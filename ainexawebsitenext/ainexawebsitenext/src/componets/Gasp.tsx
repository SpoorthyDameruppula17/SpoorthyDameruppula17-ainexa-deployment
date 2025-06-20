import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import GlobalColors from '../app/utils/Colors';

const GsapMorphingDashText: React.FC = () => {
  const textRef = useRef<SVGTextElement | null>(null);
  const colors = GlobalColors();

  useEffect(() => {
    if (textRef.current) {
      const tl = gsap.timeline({ repeat: -1, defaults: { ease: 'linear' } });

      tl.to(textRef.current, {
        strokeDasharray: '60 940',
        strokeDashoffset: 0,
        duration: 0.1,
      });

      tl.to(textRef.current, {
        strokeDasharray: '1000 0',
        duration: 4,
      });

      tl.to(textRef.current, {
        strokeDasharray: '0 1000',
        duration: 4,
      });
    }
  }, []);

  return (
    <svg viewBox="0 0 800 200">
      <text
        ref={textRef}
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="120"
        stroke={'white'}
        strokeWidth="2"
        fill={colors?.TEXT.primary}
        strokeDasharray="60 940"
        strokeDashoffset="0"
        fontWeight={800}
      >
        AI Nexa
      </text>
    </svg>
  );
};

export default GsapMorphingDashText;
