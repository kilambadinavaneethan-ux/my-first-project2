function Button({ 
  children, 
  onClick, 
  className = "", 
  type = "button",
  disabled = false,
  ...props 
}) {
  const baseClass = "btn-base";
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
