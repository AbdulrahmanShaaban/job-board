import { HTMLAttributes } from 'react';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'default';
}

const Badge = ({ children, variant = 'default', className = '', ...props }: BadgeProps) => {
  const variants = {
    success: 'bg-[#4ae183]/15 text-[#4ae183]',
    warning: 'bg-[#efc20a]/15 text-[#efc20a]',
    danger: 'bg-[#ffb4ab]/15 text-[#ffb4ab]',
    info: 'bg-[#6633ee]/20 text-[#ccbeff]',
    default: 'border border-[#494456]/20 text-[#948ea2] bg-transparent',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
