interface SecondaryButtonProps {
  href: string;
  children: React.ReactNode;
}

export function SecondaryButton({ href, children }: SecondaryButtonProps) {
  return (
    <a
      href={href}
      className="
        px-8
        py-4
        rounded-lg
        font-dsemi
        text-lg
        bg-transparent
        text-hub-secondary-light dark:text-hub-secondary-dark
        border
        border-hub-secondary-light dark:border-hub-secondary-dark
        hover:bg-hub-secondary-light/10 dark:hover:bg-hub-secondary-dark/10
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