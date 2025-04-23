'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

interface GradientLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

const LinkButton = ({ href, children, className = '' }: GradientLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={clsx(
        'px-4 py-2 rounded-full font-semibold transition-colors duration-300',
        'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md',
        isActive ? 'ring-2 ring-white/70 scale-105' : 'opacity-80 hover:opacity-100',
        className
      )}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
