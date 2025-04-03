import axios from "axios";
import { useEffect, useState } from "react";

const usePreviewLink = (url: any, isRefresh: any) => {
  const [preview, setPreview] = useState<any>(null);
  const [previewData, setPreviewData] = useState<any>([]);
  useEffect(() => {
    if (!previewData && !isRefresh) return;
    const fetchPreview = async () => {
      try {
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`,
          { previewData }
        );
        setPreview(response?.data?.linkPreviews);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPreview();
  }, [previewData, isRefresh]);

  return {
    setPreviewData,
    preview,
  };
};

export default usePreviewLink;
