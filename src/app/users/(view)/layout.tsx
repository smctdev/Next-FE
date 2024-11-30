export const metadata = {
  title: "Blog App | Users",
  description:
    "Welcome to blog app users page. You can post and manage your users",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
