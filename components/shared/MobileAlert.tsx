"use client";

import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const MobileAlert: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // Adjust this breakpoint as needed
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  if (!isMobile) return null;

  return (
    <Alert variant="destructive" className="fixed bottom-4 left-4 right-4 z-50">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Attention</AlertTitle>
      <AlertDescription>
        This application is best viewed on a larger screen. For the optimal experience, please visit us on a desktop or tablet device.
      </AlertDescription>
    </Alert>
  );
};

export default MobileAlert;
