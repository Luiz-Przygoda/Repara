"use client";

import { useEffect, useState } from "react";
import SplashScreen from "./components/SplashScreen";

export default function ClientRoot({ children }: { children: React.ReactNode }) {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000); // 2 segundos
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) return <SplashScreen />;

  return <>{children}</>;
}
