import { JSX } from "react";
import { DeveloperPage } from "@/features/developer";
import { RenderContainer } from "@/shared/components/RenderContainer";

export default function Developer(): JSX.Element {
  return (
    <RenderContainer>
      <DeveloperPage />
    </RenderContainer>
  );
}
