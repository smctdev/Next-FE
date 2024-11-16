export const metadata = {
  title: "Blog App | Tallies",
  description: "This page is tallies schedules in NBA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
