import dateWithTime from "../utils/dateWithTime";
import Image from "./images/Image";

export default function ChatContent({
  content,
  sender,
  avatar,
  name,
  timeSent,
}: any) {
  const message =
    content === "(y)" ? (
      <img src="https://cdn.jsdelivr.net/npm/emoji-datasource-apple/img/apple/64/1f44d.png" />
    ) : (
      content
    );
  const isIcon = content === "(y)";

  return (
    <div>
      {sender ? (
        <>
          {/* Sent Message */}
          <div className="flex justify-end">
            <div
              className={`xl:max-w-4xl sm:max-w-lg md:mx-w-xl lg:max-w-2xl max-w-xs ${
                !isIcon && "bg-blue-500 shadow-md"
              } text-white p-3 rounded-2xl`}
            >
              <p
                className="text-sm whitespace-break-spaces break-all"
                title={timeSent && dateWithTime(timeSent)}
              >
                {message}
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Received Message */}
          <div className="flex justify-start gap-2">
            <div className="flex flex-col justify-end">
              <Image avatar={avatar} alt={name} width={10} height={10} />
            </div>
            <div
              className={`xl:max-w-4xl sm:max-w-lg md:mx-w-xl lg:max-w-2xl max-w-xs ${
                !isIcon && "bg-gray-200 shadow-md"
              } text-gray-800 p-3 rounded-2xl`}
            >
              <p
                className="text-sm whitespace-break-spaces break-all"
                title={timeSent && dateWithTime(timeSent)}
              >
                {message}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
