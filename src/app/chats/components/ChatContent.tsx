import { usePathname } from "next/navigation";
import dateWithTime from "../utils/dateWithTime";
import formatEmojis from "../utils/formatEmojis";
import Image from "./images/Image";

export default function ChatContent({
  content,
  sender,
  avatar,
  name,
  timeSent,
}: any) {
  const pathName = usePathname();
  const message = formatEmojis(content, 16, 16);
  const isIcon = content === "(y)";

  const isPublic = pathName === "/chats";

  return (
    <div>
      {sender ? (
        <>
          {/* Sent Message */}
          <div className="flex justify-end">
            <div
              className={`xl:max-w-4xl 2xl:max-w-7xl sm:max-w-lg md:mx-w-xl lg:max-w-2xl max-w-[230px] ${
                !isIcon && "bg-blue-500 shadow-md"
              } text-white p-3 rounded-2xl`}
            >
              <p
                className="text-sm whitespace-break-spaces break-words"
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
              <Image
                avatar={avatar}
                alt={name}
                width={10}
                height={10}
                title={name}
              />
            </div>
            <div>
              {isPublic && <p className="text-sm font-semibold">{name}</p>}
              <div
                className={`xl:max-w-4xl 2xl:max-w-7xl sm:max-w-lg md:mx-w-xl lg:max-w-2xl max-w-[230px] w-fit ${
                  !isIcon && "bg-gray-200 shadow-md"
                } text-gray-800 p-3 rounded-2xl`}
              >
                <p
                  className="text-sm whitespace-break-spaces break-words"
                  title={timeSent && dateWithTime(timeSent)}
                >
                  {message}
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
