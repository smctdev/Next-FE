export const metadata = {
  title: "Blog App | Tallies",
  description: "Welcome to Tallies page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
