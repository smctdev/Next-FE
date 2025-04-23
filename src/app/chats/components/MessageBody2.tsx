import dateWithTime from "../utils/dateWithTime";
import Image from "./images/Image";

export default function MessageBody2({
  avatar,
  name,
  isPublic,
  isIcon,
  timeSent,
  message,
}: any) {
  return (
    <div className="flex justify-start gap-2 group">
      <div className="flex flex-col justify-end">
        <Image avatar={avatar} alt={name} width={10} height={10} title={name} />
      </div>
      <div>
        {isPublic && <p className="text-sm font-semibold">{name}</p>}
        <div className="flex">
          <div
            className={`xl:max-w-4xl 2xl:max-w-7xl sm:max-w-lg md:mx-w-xl lg:max-w-2xl max-w-[230px] w-fit ${
              !isIcon && "bg-gray-500/65 shadow-md"
            } text-white p-3 rounded-2xl`}
            title={timeSent && dateWithTime(timeSent)}
          >
            <p className="text-sm whitespace-break-spaces break-words">
              {message}
            </p>
          </div>
          <div className="justify-center flex ml-1 items-center">
            <div className="group-hover:block hidden">
              <button className="px-3.5 py-1 hover:dark:bg-gray-600 hover:bg-gray-200 rounded-full">
                <i className="far fa-ellipsis-vertical"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
