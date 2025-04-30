import { JSX } from "react";

import { RenderContainer } from "@/shared/components/RenderContainer";
import { LoyahubPage } from "@/features/blockchain/projects/loyahub";

export default function Loyahub(): JSX.Element {
  return (
    <RenderContainer>
      <LoyahubPage />
    </RenderContainer>
  );
} 