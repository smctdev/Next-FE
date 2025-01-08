export default function Content() {
  return (
    <>
      {/* Sent Message */}
      <div className="flex justify-end">
        <div className="xl:max-w-4xl md:max-w-2xl max-w-xs p-3 rounded-3xl bg-slate-300 dark:bg-slate-400 animate-pulse w-52 h-10 shadow-md"></div>
      </div>
      {/* Received Message */}
      <div className="flex justify-start gap-2">
        <div className="flex flex-col justify-end">
          <div className="w-10 h-10 bg-slate-300 dark:bg-slate-400 animate-pulse rounded-full"></div>
        </div>
        <div className="xl:max-w-4xl md:max-w-2xl max-w-xs bg-slate-300 dark:bg-slate-400 animate-pulse w-72 h-10 p-3 rounded-3xl shadow-md"></div>
      </div>
      <div className="flex justify-start gap-2">
        <div className="flex flex-col justify-end">
          <div className="w-10 h-10 bg-slate-300 dark:bg-slate-400 animate-pulse rounded-full"></div>
        </div>
        <div className="xl:max-w-4xl md:max-w-2xl max-w-xs bg-slate-300 dark:bg-slate-400 animate-pulse w-96 h-10 p-3 rounded-3xl shadow-md"></div>
      </div>
      <div className="flex justify-end">
        <div className="xl:max-w-4xl md:max-w-2xl max-w-xs p-3 rounded-3xl bg-slate-300 dark:bg-slate-400 animate-pulse w-44 h-10 shadow-md"></div>
      </div>
      <div className="flex justify-end">
        <div className="xl:max-w-4xl md:max-w-2xl max-w-xs p-3 rounded-3xl bg-slate-300 dark:bg-slate-400 animate-pulse w-72 h-10 shadow-md"></div>
      </div>
      <div className="flex justify-start gap-2">
        <div className="flex flex-col justify-end">
          <div className="w-10 h-10 bg-slate-300 dark:bg-slate-400 animate-pulse rounded-full"></div>
        </div>
        <div className="xl:max-w-4xl md:max-w-2xl max-w-xs bg-slate-300 dark:bg-slate-400 animate-pulse w-72 h-10 p-3 rounded-3xl shadow-md"></div>
      </div>
      <div className="flex justify-start gap-2">
        <div className="flex flex-col justify-end">
          <div className="w-10 h-10 bg-slate-300 dark:bg-slate-400 animate-pulse rounded-full"></div>
        </div>
        <div className="xl:max-w-4xl md:max-w-2xl max-w-xs bg-slate-300 dark:bg-slate-400 animate-pulse w-60 h-10 p-3 rounded-3xl shadow-md"></div>
      </div>
      <div className="flex justify-start gap-2">
        <div className="flex flex-col justify-end">
          <div className="w-10 h-10 bg-slate-300 dark:bg-slate-400 animate-pulse rounded-full"></div>
        </div>
        <div className="xl:max-w-4xl md:max-w-2xl max-w-xs bg-slate-300 dark:bg-slate-400 animate-pulse w-80 h-10 p-3 rounded-3xl shadow-md"></div>
      </div>
    </>
  );
}
