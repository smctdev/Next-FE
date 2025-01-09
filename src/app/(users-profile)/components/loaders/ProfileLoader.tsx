export default function ProfileLoader() {
  return (
    <>
      <div className="flex flex-col sm:flex-row items-center space-y-2 justify-between">
        <div className="flex flex-col sm:flex-row items-center space-x-4">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-2 bg-slate-300 dark:bg-slate-400 animate-pulse mb-2"></div>
          </div>

          <div className="justify-items-center sm:justify-items-start">
            <div className="w-36 h-7 mb-2 bg-slate-300 dark:bg-slate-400 animate-pulse rounded-md"></div>
            <div className="w-16 h-4 mb-2 bg-slate-300 dark:bg-slate-400 animate-pulse rounded-md"></div>
            <div className="flex gap-2 mt-5">
              <div className="w-28 h-9 mb-2 bg-slate-300 dark:bg-slate-400 animate-pulse rounded-md"></div>
              <div className="w-28 h-9 mb-2 bg-slate-300 dark:bg-slate-400 animate-pulse rounded-md"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 justify-items-center sm:justify-items-start">
        <div className="w-20 h-7 mb-2 bg-slate-300 dark:bg-slate-400 animate-pulse rounded-md"></div>

        <div className="w-60 h-16 bg-slate-300 dark:bg-slate-400 animate-pulse rounded-md"></div>
      </div>

      <div className="mt-8 justify-items-center sm:justify-items-start">
        <div className="w-36 h-7 bg-slate-300 dark:bg-slate-400 animate-pulse rounded-md"></div>
        <ul
          role="list"
          className="marker:text-slate-300 marker:dark:text-slate-400 animate-pulse rounded-md list-disc pl-5 space-y-2 text-gray-500 dark:text-gray-400 mt-2"
        >
          <li>
            <div className="w-28 h-4 bg-slate-300 dark:bg-slate-400 animate-pulse rounded-md"></div>
          </li>
          <li>
            <div className="w-28 h-4 bg-slate-300 dark:bg-slate-400 animate-pulse rounded-md"></div>
          </li>
          <li>
            <div className="w-28 h-4 bg-slate-300 dark:bg-slate-400 animate-pulse rounded-md"></div>
          </li>
          <li>
            <div className="w-28 h-4 bg-slate-300 dark:bg-slate-400 animate-pulse rounded-md"></div>
          </li>
        </ul>
      </div>
      <div className="mt-8">
        <div className="flex gap-5 border-b border-slate-300 dark:border-slate-400 animate-pulse pb-2">
          <button
            type="button"
            disabled
            className="px-2 py-1 text-gray-900 dark:text-white hover:bg-gray-200 hover:rounded-t-md dark:hover:bg-gray-600 cursor-not-allowed"
          >
            <h2 className="text-md font-semibold">
              <div className="w-16 h-7 bg-slate-300 dark:bg-slate-400 animate-pulse rounded-md"></div>
            </h2>
          </button>
          <button
            type="button"
            disabled
            className="px-2 py-1 text-gray-900 dark:text-white hover:bg-gray-200 hover:rounded-t-md dark:hover:bg-gray-600 cursor-not-allowed"
          >
            <h2 className="text-md font-semibold">
              <div className="w-16 h-7 bg-slate-300 dark:bg-slate-400 animate-pulse rounded-md"></div>
            </h2>
          </button>
        </div>
      </div>
    </>
  );
}
