export const metadata = {
  title: "Blog App | Profile",
  description:
    "User profile page showcasing personal details, bio, skills, and social links of me.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
