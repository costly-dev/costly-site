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
      
      // Apply zoom to both HTML and body
      if (isPhone) {
        document.documentElement.style.zoom = '0.5';
        document.body.style.zoom = '0.5';
        
        // Add a class to body so we can adjust spacing in CSS
        document.body.classList.add('phone-zoomed');
        
        // Inject CSS to fix spacing issues when zoomed
        const styleId = 'phone-zoom-spacing-fix';
        if (!document.getElementById(styleId)) {
          const style = document.createElement('style');
          style.id = styleId;
          style.innerHTML = `
            /* Spacer that only appears on phone */
            .phone-spacer {
              display: none;
              width: 100%;
            }
            
            body.phone-zoomed .phone-spacer {
              display: block;
              height: 8rem; /* Adjust this value as needed */
            }
            
            /* Push hero content down more on phone */
            body.phone-zoomed #home {
              padding-top: 8rem !important;
              box-sizing: border-box;
            }
            
            /* Target the first child of hero to push it down */
            body.phone-zoomed #home > div:first-child {
              margin-top: 4rem !important;
            }
            
            /* Only target hero section margins, not notifications */
            body.phone-zoomed #home .mt-40 {
              margin-top: 5rem !important;
            }
            
            body.phone-zoomed #home .mt-20 {
              margin-top: 2.5rem !important;
            }
            
            body.phone-zoomed #home .ml-20 {
              margin-left: 2.5rem !important;
            }
            
            body.phone-zoomed #home .pt-60 {
              padding-top: 7.5rem !important;
            }
            
            /* Fix hero's absolute positioned elements only */
            body.phone-zoomed #home [style*="top: 635px"] {
              top: 400px !important;
            }
            
            /* Don't shrink scrolling notifications */
            body.phone-zoomed .scrolling-notifications {
              zoom: 2 !important; /* Counter-zoom to keep normal size */
              transform-origin: top left;
            }
            
            /* Adjust position since counter-zoom affects positioning */
            body.phone-zoomed .scrolling-notifications {
              top: 47px !important; /* Half of 94px since we're counter-zooming */
            }
            
            /* Don't touch other notifications, toasts, or modals */
            body.phone-zoomed [role="alert"],
            body.phone-zoomed .notification,
            body.phone-zoomed .toast {
              zoom: 2 !important;
              position: fixed !important;
              transform-origin: top center;
            }
          `;
          document.head.appendChild(style);
        }
      } else {
        document.documentElement.style.zoom = '1';
        document.body.style.zoom = '1';
        document.body.classList.remove('phone-zoomed');
      }
    };

    checkAspectRatio();
    window.addEventListener('resize', checkAspectRatio);
    window.addEventListener('orientationchange', checkAspectRatio);

    return () => {
      window.removeEventListener('resize', checkAspectRatio);
      window.removeEventListener('orientationchange', checkAspectRatio);
      document.documentElement.style.zoom = '1';
      document.body.style.zoom = '1';
      document.body.classList.remove('phone-zoomed');
      
      // Clean up the style tag
      const style = document.getElementById('phone-zoom-spacing-fix');
      if (style) {
        style.remove();
      }
    };
  }, []);

  return <>{children}</>;
};

// Alternative: Smart responsive spacing based on zoom
export const PhoneZoomAutoAdjust = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const applySmartZoom = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      const isPhone = aspectRatio < 0.75 && window.innerWidth <= 768;
      
      if (isPhone) {
        // Apply zoom
        document.documentElement.style.setProperty('zoom', '0.5');
        
        // Use CSS custom properties for dynamic spacing
        document.documentElement.style.setProperty('--zoom-factor', '0.5');
        document.documentElement.style.setProperty('--spacing-multiplier', '0.5');
        
        // Inject responsive spacing CSS
        const styleId = 'phone-zoom-auto-adjust';
        if (!document.getElementById(styleId)) {
          const style = document.createElement('style');
          style.id = styleId;
          style.innerHTML = `
            :root {
              --zoom-factor: 1;
              --spacing-multiplier: 1;
            }
            
            /* Auto-adjust all spacing when zoomed */
            [style*="zoom: 0.5"] * {
              /* Margins and paddings are automatically adjusted by zoom */
              /* But we can fine-tune specific elements */
            }
            
            /* Specific adjustments for your hero */
            [style*="zoom: 0.5"] #home {
              margin-top: calc(-5rem * var(--spacing-multiplier)) !important;
            }
            
            /* Keep fixed headers in place */
            [style*="zoom: 0.5"] .fixed,
            [style*="zoom: 0.5"] .sticky {
              zoom: 2;
            }
          `;
          document.head.appendChild(style);
        }
      } else {
        document.documentElement.style.setProperty('zoom', '1');
        document.documentElement.style.setProperty('--zoom-factor', '1');
        document.documentElement.style.setProperty('--spacing-multiplier', '1');
      }
    };

    applySmartZoom();
    window.addEventListener('resize', applySmartZoom);
    window.addEventListener('orientationchange', applySmartZoom);

    return () => {
      window.removeEventListener('resize', applySmartZoom);
      window.removeEventListener('orientationchange', applySmartZoom);
      document.documentElement.style.zoom = '1';
      
      const style = document.getElementById('phone-zoom-auto-adjust');
      if (style) {
        style.remove();
      }
    };
  }, []);

  return <>{children}</>;
};

export default PhoneZoomContainer;
