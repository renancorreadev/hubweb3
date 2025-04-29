interface PrimaryButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function PrimaryButton({ href, children, className }: PrimaryButtonProps) {
  return (
    <a
      href={href}
      className="
        primary-button
        px-8
        py-4
        rounded-lg
        font-dsemi
        text-lg
        bg-hub-primary-light dark:bg-hub-primary-dark
        text-black dark:text-hub-background-dark
        hover:bg-hub-primary-light/90 dark:hover:bg-hub-primary-dark/90
        border
        border-hub-primary-light dark:border-hub-primary-dark
        transition-all
        duration-300
        transform
        hover:scale-105
        ${className}
      "
    >
      {children}
    </a>
  );
} 