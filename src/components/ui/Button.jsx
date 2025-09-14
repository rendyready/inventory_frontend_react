export default function Button({
  children,
  onClick,
  className = '',
  variant = 'primary',
  type = 'button',
}) {
  let baseClass =
    'px-3 py-1 rounded text-white text-sm transition-all duration-200';

  let variantClass = {
    primary: 'bg-blue-600 hover:bg-blue-700',
    warning: 'bg-orange-500 hover:bg-orange-600',
    danger: 'bg-red-600 hover:bg-red-700',
    success: 'bg-green-600 hover:bg-green-700',
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClass} ${variantClass} ${className}`}
    >
      {children}
    </button>
  );
}
