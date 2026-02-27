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

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.src = getImageUrl(i);
      
      const handleLoad = () => {
        if (!isMounted) return;
        currentLoadedCount++;
        setLoadedCount(currentLoadedCount);
        if (currentLoadedCount === frameCount) {
          setIsLoaded(true);
        }
      };

      img.onload = handleLoad;
      img.onerror = handleLoad; // Count as loaded even on error to prevent blocking

      loadedImages.push(img);
    }

    setImages(loadedImages);

    return () => {
      isMounted = false;
    };
  }, [frameCount, getImageUrl]);

  return { images, loadedCount, isLoaded };
}
