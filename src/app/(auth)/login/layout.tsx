export const metadata = {
  title: "Blog App | Login",
  description: "Login to the blog app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
