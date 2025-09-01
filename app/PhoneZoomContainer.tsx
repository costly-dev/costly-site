"use client"

import React, { useEffect, useState } from 'react';

const PhoneZoomContainer = ({ children }: { children: React.ReactNode }) => {
  const [isPhoneAspect, setIsPhoneAspect] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const checkAspectRatio = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      // Detect portrait phone aspect ratios and screen width less than 768px
      const isPhone = aspectRatio < 0.75 && window.innerWidth <= 768;
      setIsPhoneAspect(isPhone);
      
      // Apply styles directly to the root element
      const root = document.getElementById('zoom-wrapper');
      if (root) {
        if (isPhone) {
          root.style.transform = 'scale(0.5)';
          root.style.transformOrigin = 'top left';
          root.style.width = '200%';
          root.style.height = '200%';
        } else {
          root.style.transform = 'scale(1)';
          root.style.transformOrigin = 'top left';
          root.style.width = '100%';
          root.style.height = 'auto';
        }
      }
    };

    // Initial check
    checkAspectRatio();

    // Listen for resize events
    window.addEventListener('resize', checkAspectRatio);
    window.addEventListener('orientationchange', checkAspectRatio);

    return () => {
      window.removeEventListener('resize', checkAspectRatio);
      window.removeEventListener('orientationchange', checkAspectRatio);
    };
  }, []);

  // Alternative approach: Use CSS classes that we inject
  useEffect(() => {
    if (!isMounted) return;

    const style = document.createElement('style');
    style.id = 'phone-zoom-styles';
    style.innerHTML = `
      .phone-zoom-active {
        transform: scale(0.5) !important;
        transform-origin: top left !important;
        width: 200% !important;
        min-height: 200vh !important;
      }
      
      .phone-zoom-inactive {
        transform: scale(1) !important;
        transform-origin: top left !important;
        width: 100% !important;
        min-height: 100vh !important;
      }
      
      #zoom-wrapper {
        transition: transform 0.3s ease;
      }
    `;
    
    if (!document.getElementById('phone-zoom-styles')) {
      document.head.appendChild(style);
    }

    return () => {
      const existingStyle = document.getElementById('phone-zoom-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
    };
  }, [isMounted]);

  // Don't render anything on server side
  if (!isMounted) {
    return <div id="zoom-wrapper">{children}</div>;
  }

  return (
    <div 
      id="zoom-wrapper"
      className={isPhoneAspect ? 'phone-zoom-active' : 'phone-zoom-inactive'}
    >
      {children}
    </div>
  );
};

// Alternative: Global zoom approach (affects entire document)
export const PhoneZoomGlobal = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const applyGlobalZoom = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      const isPhone = aspectRatio < 0.75 && window.innerWidth <= 768;
      
      // Create or update viewport meta tag
      let viewport = document.querySelector('meta[name="viewport"]') as HTMLMetaElement;
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        document.head.appendChild(viewport);
      }
      
      if (isPhone) {
        // Method 1: CSS Zoom on body
        document.body.style.zoom = '0.5';
        
        // Method 2: Also set viewport for actual mobile devices
        viewport.content = 'width=device-width, initial-scale=0.5, maximum-scale=0.5';
      } else {
        document.body.style.zoom = '1';
        viewport.content = 'width=device-width, initial-scale=1, maximum-scale=5';
      }
    };

    applyGlobalZoom();
    window.addEventListener('resize', applyGlobalZoom);
    window.addEventListener('orientationchange', applyGlobalZoom);

    return () => {
      window.removeEventListener('resize', applyGlobalZoom);
      window.removeEventListener('orientationchange', applyGlobalZoom);
      document.body.style.zoom = '1';
    };
  }, []);

  return <>{children}</>;
};

export default PhoneZoomContainer;
