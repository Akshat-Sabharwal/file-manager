export const Button = ({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <button
      className={
        "bg-cyan-700/10 border-2 border-cyan-700 active:bg-cyan-700/60 hover:bg-cyan-700/30 rounded-md px-3 py-2 text-neutral-900 cursor-pointer text-xl " +
        className
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
};
