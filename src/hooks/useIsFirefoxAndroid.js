// src/hooks/useIsFirefoxAndroid.js
import { useEffect, useState } from "react";

export function useIsFirefoxAndroid() {
  const [isFirefoxAndroid, setIsFirefoxAndroid] = useState(false);

  useEffect(() => {
    if (typeof navigator === "undefined") return;

    const ua = (navigator.userAgent || "").toLowerCase();
    const isFirefox = ua.includes("firefox");
    const isAndroid = ua.includes("android");

    setIsFirefoxAndroid(isFirefox && isAndroid);
  }, []);

  return isFirefoxAndroid;
}
