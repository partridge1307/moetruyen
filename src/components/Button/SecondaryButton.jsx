const SecondaryButton = ({ title, className, onClick }) => {
  return (
    <button
      className={`${className} bg-zinc-500`}
      type="button"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default SecondaryButton;
