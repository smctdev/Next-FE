import useMetaData from "@/app/lib/MetaData";
import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { id } = await params;

  const data = await useMetaData(`users/for/seo/${id}`);

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
