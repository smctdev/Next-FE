export const metadata = {
  title: "Todos",
  description:
    "Welcome to blog app todos page. You can post and manage your todos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
