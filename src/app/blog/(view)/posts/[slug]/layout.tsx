import { Metadata } from "next";

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const { slug } = await params;

  const data = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/categories/${slug}`
  ).then((res) => res.json());

  return {
    title: `${data.category?.categoryName} posts`,
    description: data.category.description,
    keywords: `${data.category.slug}, ${data.category.categoryName}, ${data.category.categoryName}, ${data.category.description}`,
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
