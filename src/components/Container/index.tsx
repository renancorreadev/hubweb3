import { desktopOnly, mobileOnly } from "@/shared/configs/responsive";


export const Container = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  return <div className={`${desktopOnly.container} ${mobileOnly.container} ${className}`}>{children}</div>;
};
