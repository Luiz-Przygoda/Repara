"use client";

import { useEffect, useState } from "react";
import SplashScreen from "./SplashScreen";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000)
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <SplashScreen />;

  return <>{children}</>;
}
