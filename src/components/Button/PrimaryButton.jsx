const PrimaryButton = ({
  children,
  className,
  onClick,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      className={`${className} bg-[#506DE4] transition-colors hover:bg-[#5f79e2]`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
