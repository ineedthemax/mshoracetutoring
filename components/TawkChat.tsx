"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    Tawk_API: Record<string, unknown>;
    Tawk_LoadStart: Date;
  }
}

export function TawkChat() {
  useEffect(() => {
    // Push widget up above the mobile bottom nav (64px tall)
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_API.customStyle = {
      visibility: {
        mobile: {
          position: "br",
          xOffset: 16,
          yOffset: 72, // clears the 64px bottom nav bar
        },
        desktop: {
          position: "br",
          xOffset: 20,
          yOffset: 20,
        },
      },
    };

    window.Tawk_LoadStart = new Date();

    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/69eea4d852f9f01c33156cc5/1jn637rmb";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode?.insertBefore(s1, s0);
  }, []);

  return null;
}
