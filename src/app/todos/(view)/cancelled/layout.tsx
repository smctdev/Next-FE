export const metadata = {
  title: "Blog App | Todos | Cancelled",
  description:
    "Welcome to blog app todos page. You can post and manage your todos | Cancelled Todos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
