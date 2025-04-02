import { usePathname } from "next/navigation";
import formatMessages from "../utils/formatMessages";
import MessageBody from "./MessageBody";
// import useLinkPreview from "../hooks/useLinkPreview";
// import MessageLinkPreview from "./MessageLinkPreview";
import MessageBody2 from "./MessageBody2";

export default function ChatContent({
  content,
  sender,
  avatar,
  name,
  timeSent,
}: any) {
  // const urlPattern =
  //   /\b(https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(?:\/[^\s]*)?|https?:\/\/(?:\d{1,3}\.){3}\d{1,3}(?::\d+)?(?:\/[^\s]*)?|(?<!@)\b[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b(?!@))\b/g;
  // const contentFormat = content.match(urlPattern) || [];
  // const link = contentFormat[0]?.startsWith("http")
  //   ? contentFormat[0]
  //   : contentFormat?.length !== 0
  //   ? `https://${contentFormat[0]}`
  //   : null;
  const pathname = usePathname();
  const message = formatMessages(content.trim(), 16, 16);
  const isIcon = content === "(y)";
  const isPublic = pathname === "/chats";
  // const { previewData }: any = useLinkPreview(link && link);

  return (
    <div>
      {sender ? (
        <>
          {/* Sent Message */}
          <MessageBody isIcon={isIcon} timeSent={timeSent} message={message} />

          {/* {previewData && <MessageLinkPreview preview={previewData} />} */}
        </>
      ) : (
        <>
          {/* Received Message */}
          <MessageBody2
            avatar={avatar}
            name={name}
            isPublic={isPublic}
            isIcon={isIcon}
            timeSent={timeSent}
            message={message}
          />
        </>
      )}
    </div>
  );
}
