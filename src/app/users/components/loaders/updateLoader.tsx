export default function UpdateLoader() {
  return (
    <>
      <div className="space-y-5 mt-3 overflow-y-auto max-h-[75vh]">
        {Array.from(Array(6)).map((_, index: number) => (
          <div key={index}>
            <p
              className="h-5 w-1/4 mb-2 bg-slate-300 dark:bg-slate-400 rounded-md animate-pulse"
              style={{ animationDelay: `${index * 0.2}s` }}
            ></p>
            <div
              className="w-full h-9 bg-slate-300 dark:bg-slate-400 rounded-md animate-pulse"
              style={{ animationDelay: `${index * 0.2}s` }}
            ></div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 justify-end border-t pt-3">
        <div className="w-24 h-9 rounded-md bg-gray-500/40 animate-pulse"></div>
        <div className="w-24 h-9 rounded-md bg-blue-500/40 animate-pulse"></div>
      </div>
    </>
  );
}
