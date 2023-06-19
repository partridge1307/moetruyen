const SecondaryButton = ({ children, className, onClick }) => {
  return (
    <button
      className={`${className} bg-zinc-500 transition-colors hover:bg-zinc-400`}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default SecondaryButton;
