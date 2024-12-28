import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { id } = await params;

  const token = "0c5c5dbe-c251-427e-baae-bc88ce765578";

  const data = await fetch(`https://api.balldontlie.io/v1/games/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  }).then((res) => res.json());

  const title = `${data.data.home_team.full_name} vs ${data.data.visitor_team.full_name}`;

  return {
    title: title,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
