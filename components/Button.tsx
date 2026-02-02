import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-6 py-3 rounded-lg font-bold uppercase tracking-widest transition-all transform active:scale-95 border-2";
  
  const variants = {
    primary: "bg-red-700 text-yellow-100 border-yellow-500 hover:bg-red-600 hover:shadow-[0_0_20px_rgba(234,179,8,0.6)]",
    secondary: "bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700",
    success: "bg-green-700 text-white border-green-400 hover:bg-green-600 shadow-[0_0_15px_rgba(74,222,128,0.5)]"
  };

  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
