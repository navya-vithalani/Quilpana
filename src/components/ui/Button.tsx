import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  className = "",
}) => {
  const baseStyles = `
    px-6
    py-3
    rounded-2xl
    font-semibold
    transition-all
    duration-300
    active:scale-[0.98]
  `;

  const variants = {
    primary: `
      bg-[linear-gradient(135deg,#8C7AE6,#6F5DD3)]
      text-white
      hover:scale-105
      hover:shadow-[0_10px_35px_rgba(111,93,211,0.35)]
    `,

    secondary: `
      bg-white/10
      backdrop-blur-md
      border
      border-white/10
      text-[var(--text-main)]
      hover:bg-white/15
    `,

    ghost: `
      text-[var(--text-soft)]
      hover:bg-white/10
    `,
  };

  return (
    <button
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;