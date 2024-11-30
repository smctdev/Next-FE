export const metadata = {
  title: "Blog App | Tallies Schedules",
  description: "This page is tallies schedules in NBA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
