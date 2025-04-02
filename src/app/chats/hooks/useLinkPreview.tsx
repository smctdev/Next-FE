import axios from "axios";
import { useEffect, useState } from "react";
const previewCache = new Map();

const useLinkPreview = (linkUrl: string) => {
  const [previewData, setPreviewData] = useState<any>(null);
  useEffect(() => {
    if (!linkUrl || previewCache.has(linkUrl)) {
      setPreviewData(previewCache.get(linkUrl) || null);
      return;
    }
    const fetchUrlPreview = async () => {
      try {
        const response = await axios.get(
          `/api/link-preview?url=${encodeURIComponent(linkUrl)}`
        );
        setPreviewData(response.data);
      } catch (error) {
        console.error(error);
        setPreviewData(null);
      }
    };

    fetchUrlPreview();
  }, [linkUrl]);

  return { previewData };
};

export default useLinkPreview;
