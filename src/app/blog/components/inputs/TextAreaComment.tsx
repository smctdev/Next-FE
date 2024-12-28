export default function TextAreaComment({ textareaRef, error, ...props }: any) {
  return (
    <>
      {error && <small className="text-red-500">{error}</small>}
      <textarea
        ref={textareaRef}
        {...props}
        className="dark:bg-gray-700 bg-gray-200 resize-none pt-2 w-full outline-none focus:outline-none h-auto min-h-[40px] max-h-[200px] overflow-y-hidden transition-all duration-300 ease-in-out"
      />
    </>
  );
}
