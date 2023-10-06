import { useEffect, useState } from 'react';

interface TDeviceDetect {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}
interface TBreakpoints {
  breakPointMobile?: number;
  breakPointTablet?: number;
  breakPointDesktop?: number;
}

const useDeviceDetect = ({
  breakPointMobile = 768,
  breakPointTablet = 1024,
  breakPointDesktop = 1440,
}: TBreakpoints = {}) => {
  const [deviceDetect, setDeviceDetect] = useState<TDeviceDetect>({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
  });

  const breakpoints = {
    breakPointMobile,
    breakPointTablet,
    breakPointDesktop,
  };

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < breakpoints.breakPointMobile) {
        setDeviceDetect({
          isMobile: true,
          isTablet: false,
          isDesktop: false,
        });
      } else if (window.innerWidth < breakpoints.breakPointTablet) {
        setDeviceDetect({
          isMobile: false,
          isTablet: true,
          isDesktop: false,
        });
      } else {
        setDeviceDetect({
          isMobile: false,
          isTablet: false,
          isDesktop: true,
        });
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => {
      window.removeEventListener('resize', updateWidth);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { ...deviceDetect };
};

export default useDeviceDetect;
