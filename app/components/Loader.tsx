'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoaderProps {
  onLoadingComplete: () => void;
}

const Loader: React.FC<LoaderProps> = ({ onLoadingComplete }) => {
  const loaderRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    const tl = gsap.timeline();
    const exitTl = gsap.timeline({ paused: true });

    if (titleRef.current && loaderRef.current && letterRefs.current.length > 0) {
      // Background fade-in
      tl.fromTo(loaderRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.9, ease: 'power2.inOut' }
      );

      // Text animation
      tl.from(letterRefs.current, {
        opacity: 0,
        scale: 0,
        y: 20,
        stagger: 0.05,
        duration: 0.8,
        ease: 'back.out(1.7)',
      });

      // Pulsing
      tl.to(letterRefs.current, {
        scale: 1.1,
        duration: 0.9,
        ease: 'power1.inOut',
        stagger: {
          each: 0.05,
          repeat: -1,
          yoyo: true,
        },
      }, '-=0.5');

      // Exit
      exitTl.to(letterRefs.current, {
        scale: 2.4,
        opacity: 0,
        duration: 1.6,
        stagger: 0.09,
        ease: 'back.in(2.7)',
      })
      .to(loaderRef.current, {
        yPercent: -100,
        duration: 1.6,
        ease: 'power2.inOut',
        onComplete: onLoadingComplete
      }, '-=0.4');

      // Trigger exit after 4s
      gsap.delayedCall(4, () => exitTl.play());
    }

    return () => {
      tl.kill();
      exitTl.kill();
    };
  }, [onLoadingComplete]);

  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        ref={el => {
          letterRefs.current[index] = el;
        }}
        className="inline-block"
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <div ref={loaderRef} className="fixed inset-0 bg-white z-[100] flex items-center justify-center overflow-hidden">
      <h1 ref={titleRef} className="text-black text-[10vw] font-bold tracking-wider">
        {splitText('NailTheCV')}
      </h1>
    </div>
  );
};

export default Loader;
