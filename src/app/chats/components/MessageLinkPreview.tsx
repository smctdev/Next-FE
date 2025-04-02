const MessageLinkPreview = ({ preview }: any) => {
  if (!preview) return null;

  return (
    <a
      href={preview.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block left-0 max-w-md border rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
    >
      {preview.image && (
        <span className="h-40 w-full relative">
          <img
            src={
              preview.image[0]?.url?.startsWith("/")
                ? `${preview?.requestUrl}/${preview.image[0]?.url}`
                : preview.image[0]?.url
            }
            alt={preview.title || "Preview image"}
            className="rounded-t-lg"
          />
        </span>
      )}
      <span className="p-4 bg-white">
        <span className="text-lg font-semibold text-gray-900 truncate">
          {preview.title || "No title available"}
        </span>
        <span className="text-sm text-gray-600 truncate">
          {preview.description || "No description available"}
        </span>
        <span className="text-xs text-blue-600 mt-2 block truncate">
          {preview.url}
        </span>
      </span>
    </a>
  );
};

export default MessageLinkPreview;
