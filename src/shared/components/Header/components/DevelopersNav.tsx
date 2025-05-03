"use client";

import { Typography } from "@/components/Typography";

export function DevelopersNav() {
  return (
    <div className="w-full bg-black text-white text-sm py-2 text-center">
      {/* Subnav ou aviso */}
      <Typography variant="small" color="text.primary" align="center" font="monument">
        "We build blocks  not just of code, but of trust."
      </Typography>
    </div>
  );
}
