import { useState, useEffect } from 'react';

export function useImagePreloader(frameCount: number, getImageUrl: (index: number) => string) {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let loaded = 0;
    const imgArray: HTMLImageElement[] = [];
    let isCancelled = false;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.crossOrigin = "anonymous"; // Important for canvas drawing from external URLs
      
      img.onload = () => {
        if (isCancelled) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded === frameCount) {
          setIsLoaded(true);
        }
      };
      
      img.onerror = () => {
        if (isCancelled) return;
        console.warn(`Failed to load image: ${img.src}`);
        loaded++; // Still count it so we don't block forever
        setLoadedCount(loaded);
        if (loaded === frameCount) {
          setIsLoaded(true);
        }
      };

      img.src = getImageUrl(i);
      imgArray.push(img);
    }

    setImages(imgArray);

    return () => {
      isCancelled = true;
    };
  }, [frameCount, getImageUrl]);

  return { images, isLoaded, loadedCount };
}
