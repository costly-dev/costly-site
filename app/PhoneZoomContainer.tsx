"use client"

import React, { useEffect, useState } from 'react';

const PhoneZoomContainer = ({ children }: { children: React.ReactNode }) => {
  const [isPhoneAspect, setIsPhoneAspect] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const checkAspectRatio = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      const isPhone = aspectRatio < 0.75 && window.innerWidth <= 768;
      setIsPhoneAspect(isPhone);
      
      // Apply zoom to the HTML element for consistent scaling
      if (isPhone) {
        document.documentElement.style.zoom = '0.5';
      } else {
        document.documentElement.style.zoom = '1';
      }
    };

    checkAspectRatio();
    window.addEventListener('resize', checkAspectRatio);
    window.addEventListener('orientationchange', checkAspectRatio);

    return () => {
      window.removeEventListener('resize', checkAspectRatio);
      window.removeEventListener('orientationchange', checkAspectRatio);
      document.documentElement.style.zoom = '1';
    };
  }, []);

  // Simply return children without any wrapper
  return <>{children}</>;
};

// Alternative: CSS Transform approach without extra height
export const PhoneZoomTransform = ({ children }: { children: React.ReactNode }) => {
  const [isPhoneAspect, setIsPhoneAspect] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const checkAspectRatio = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      const isPhone = aspectRatio < 0.75 && window.innerWidth <= 768;
      setIsPhoneAspect(isPhone);
    };

    checkAspectRatio();
    window.addEventListener('resize', checkAspectRatio);
    window.addEventListener('orientationchange', checkAspectRatio);

    return () => {
      window.removeEventListener('resize', checkAspectRatio);
      window.removeEventListener('orientationchange', checkAspectRatio);
    };
  }, []);

  // Inject styles for proper scaling
  useEffect(() => {
    if (!isMounted) return;

    const style = document.createElement('style');
    style.id = 'phone-zoom-styles';
    style.innerHTML = `
      .phone-zoom-wrapper {
        transform-origin: top left;
        transition: transform 0.3s ease;
      }
      
      .phone-zoom-wrapper.zoomed-out {
        transform: scale(0.5);
        width: 200%;
      }
      
      .phone-zoom-wrapper.normal {
        transform: scale(1);
        width: 100%;
      }
      
      /* Prevent body from having extra height */
      body {
        overflow-x: hidden;
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

  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <div className={`phone-zoom-wrapper ${isPhoneAspect ? 'zoomed-out' : 'normal'}`}>
      {children}
    </div>
  );
};

// Alternative: Body-only zoom (most reliable, no layout issues)
export const PhoneZoomBody = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const applyBodyZoom = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      const isPhone = aspectRatio < 0.75 && window.innerWidth <= 768;
      
      if (isPhone) {
        // Apply zoom only to body, not html
        document.body.style.zoom = '0.5';
        // Ensure no extra spacing
        document.body.style.margin = '0';
        document.body.style.padding = '0';
      } else {
        document.body.style.zoom = '1';
      }
    };

    applyBodyZoom();
    window.addEventListener('resize', applyBodyZoom);
    window.addEventListener('orientationchange', applyBodyZoom);

    return () => {
      window.removeEventListener('resize', applyBodyZoom);
      window.removeEventListener('orientationchange', applyBodyZoom);
      document.body.style.zoom = '1';
    };
  }, []);

  return <>{children}</>;
};

// Export the simplest approach by default
export default PhoneZoomContainer;
