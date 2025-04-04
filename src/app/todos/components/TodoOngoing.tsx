import useFetch from "../hooks/fetchData";
import SingleStatusLoader from "./loaders/SingleStatusLoader";

export default function TodoOngoing({
  isSingleStatusRefresh,
  handleDeleteTodo,
  handleStatusUpdate,
}: any) {
  const { data, loading }: any = useFetch("/todos/status/ongoing", isSingleStatusRefresh);

  return (
    <>
      {loading ? (
        <SingleStatusLoader />
      ) : (
        <>
          {data?.todo?.length > 0 ? (
            data.todo.map((item: any, index: number) => (
              <div key={index}>
                <div
                  className={`group overflow-hidden h-48 text-white bg-blue-400 rounded-md p-4 w-full hover:scale-[1.15] hover:h-auto hover:z-50 shadow-xl border border-t-[15px] border-t-blue-500 ${
                    index === 0 ? "mt-2" : "-mt-28"
                  }`}
                >
                  <h2 className="text-1xl -mt-3 truncate font-bold mb-2">
                    {item.title}
                  </h2>
                  <button
                    type="button"
                    onClick={() => handleDeleteTodo(item.id)}
                    className="text-red-500 absolute top-1 right-3 hover:scale-110 transition-all duration-100 ease-in-out"
                  >
                    <i className="fas fa-trash text-1xl"></i>
                  </button>
                  <hr />
                  <p className="mt-2 break-words whitespace-break-spaces">{item.content}</p>
                  <div className="flex justify-center gap-4 mt-5">
                    <button
                      type="button"
                      onClick={() => handleStatusUpdate(item.id, "pending")}
                      className="hidden group-hover:block hover:-translate-y-1 transition-all duration-300 ease-in-out"
                    >
                      <i className="far fa-history rounded-full border-red-500 bg-red-500 hover:bg-red-600 text-white border p-2 text-xs"></i>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatusUpdate(item.id, "done")}
                      className="hidden group-hover:block hover:-translate-y-1 transition-all duration-300 ease-in-out"
                    >
                      <i className="far fa-check-double rounded-full border-blue-900 bg-blue-800 hover:bg-blue-900 text-white border p-2 text-xs"></i>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleStatusUpdate(item.id, "cancelled")}
                      className="hidden group-hover:block hover:-translate-y-1 transition-all duration-300 ease-in-out"
                    >
                      <i className="far fa-ban rounded-full border-red-900 bg-red-800 hover:bg-red-900 text-white border p-2 text-xs"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-5">
              <p className="text-center text-1xl font-bold">No ongoing tasks</p>
            </div>
          )}
        </>
      )}
    </>
  );
}
