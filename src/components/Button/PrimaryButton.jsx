const PrimaryButton = ({ title, className, onClick }) => {
  return (
    <button
      className={`${className} bg-[#506DE4]`}
      type="button"
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default PrimaryButton;
