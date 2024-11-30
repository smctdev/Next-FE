export default function SingleStatusLoader() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className={`group overflow-hidden h-48 text-white dark:bg-slate-700 bg-slate-600 rounded-md p-4 w-full hover:h-auto shadow-xl border border-t-[15px] border-t-slate-500 ${
            index === 0 ? "mt-2" : "-mt-16"
          }`}
        >
          <h2 className="text-1xl -mt-3 truncate font-bold mb-2 h-5 w-48 bg-slate-300 dark:bg-slate-400 animate-pulse"></h2>
          <hr />
          <p className="mt-2 w-48 bg-slate-300 dark:bg-slate-400 h-3 animate-pulse"></p>
          <p className="mt-2 w-40 bg-slate-300 dark:bg-slate-400 h-3 animate-pulse"></p>
          <p className="mt-2 w-44 bg-slate-300 dark:bg-slate-400 h-3 animate-pulse"></p>
        </div>
      ))}
    </>
  );
}
