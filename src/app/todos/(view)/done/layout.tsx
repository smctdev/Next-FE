export const metadata = {
  title: "Todos | Done",
  description:
    "Welcome to blog app todos page. You can post and manage your todos | Done Todos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
