export const metadata = {
  title: "Dashboard",
  description: "Welcome to Blog Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
