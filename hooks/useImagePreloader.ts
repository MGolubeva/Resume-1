'use client';

import { useState, useEffect } from 'react';

export function useImagePreloader(frameCount: number, getImageUrl: (index: number) => string) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let currentLoadedCount = 0;
    const loadedIndices = new Set<number>();

    const handleLoad = (index: number) => {
      if (!isMounted) return;
      if (loadedIndices.has(index)) return; // Prevent double counting
      
      loadedIndices.add(index);
      currentLoadedCount++;
      setLoadedCount(currentLoadedCount);
      
      if (currentLoadedCount === frameCount) {
        setIsLoaded(true);
      }
    };

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      
      img.onload = () => handleLoad(i);
      img.onerror = () => handleLoad(i); // Count as loaded even on error to prevent blocking
      
      img.src = getImageUrl(i);

      if (img.complete) {
        handleLoad(i);
      }

      loadedImages.push(img);
    }

    setImages(loadedImages);

    return () => {
      isMounted = false;
    };
  }, [frameCount, getImageUrl]);

  return { images, loadedCount, isLoaded };
}
