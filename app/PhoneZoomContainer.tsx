import React, { useEffect, useState } from 'react';

const PhoneZoomContainer = ({ children }) => {
  const [isPhoneAspect, setIsPhoneAspect] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const checkAspectRatio = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      // Detect portrait phone aspect ratios (typically 9:16 to 3:4)
      // and screen width less than 768px
      const isPhone = aspectRatio < 0.75 && window.innerWidth <= 768;
      setIsPhoneAspect(isPhone);
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    // Check on mount
    checkAspectRatio();

    // Check on resize
    window.addEventListener('resize', checkAspectRatio);
    window.addEventListener('orientationchange', checkAspectRatio);

    return () => {
      window.removeEventListener('resize', checkAspectRatio);
      window.removeEventListener('orientationchange', checkAspectRatio);
    };
  }, []);

  // Apply zoom using CSS transform without breaking layout
  useEffect(() => {
    if (isPhoneAspect) {
      // Apply zoom to the body instead of html to preserve fixed positioning
      document.body.style.zoom = '0.5';
      // Ensure fixed/sticky elements work properly
      document.body.style.position = 'relative';
    } else {
      document.body.style.zoom = '1';
      document.body.style.position = '';
    }

    return () => {
      document.body.style.zoom = '1';
      document.body.style.position = '';
    };
  }, [isPhoneAspect]);

  // Return children without any wrapper that could break layout
  return <>{children}</>;
};

// Alternative: Scale-based approach that preserves scrolling
const PhoneZoomScaleContainer = ({ children }) => {
  const [isPhoneAspect, setIsPhoneAspect] = useState(false);

  useEffect(() => {
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

  const wrapperStyle = {
    transform: isPhoneAspect ? 'scale(0.5)' : 'scale(1)',
    transformOrigin: 'top center',
    width: isPhoneAspect ? '200%' : '100%',
    marginLeft: isPhoneAspect ? '-50%' : '0',
    transition: 'transform 0.3s ease',
  };

  return (
    <div style={wrapperStyle}>
      {children}
    </div>
  );
};

// Alternative: Viewport meta tag approach (most reliable for mobile)
const PhoneZoomViewport = ({ children }) => {
  useEffect(() => {
    const checkAndSetViewport = () => {
      const aspectRatio = window.innerWidth / window.innerHeight;
      const isPhone = aspectRatio < 0.75 && window.innerWidth <= 768;
      
      let viewport = document.querySelector('meta[name=viewport]');
      
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.name = 'viewport';
        document.head.appendChild(viewport);
      }
      
      if (isPhone) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=yes');
      } else {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
      }
    };

    checkAndSetViewport();
    window.addEventListener('resize', checkAndSetViewport);
    window.addEventListener('orientationchange', checkAndSetViewport);

    return () => {
      window.removeEventListener('resize', checkAndSetViewport);
      window.removeEventListener('orientationchange', checkAndSetViewport);
      // Reset viewport on unmount
      const viewport = document.querySelector('meta[name=viewport]');
      if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0');
      }
    };
  }, []);

  return <>{children}</>;
};

// Export the main component - this one won't break your layout
export default PhoneZoomContainer;

// Alternative exports - choose based on your needs:
// export default PhoneZoomScaleContainer;  // For scale-based zoom
// export default PhoneZoomViewport;        // For viewport-based zoom
