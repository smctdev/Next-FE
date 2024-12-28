export default function PostButton({ icon, label, isLiked, ...props }: any) {
  return (
    <>
      <button
        {...props}
        className={`hover:dark:bg-gray-700 hover:bg-gray-200 px-2 py-2 rounded-md w-full text-center ${
          isLiked && "text-blue-500 "
        }`}
      >
        <i className={`${isLiked ? "fas" : "far"} fa-${icon}`}></i> {label}
      </button>
    </>
  );
}
