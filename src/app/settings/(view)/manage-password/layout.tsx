export const metadata = {
  title: "Manage Password Settings",
  description: "Blog app manage password page. You can post and manage your password settings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
