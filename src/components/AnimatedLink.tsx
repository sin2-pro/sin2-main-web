import React from 'react';
import { twMerge } from 'tailwind-merge';

interface AnimatedLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
}

const AnimatedLink: React.FC<AnimatedLinkProps> = ({
  href,
  children,
  className = '',
  target = '_self',
  rel = '',
  icon,
}) => {
  const baseClasses =
    'relative transition-colors duration-200 hover:text-accent prose prose-invert';
  const combinedClasses = twMerge(baseClasses, className);

  return (
    <a href={href} target={target} rel={rel} className={combinedClasses}>
      {icon && (
        <span className="inline-flex items-center gap-1">
          {icon}
          {children}
        </span>
      )}
      {!icon && children}
    </a>
  );
};

export default AnimatedLink;
