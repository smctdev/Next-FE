export default function CategoryLoader() {
  return (
    <>
      {Array.from(Array(20)).map((_, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-lg shadow-lg transition transform hover:shadow-2xl dark:bg-gray-900"
        >
          <div className="bg-slate-300 h-6 rounded mb-4 w-3/4 dark:bg-slate-400 animate-pulse"></div>
          <div className="bg-slate-300 h-4 rounded mb-4 w-5/6 dark:bg-slate-400 animate-pulse"></div>
          <div className="bg-slate-300 h-4 rounded mb-4 w-2/3 dark:bg-slate-400 animate-pulse"></div>
          <div className="bg-slate-300 h-10 rounded mb-4 w-1/4 dark:bg-slate-400 animate-pulse"></div>
        </div>
      ))}
    </>
  );
}
