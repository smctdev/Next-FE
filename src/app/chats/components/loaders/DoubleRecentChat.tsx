export default function DoubleRecentChat() {
  return (
    <>
      {Array.from(Array(2)).map((_, index: any) => (
        <div
          className="flex items-center p-2 rounded-lg cursor-progress md:mx-3"
          key={index}
        >
          <div
            className="w-14 h-14 bg-slate-300 dark:bg-slate-400 animate-pulse rounded-full mx-auto md:mx-0"
            style={{
              animationDelay: `${index * 0.2}s`,
            }}
          ></div>
          <div className="ml-3 hidden md:block">
            <p
              className={`text-md font-semibold w-${
                index % 2 === 0 ? "44" : "32"
              } rounded-md mb-2 h-6 bg-slate-300 dark:bg-slate-400 animate-pulse`}
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            ></p>
            <p
              className="text-xs text-gray-500 dark:text-gray-100 rounded-md w-14 h-4 bg-slate-300 dark:bg-slate-400 animate-pulse"
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            ></p>
          </div>
        </div>
      ))}
    </>
  );
}
