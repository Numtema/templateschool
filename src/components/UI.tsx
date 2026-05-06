import { ReactNode } from 'react';
import { cn } from '../lib/utils.ts';
import { motion } from 'motion/react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'full';
  children: ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: ButtonProps) {
  const variants = {
    primary: 'bg-brand-primary text-white shadow-primary-glow hover:bg-brand-primary-hover active:scale-95',
    secondary: 'bg-white text-brand-primary border border-brand-primary hover:bg-brand-primary-surface',
    outline: 'bg-transparent text-[#4B5563] border border-[#E2E4E7] hover:border-brand-primary hover:text-brand-primary',
    ghost: 'bg-transparent text-[#4B5563] hover:bg-[#F3F4F6]',
    dark: 'bg-[#111827] text-white hover:bg-black'
  };

  const sizes = {
    sm: 'h-10 px-4 text-sm font-semibold rounded-lg',
    md: 'h-12 px-6 text-sm font-semibold rounded-xl',
    lg: 'h-14 px-8 text-base font-bold rounded-xl',
    full: 'h-12 w-full text-sm font-semibold rounded-xl'
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'inline-flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export function Badge({ children, variant = 'info', className }: { children: ReactNode, variant?: 'info' | 'success' | 'warning' | 'danger' | 'primary', className?: string }) {
  const styles = {
    info: 'bg-[#EAF1FF] text-[#2563EB]',
    success: 'bg-[#EAFBF0] text-[#16A34A]',
    warning: 'bg-[#FFF7E6] text-[#F59E0B]',
    danger: 'bg-[#FEE2E2] text-[#DC2626]',
    primary: 'bg-brand-primary-soft text-brand-primary'
  };

  return (
    <span className={cn('px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider', styles[variant], className)}>
      {children}
    </span>
  );
}

export function ProgressBar({ progress, className, showLabel = false }: { progress: number, className?: string, showLabel?: boolean }) {
  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-bold text-[#9CA3AF] uppercase tracking-widest">Progression</span>
          <span className="text-xs font-bold text-brand-primary">{Math.round(progress)}%</span>
        </div>
      )}
      <div className="h-2 w-full bg-[#F3F4F6] rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="h-full bg-brand-primary rounded-full relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
        </motion.div>
      </div>
    </div>
  );
}
