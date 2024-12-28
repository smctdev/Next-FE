export const metadata = {
  title: {
    default: "Schedules",
    template: "Blog App | %s",
  },
  description: "This page is tallies schedules in NBA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
