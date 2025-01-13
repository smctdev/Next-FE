import { useState, useEffect } from "react";
import api from "../../lib/axiosCall";

const useFetch = (url: any, isRefresh: boolean, isPaginated: boolean) => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingOnTake, setLoadingOnTake] = useState(false);
  const [error, setError] = useState(null);
  const [addTake, setAddTake] = useState(0);
  const defaultTake = 20;

  useEffect(() => {
    if (!url) return;
    setError(null);
    if (addTake) {
      setLoadingOnTake(true);
    }
    const fetchData = async () => {
      const params: any = {};

      if (isPaginated) {
        params.take = defaultTake + addTake;
      }

      try {
        const response = await api.get(url, {
          params,
        });
        setData(response.data);
      } catch (err: any) {
        setError(err);
      } finally {
        setLoading(false);

        if (addTake) {
          setLoadingOnTake(false);
        }
      }
    };

    fetchData();
  }, [url, isRefresh, addTake]);

  return { data, loading, error, setAddTake, loadingOnTake };
};

export default useFetch;
