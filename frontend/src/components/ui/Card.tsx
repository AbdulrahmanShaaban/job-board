import { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
  onClick?: () => void;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ children, hover = false, className = '', onClick }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={`bg-level-1 rounded-[24px] ${hover ? 'card-hover transition-all duration-300' : ''} ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={hover ? { y: -4 } : {}}
        onClick={onClick}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export default Card;
