export const metadata = {
  title: "Blog App | Success Login",
  description: "Login success",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
