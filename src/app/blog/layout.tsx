export const metadata = {
  title: "Blog App | Blog Categories",
  description: "Welcome to blog app categories page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
