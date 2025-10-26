/**
 * Hardware detection utilities for optimal performance and visual effects
 */

export interface HardwareCapabilities {
  supportsBackdropFilter: boolean;
  isLowEndDevice: boolean;
  isMobileDevice: boolean;
  isTabletDevice: boolean;
  isDesktopDevice: boolean;
  prefersReducedMotion: boolean;
  screenWidth: number;
  screenHeight: number;
  devicePixelRatio: number;
}

/**
 * Detect hardware capabilities and screen characteristics
 */
export function detectHardwareCapabilities(): HardwareCapabilities {
  if (typeof window === 'undefined') {
    // Server-side fallback
    return {
      supportsBackdropFilter: true,
      isLowEndDevice: false,
      isMobileDevice: false,
      isTabletDevice: false,
      isDesktopDevice: true,
      prefersReducedMotion: false,
      screenWidth: 1920,
      screenHeight: 1080,
      devicePixelRatio: 1,
    };
  }

  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  const devicePixelRatio = window.devicePixelRatio || 1;

  // Detect backdrop-filter support
  const supportsBackdropFilter = CSS.supports('backdrop-filter', 'blur(10px)') || 
                                 CSS.supports('-webkit-backdrop-filter', 'blur(10px)');

  // Enhanced iPad detection
  const isIPad = detectIPad();
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  
  // Detect device type with better iPad handling
  let isMobileDevice = false;
  let isTabletDevice = false;
  let isDesktopDevice = false;

  if (isIPad) {
    // iPad should always be treated as tablet regardless of screen size
    isTabletDevice = true;
  } else if (screenWidth < 768) {
    isMobileDevice = true;
  } else if (screenWidth >= 768 && screenWidth < 1024) {
    isTabletDevice = true;
  } else if (screenWidth >= 1024) {
    // Only consider it desktop if it's not a touch device
    isDesktopDevice = !isTouchDevice;
    isTabletDevice = isTouchDevice;
  }

  // Detect low-end device based on multiple factors
  const isLowEndDevice = detectLowEndDevice(screenWidth, devicePixelRatio);

  // Detect reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return {
    supportsBackdropFilter,
    isLowEndDevice,
    isMobileDevice,
    isTabletDevice,
    isDesktopDevice,
    prefersReducedMotion,
    screenWidth,
    screenHeight,
    devicePixelRatio,
  };
}

/**
 * Detect if device is an iPad (including iPad Pro)
 */
function detectIPad(): boolean {
  if (typeof window === 'undefined') return false;
  
  const userAgent = navigator.userAgent.toLowerCase();
  const platform = navigator.platform?.toLowerCase() || '';
  
  // Check for iPad in user agent
  if (userAgent.includes('ipad')) return true;
  
  // Check for iPad in platform
  if (platform.includes('ipad')) return true;
  
  // Check for iPad Pro characteristics
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  const hasHighDPR = window.devicePixelRatio >= 2;
  const isLargeScreen = window.innerWidth >= 1024;
  const isPortrait = window.innerHeight > window.innerWidth;
  
  // iPad Pro M1 characteristics:
  // - Touch device with high DPR
  // - Large screen (1024px+)
  // - Often in portrait mode
  // - No mouse cursor (no hover support)
  const hasNoHover = !window.matchMedia('(hover: hover)').matches;
  
  if (isTouchDevice && hasHighDPR && isLargeScreen && (isPortrait || hasNoHover)) {
    return true;
  }
  
  return false;
}

/**
 * Detect if device is low-end based on screen characteristics
 */
function detectLowEndDevice(screenWidth: number, devicePixelRatio: number): boolean {
  // Low-end indicators:
  // - Small screen with high DPR (older phones)
  // - Very low DPR (older devices)
  // - Specific screen dimensions that indicate older devices
  
  const isSmallScreen = screenWidth < 480;
  const isVeryLowDPR = devicePixelRatio < 1.5;
  const isHighDPRSmallScreen = isSmallScreen && devicePixelRatio > 2.5;
  
  return isVeryLowDPR || isHighDPRSmallScreen;
}

/**
 * Apply hardware-optimized classes to document body
 */
export function applyHardwareOptimizations(capabilities: HardwareCapabilities): void {
  if (typeof document === 'undefined') return;

  const body = document.body;
  
  // Remove existing hardware classes
  body.classList.remove(
    'no-backdrop-filter',
    'low-end-device',
    'mobile-device',
    'tablet-device',
    'desktop-device',
    'reduced-motion'
  );

  // Apply appropriate classes based on capabilities
  if (!capabilities.supportsBackdropFilter) {
    body.classList.add('no-backdrop-filter');
  }

  if (capabilities.isLowEndDevice) {
    body.classList.add('low-end-device');
  }

  if (capabilities.isMobileDevice) {
    body.classList.add('mobile-device');
  } else if (capabilities.isTabletDevice) {
    body.classList.add('tablet-device');
  } else if (capabilities.isDesktopDevice) {
    body.classList.add('desktop-device');
  }

  if (capabilities.prefersReducedMotion) {
    body.classList.add('reduced-motion');
  }
}

/**
 * Get responsive class names based on screen size
 */
export function getResponsiveClasses(capabilities: HardwareCapabilities): {
  container: string;
  text: string;
  icon: string;
  button: string;
} {
  const baseClasses = {
    container: 'responsive-container',
    text: 'responsive-text',
    icon: 'responsive-icon',
    button: 'responsive-button',
  };

  // Add device-specific classes
  if (capabilities.isMobileDevice) {
    return {
      ...baseClasses,
      container: `${baseClasses.container} mobile-layout`,
    };
  } else if (capabilities.isTabletDevice) {
    return {
      ...baseClasses,
      container: `${baseClasses.container} tablet-layout`,
    };
  } else {
    return {
      ...baseClasses,
      container: `${baseClasses.container} desktop-layout`,
    };
  }
}

/**
 * Hook for React components to use hardware detection
 */
export function useHardwareDetection() {
  const [capabilities, setCapabilities] = React.useState<HardwareCapabilities | null>(null);

  React.useEffect(() => {
    const detected = detectHardwareCapabilities();
    setCapabilities(detected);
    applyHardwareOptimizations(detected);

    // Listen for changes in reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => {
      const updated = detectHardwareCapabilities();
      setCapabilities(updated);
      applyHardwareOptimizations(updated);
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return capabilities;
}

// Import React for the hook
import React from 'react';
