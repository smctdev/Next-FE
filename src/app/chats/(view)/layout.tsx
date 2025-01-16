import { Metadata } from "next";
import { ConversationProvider } from "../context/conversationContext";

export const metadata: Metadata = {
  title: {
    default: "Chats",
    template: "Blog App | Chats | %s",
  },
  description:
    "Welcome to blog app chats there is many people you can chat with",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <ConversationProvider>{children}</ConversationProvider>
    </>
  );
}
