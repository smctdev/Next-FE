import { Metadata } from "next";
import SideBarChat from "../../components/SideBarChat";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { id } = await params;

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/users/for/seo/${id}`
  ).then((res) => res.json());

  return {
    title: `${data?.user?.name || id}`,
    description: `${data?.user?.name} ${data?.user?.address} ${data?.user?.jobTitle} ${data?.user?.bio}`,
    keywords: `${data?.user?.name} ${data?.user?.address} ${data?.user?.jobTitle} ${data?.user?.bio}`,
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
