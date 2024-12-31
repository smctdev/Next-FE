export default function SinglePostLoader() {
  return (
    <>
      <div>
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
          <div className="flex justify-between items-center border-t p-2 border-gray-400 dark:border-gray-500">
            <div className="h-4 bg-slate-300 dark:bg-slate-400 rounded w-28 mb-2 animate-pulse mx-auto"></div>
            <div className="h-4 bg-slate-300 dark:bg-slate-400 rounded w-28 mb-2 animate-pulse mx-auto"></div>
            <div className="h-4 bg-slate-300 dark:bg-slate-400 rounded w-28 mb-2 animate-pulse mx-auto"></div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 py-2 px-4">
        <div className="rounded-full w-8 h-8 bg-slate-300 dark:bg-slate-400 animate-pulse"></div>
        <div className="rounded-xl w-full h-10 bg-slate-300 dark:bg-slate-400 animate-pulse"></div>
      </div>
      <div className="flex gap-3 py-2 px-4">
        <div className="rounded-full w-8 h-8 bg-slate-300 dark:bg-slate-400 animate-pulse"></div>
        <div className="rounded-xl w-full h-10 bg-slate-300 dark:bg-slate-400 animate-pulse"></div>
      </div>
      <div className="flex gap-3 py-2 px-4">
        <div className="rounded-full w-8 h-8 bg-slate-300 dark:bg-slate-400 animate-pulse"></div>
        <div className="rounded-xl w-full h-20 bg-slate-300 dark:bg-slate-400 animate-pulse"></div>
      </div>
    </>
  );
}
