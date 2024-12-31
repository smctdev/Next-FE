export const metadata = {
  title: {
    default: "Settings",
    template: "Blog App | %s",
  },
  description: "Blog app settings page. You can post and manage your settings",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
