"use client";

import { useEffect, useState, ReactNode } from "react";

export function RenderContainer({ children }: { children: ReactNode }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <div className="">{children}</div >;
}
