import dateWithTime from "../utils/dateWithTime";

export default function MessageBody({ isIcon, timeSent, message }: any) {
  return (
    <div className="flex justify-end group">
      <div className="justify-center flex mr-1 items-center">
        <div className="group-hover:block hidden">
          <button className="px-3.5 py-1 hover:dark:bg-gray-600 hover:bg-gray-200 rounded-full">
            <i className="far fa-ellipsis-vertical"></i>
          </button>
        </div>
      </div>
      <div
        className={`xl:max-w-4xl 2xl:max-w-7xl sm:max-w-lg md:mx-w-xl lg:max-w-2xl max-w-[230px] ${
          !isIcon && "dark:bg-blue-400/50 bg-blue-400/80 shadow-md"
        } text-white p-3 rounded-2xl`}
        title={timeSent && dateWithTime(timeSent)}
      >
        <p className="text-sm whitespace-break-spaces break-words">{message}</p>
      </div>
    </div>
  );
}
