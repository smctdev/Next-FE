import { usePathname } from "next/navigation";
import formatMessages from "../utils/formatMessages";
import MessageBody from "./MessageBody";
// import useLinkPreview from "../hooks/useLinkPreview";
// import MessageLinkPreview from "./MessageLinkPreview";
import MessageBody2 from "./MessageBody2";
import { useEffect } from "react";
import Link from "next/link";

export default function ChatContent({
  content,
  sender,
  avatar,
  name,
  timeSent,
  messageId,
  preview,
  setPreviewData,
}: any) {
  const urlPattern =
    /\b(https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(?:\/[^\s]*)?|https?:\/\/(?:\d{1,3}\.){3}\d{1,3}(?::\d+)?(?:\/[^\s]*)?|(?<!@)\b[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b(?!@))\b/g;
  const contentFormat = content.match(urlPattern) || [];
  const link = contentFormat[0]?.startsWith("http")
    ? contentFormat[0]
    : contentFormat?.length !== 0
    ? `https://${contentFormat[0]}`
    : null;
  const pathname = usePathname();
  const message = formatMessages(content.trim(), 16, 16);
  const isIcon = content === "(y)";
  const isPublic = pathname === "/chats";

  useEffect(() => {
    if (!link) return;

    setPreviewData((prevUrls: any[]) => [...prevUrls, { link, messageId }]);
  }, [link, setPreviewData, messageId]);

  const getPreviewData = preview?.find(
    (item: any) => item.messageId === messageId
  );


  return (
    <div>
      {sender ? (
        <div>
          {/* Sent Message */}
          <MessageBody isIcon={isIcon} timeSent={timeSent} message={message} />
          {getPreviewData &&
            messageId === getPreviewData.messageId &&
            !getPreviewData.error &&
            getPreviewData.title && (
              <div className="flex justify-end">
                <Link className="" href={getPreviewData.url} target="_blank">
                  <div className="border rounded-md border-gray-300/80 shadow-md dark:border-gray-600/80 bg-gray-700/10 dark:bg-gray-200/10 hover:dark:bg-gray-200/20 hover:bg-gray-700/20">
                    {getPreviewData?.images?.length > 0 && (
                      <img
                        src={getPreviewData.images[0]}
                        alt={getPreviewData.title}
                        className="w-[230px] md:w-72 h-40 object-contain rounded-md"
                      />
                    )}
                    <div className="w-[230px] md:w-72 flex flex-col border-t bg-gray-100 dark:bg-gray-900/20">
                      <span
                        className="p-2 text-md font-bold truncate"
                        title={getPreviewData.title === "Error" ? getPreviewData.url : getPreviewData.title}
                      >
                        {getPreviewData.title === "Error" ? getPreviewData.url : getPreviewData.title}
                      </span>
                      <span
                        className="p-2 text-sm font-semi-bold truncate"
                        title={getPreviewData.url}
                      >
                        {getPreviewData.url}
                      </span>
                      <span
                        className="p-2 text-xs font-thin truncate"
                        title={getPreviewData.description}
                      >
                        {getPreviewData.description}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )}
        </div>
      ) : (
        <div>
          {/* Received Message */}
          <MessageBody2
            avatar={avatar}
            name={name}
            isPublic={isPublic}
            isIcon={isIcon}
            timeSent={timeSent}
            message={message}
          />
          {getPreviewData &&
            messageId === getPreviewData.messageId &&
            !getPreviewData.error &&
            getPreviewData.title && (
              <div className="flex justify-start ml-12">
                <Link className="" href={getPreviewData.url} target="_blank">
                  <div className="border rounded-md border-gray-300/80 shadow-md dark:border-gray-600/80 bg-gray-700/10 dark:bg-gray-200/10 hover:dark:bg-gray-200/20 hover:bg-gray-700/20">
                    {getPreviewData?.images?.length > 0 && (
                      <img
                        src={getPreviewData.images[0]}
                        alt={getPreviewData.title}
                        className="w-[230px] md:w-72 h-40 object-contain rounded-md"
                      />
                    )}
                    <div className="w-[230px] md:w-72 flex flex-col border-t bg-gray-100 dark:bg-gray-900/20">
                      <span
                        className="p-2 text-md font-bold truncate"
                        title={getPreviewData.title === "Error" ? getPreviewData.url : getPreviewData.title}
                      >
                        {getPreviewData.title === "Error" ? getPreviewData.url : getPreviewData.title}
                      </span>
                      <span
                        className="p-2 text-sm font-semi-bold truncate"
                        title={getPreviewData.url}
                      >
                        {getPreviewData.url}
                      </span>
                      <span
                        className="p-2 text-xs font-thin truncate"
                        title={getPreviewData.description}
                      >
                        {getPreviewData.description}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )}
        </div>
      )}
    </div>
  );
}
