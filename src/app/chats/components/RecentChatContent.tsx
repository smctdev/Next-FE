import Link from "next/link";
import Image from "./images/Image";
import dateFormat from "../utils/dateFormat";
import formatEmojis from "../utils/formatEmojis";

export default function RecentChatContent({
  user,
  lastMessage,
  timeSent,
}: any) {
  const message = formatEmojis(lastMessage, 4, 4);
  return (
    <Link href={`/chats/${user?.id}`}>
      <div className="flex items-center mt-2 p-2 rounded-lg cursor-pointer hover:dark:bg-gray-600 hover:bg-gray-100 md:mx-3">
        <Image
          avatar={user?.profile_pictures[0]?.avatar}
          alt={user?.name}
          width={14}
          height={14}
        />
        <div className="ml-3 hidden md:block">
          <p className="text-md font-semibold truncate max-w-44">
            {user?.name}
          </p>
          <div className="flex gap-1 max-w-44">
            <div className="text-gray-500 dark:text-gray-100 sm:max-w-40">
              <p className="text-xs truncate">{message}</p>
            </div>
            {timeSent && (
              <span className="text-xs">
                •<span className="ml-1 text-xs">{dateFormat(timeSent)}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
