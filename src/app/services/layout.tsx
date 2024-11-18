export const metadata = {
  title: "Blog App | Services",
  description: "Welcome to Blog Services we offer more exciting services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
