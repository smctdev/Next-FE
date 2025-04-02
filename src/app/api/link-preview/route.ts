import ogs from "open-graph-scraper";

export async function GET(request: any) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return new Response(JSON.stringify({ error: "No URL provided" }), {
      status: 400,
    });
  }

  try {
    const { result }: any = await ogs({ url });

    const { ogTitle, ogImage, ogDescription, requestUrl } = result;

    return new Response(
      JSON.stringify({
        title: ogTitle || "",
        description: ogDescription || "",
        requestUrl: requestUrl || "",
        image: ogImage || "",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to fetch link preview" }),
      { status: 500 }
    );
  }
}
