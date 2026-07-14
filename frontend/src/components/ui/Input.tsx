import { InputHTMLAttributes, forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold tracking-wider text-[#e5e2e1] mb-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full px-4 h-14 input-bg text-[#e5e2e1] placeholder:text-[#cac3d9]/50 border rounded-[24px] focus:outline-none transition-colors ${error ? 'border-[#ffb4ab]' : 'border-transparent input-focus'
            } ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-[#ffb4ab]">{error}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
