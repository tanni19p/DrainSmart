const Card = ({ children, className = "" }) => {
  return (
    <div
      className={`
        rounded-xl p-6 transition-colors
        bg-white border border-gray-200
        dark:bg-slate-800/70 dark:border-slate-700
        shadow-sm dark:shadow-lg
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Card;
