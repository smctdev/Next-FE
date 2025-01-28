import useMetaData from "@/app/hooks/MetaData";
import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { username } = await params;
  
  const data = await useMetaData(`users/profile/${username}`);

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
