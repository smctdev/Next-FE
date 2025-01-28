import { useState, useEffect } from "react";
import api from "../../lib/axiosCall";

const useFetch = (url: any, isRefresh: boolean, isPaginated: boolean) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (!url) return;
    setError(null);
    const fetchData = async () => {
      try {
        const params: any = {};

        if (isPaginated) {
          params.skip = currentPage;
          params.take = itemsPerPage;
        }
        const response = await api.get(url, {
          params,
        });
        setData(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, isRefresh, currentPage]);

  return { data, loading, error, setCurrentPage, currentPage, itemsPerPage };
};

export default useFetch;
