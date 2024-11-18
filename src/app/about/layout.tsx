export const metadata = {
  title: "Blog App | About",
  description: "Welcome to Blog About see all what we offer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
