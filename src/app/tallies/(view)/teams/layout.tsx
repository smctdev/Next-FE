export const metadata = {
    title: "Teams",
    description: "This page is tallies list of all teams in NBA",
  };
  
  export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return <>{children}</>;
  }
  