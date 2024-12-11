export default function PostLoader() {
  return (
    <>
      {Array.from(Array(6)).map((_, index) => (
        <div key={index} className="mb-5">
          <div className="bg-white dark:bg-gray-800 shadow-md p-4 rounded-md relative">
            <div className="flex justify-center">
              <div className="w-full mb-5 h-72 bg-slate-300 dark:bg-slate-400 rounded-md animate-pulse"></div>
            </div>
            <div className="h-4 bg-slate-300 dark:bg-slate-400 rounded w-full mb-2 animate-pulse"></div>
            <div className="h-4 bg-slate-300 dark:bg-slate-400 rounded w-3/6 mb-2 animate-pulse"></div>
            <div className="h-4 bg-slate-300 dark:bg-slate-400 rounded w-3/12 mb-2 animate-pulse"></div>
            <div className="h-4 bg-slate-300 dark:bg-slate-400 rounded w-full mb-2 animate-pulse"></div>
            <div className="h-4 bg-slate-300 dark:bg-slate-400 rounded w-3/6 mb-2 animate-pulse"></div>
            <div className="h-4 bg-slate-300 dark:bg-slate-400 rounded w-3/5 mb-2 animate-pulse"></div>
          </div>
        </div>
      ))}
    </>
  );
}
