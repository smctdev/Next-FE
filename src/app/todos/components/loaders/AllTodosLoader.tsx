export default function AllTodosLoader() {
  return (
    <>
      {Array.from(Array(12)).map((_, index) => (
        <div key={index}>
          <div className="h-40 p-5 dark:bg-gray-900 bg-gray-50 shadow-lg w-full rounded-lg transition-all duration-300 ease-in-out z-0">
            <div className="relative mb-2">
              <div className="h-5 bg-slate-300 dark:bg-slate-400 rounded w-3/4 animate-pulse"></div>
              <div className="absolute -right-3 mt-1 -top-5">
                <span className="inline-block w-12 h-4 bg-slate-300 dark:bg-slate-400 rounded animate-pulse"></span>
              </div>
            </div>
            <hr />
            <div className="mt-2">
              <div className="h-10 bg-slate-300 dark:bg-slate-400 rounded animate-pulse"></div>
            </div>
            <div className="flex justify-center space-x-5 mt-3">
              <div className="w-8 h-8 bg-slate-300 dark:bg-slate-400 rounded-full animate-pulse"></div>
              <div className="w-8 h-8 bg-slate-300 dark:bg-slate-400 rounded-full animate-pulse"></div>
              <div className="w-8 h-8 bg-slate-300 dark:bg-slate-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
