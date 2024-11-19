export const metadata = {
  title: "Blog App | Blog",
  description: "Welcome to blog app there is many categories to pick what blogs you want page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
