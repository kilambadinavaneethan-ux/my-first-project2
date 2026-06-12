function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  required = false,
  id,
  step,
  ...props
}) {
  return (
    <div className="input-group">
      {label && <label htmlFor={id}>{label}</label>}
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        step={step}
        {...props}
      />
    </div>
  );
}

export default Input;
