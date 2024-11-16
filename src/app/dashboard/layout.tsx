export const metadata = {
  title: "Blog App | Dashboard",
  description: "Welcome to Blog Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
