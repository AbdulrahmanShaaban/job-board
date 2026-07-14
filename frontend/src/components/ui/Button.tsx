import { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, children, disabled, className = '', onClick, type = 'button' }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-full font-label-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#6633ee]/50 focus:ring-offset-2 focus:ring-offset-[#131313] disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-[#6633ee] text-white glow-effect',
      secondary: 'bg-transparent border border-[#494456] text-[#e5e2e1] hover:bg-[#2a2a2a]',
      danger: 'bg-[#93000a] text-[#ffdad6] hover:brightness-110',
      ghost: 'bg-transparent text-[#cac3d9] hover:bg-[#2a2a2a] hover:text-[#e5e2e1]',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm h-10',
      md: 'px-6 py-3 text-base h-12',
      lg: 'px-8 py-3 text-lg h-14',
    };

    return (
      <motion.button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        disabled={disabled || isLoading}
        onClick={onClick}
        type={type}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Loading...
          </span>
        ) : (
          children
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
