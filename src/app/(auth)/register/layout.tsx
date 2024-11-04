export const metadata = {
  title: "Blog App | Register",
  description: "Register to the blog app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
