import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { username } = await params;

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/profile/${username}`
  ).then((res) => res.json());

  return {
    title: `${data?.name || username}`,
    description: `${data?.name} ${data?.address} ${data?.jobTitle} ${data?.bio}`,
    keywords: `${data?.name} ${data?.address} ${data?.jobTitle} ${data?.bio}`,
    authors: {
      name: "Allan Justine Mascariñas",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
