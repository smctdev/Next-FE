export default function Button({
  children,
  bgColor,
  hoverBgColor,
  ...props
}: any) {
  return (
    <button
      {...props}
      className={`bg-${bgColor} hover:bg-${hoverBgColor} text-white p-2 rounded-md hover:scale-105 transition-all duration-300 ease-in-out`}
    >
      {children}
    </button>
  );
}
