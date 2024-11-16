const SchedulesSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 p-3 overflow-x-hidden">
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index}>
          <div className="bg-white dark:bg-gray-800 shadow-lg p-4 rounded-md hover:z-50 hover:bg-gray-200 dark:hover:bg-gray-700 transition">
            <div className="h-6 bg-slate-300 dark:bg-slate-400 rounded mx-auto w-36 mb-4 animate-pulse"></div>

            <div className="flex space-x-2 my-10 items-center justify-center">
              <div className="w-24 h-24 bg-slate-300 dark:bg-slate-400 rounded-full animate-pulse"></div>
              <h3 className="text-4xl font-semibold dark:text-white">
                <strong>VS</strong>
              </h3>
              <div className="w-24 h-24 bg-slate-300 dark:bg-slate-400 rounded-full animate-pulse"></div>
            </div>
            <hr />
            <div className="text-center my-5">
            <div className="h-6 bg-slate-300 dark:bg-slate-400 rounded mx-auto w-36 mb-7 animate-pulse"></div>
            <div className="h-3 bg-slate-300 dark:bg-slate-400 rounded mx-auto w-36 mb-4 animate-pulse"></div>
            <div className="h-3 bg-slate-300 dark:bg-slate-400 rounded mx-auto w-20 mb-4 animate-pulse"></div>
            <div className="h-3 bg-slate-300 dark:bg-slate-400 rounded mx-auto w-12 mb-4 animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default SchedulesSkeleton;
