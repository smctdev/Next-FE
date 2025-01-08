import { Metadata } from "next";

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
  return <>{children}</>;
}
