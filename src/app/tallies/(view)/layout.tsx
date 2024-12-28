export const metadata = {
  title: {
    default: "Tallies",
    template: "Blog App | %s"
  },
  description: "Welcome to Tallies page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
