export const metadata = {
  title: "Blog App | Todos | Pending",
  description:
    "Welcome to blog app todos page. You can post and manage your todos | Pending Todos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
