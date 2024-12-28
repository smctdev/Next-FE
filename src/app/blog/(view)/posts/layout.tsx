import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Posts",
    template: "Blog App | %s",
  },
  description: "Welcome to blog app posts there is many posts to explore.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
