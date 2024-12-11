const TeamsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 p-3 overflow-x-hidden">
      {Array.from({ length: 20 }).map((_, index) => (
        <div key={index}>
          <div className="bg-white dark:bg-gray-800 dark:hover:bg-gray-600 shadow-md p-4 rounded-md transition relative">
            <div className="absolute top-2 left-2 w-8 h-8 bg-slate-300 dark:bg-slate-400 rounded-full animate-pulse"></div>

            <div className="flex justify-center my-10">
              <div className="w-32 h-32 bg-slate-300 dark:bg-slate-400 rounded-full animate-pulse"></div>
            </div>

            <div className="h-4 bg-slate-300 dark:bg-slate-400 rounded w-3/6 mb-3 mx-auto animate-pulse"></div>
            <div className="h-4 bg-slate-300 dark:bg-slate-400 rounded w-12 mx-auto animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default TeamsSkeleton;
