interface PrimaryButtonProps {
  href: string;
  children: React.ReactNode;
}

export function PrimaryButton({ href, children }: PrimaryButtonProps) {
  return (
    <a
      href={href}
      className="
        px-8
        py-4
        rounded-lg
        font-dsemi
        text-lg
        bg-hub-primary-light dark:bg-hub-primary-dark
        text-hub-background-light dark:text-hub-background-dark
        hover:bg-hub-primary-light/90 dark:hover:bg-hub-primary-dark/90
        border
        border-hub-primary-light dark:border-hub-primary-dark
        transition-all
        duration-300
        transform
        hover:scale-105
      "
    >
      {children}
    </a>
  );
} 