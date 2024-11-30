export const metadata = {
  title: "Blog App | Todos | Ongoing",
  description:
    "Welcome to blog app todos page. You can post and manage your todos | Ongoing Todos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
