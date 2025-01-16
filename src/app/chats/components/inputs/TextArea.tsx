export default function TextArea({ error, textareaRef, ...props }: any) {
  return (
    <textarea
      {...props}
      ref={textareaRef}
      placeholder={error ? error : "Type a message..."}
      rows={1}
      className={`block w-full px-4 bg-transparent text-sm outline-none focus:outline-none h-[18px] resize-none max-h-[200px] overflow-y-hidden transition-all duration-300 ease-in-out ${
        error &&
        "placeholder:text-red-500 dark:border-red-400 dark:placeholder:text-red-400"
      }`}
    />
  );
}
