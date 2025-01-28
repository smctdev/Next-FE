import axios from "axios";

const useMetaData = async (url: any) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`
    );
    return response.data;
  } catch (error: any) {
    console.error(error);
  }
};

export default useMetaData;
