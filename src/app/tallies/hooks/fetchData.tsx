import { useState, useEffect } from "react";
import api from "../lib/axiosCall";

const useFetch = (url: any) => {
  const [data, setData] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isRefresh, setIsRefresh] = useState(false);

  useEffect(() => {
    if (!url) return;

    setLoading(true);
    setButtonLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        const response = await api.get(url);
        setData(response.data.data);
        setMeta(response.data.meta);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
        setButtonLoading(false);
      }
    };

    fetchData();
  }, [url, isRefresh]);

  return { data, loading, error, buttonLoading, setIsRefresh, meta };
};

export default useFetch;
