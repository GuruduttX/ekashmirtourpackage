"use client";
import React, { useState, useEffect, useRef } from 'react';

// ==========================================
// 📄 File: hooks/useScrollReveal.js (or .ts)
// ==========================================
// TS Tip: If using .ts, use: export const useScrollReveal = (options: any = {}) => {
export const useScrollReveal = (options: any = {}) => {
  const threshold = options.threshold || 0.1;
  const rootMargin = options.rootMargin || '0px 0px -50px 0px';
  const [isVisible, setIsVisible] = useState(false);
  
  // TS Tip: If using .tsx, change to: const ref = useRef<HTMLDivElement>(null);
  const ref = useRef(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold, rootMargin });

    observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible };
};

export default useScrollReveal;