import useMetaData from "@/app/hooks/MetaData";
import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;

  const data: any = await useMetaData(`categories/${slug}`);

  return {
    title: `${data?.category?.categoryName || slug} posts`,
    description: data?.category?.description,
    keywords: `${data?.category?.slug}, ${data?.category?.categoryName}, ${data?.category?.categoryName}, ${data?.category?.description}`,
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
