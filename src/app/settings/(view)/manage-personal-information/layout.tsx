export const metadata = {
  title: "Manage Personal Information Settings",
  description: "Blog app manage personal information page. You can post and manage your personal information settings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
