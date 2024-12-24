import api from "@/app/lib/axiosCall";
import { Dispatch, SetStateAction, useState } from "react";
import { PostValidationType } from "../../types/PostValidationType";
import useToastr from "../../hooks/Toastr";

export default function AddPost({
  isOpen,
  onClose,
  setIsRefresh,
  postModalRef,
  modalRef,
  categories,
  categoriesLoading,
}: any) {
  const [image, setImage] = useState<File[]>([]);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number | any>("");
  const [error, setError] = useState<PostValidationType | any>("");
  const [loading, setLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const { showSuccess } = useToastr();

  if (!isOpen) {
    return null;
  }

  const handleCloseModal = () => {
    onClose(false);
    setError("");
    setTitle("");
    setDescription("");
    setCategoryId("");
    setImage([]);
    setImageError("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsRefresh(true);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("categoryId", String(categoryId));
      image.forEach((img) => {
        formData.append("image", img);
      });

      const response = await api.post("/posts/create-post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        handleCloseModal();
        showSuccess(response.data.message, "Post Added");
      }
    } catch (error: any) {
      setError(error.response.data);
      setImageError(error?.response.data.message);
      console.error(error);
    } finally {
      setIsRefresh(false);
      setLoading(false);
    }
  };

  const handleFileChange = (e: any) => {
    const files = e.target.files;
    if (files) {
      setImage((prev: any) => [...prev, ...Array.from(files)]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setImage((prev: any) => prev.filter((_: any, i: number) => i !== index));
  };

  const handleCancelUpload = () => {
    setImage([]);
    setImageError("");
  };

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
        <div
          ref={postModalRef || modalRef}
          className="p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg w-full mx-3 md:w-1/3 relative"
        >
          <div className="flex justify-between">
            <div>
              <h2 className="text-lg font-bold">Add Post</h2>
            </div>
            <div>
              <button
                type="button"
                className="absolute right-4 top-3 bg-gray-400 bg-opacity-75 px-2 py-0.5 rounded-full hover:scale-95 transition-all duration-300 ease-in-out hover:bg-gray-500 hover:bg-opacity-75"
                onClick={handleCloseModal}
              >
                <i className="far fa-xmark text-black dark:text-white"></i>
              </button>
            </div>
          </div>
          <hr />
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-sm font-medium" htmlFor="category">
                  Select Category
                </label>
                <select
                  onChange={(e) => setCategoryId(Number(e.target.value))}
                  name="category"
                  value={categoryId}
                  className="block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:shadow-outline focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" hidden>
                    Select Category
                  </option>
                  <option value="" disabled>
                    Select Category
                  </option>
                  {categoriesLoading ? (
                    <option value="Loading...">Loading...</option>
                  ) : (
                    categories.map((category: any) => (
                      <option key={category.id} value={category.id}>
                        {category.categoryName}
                      </option>
                    ))
                  )}
                </select>
                {error?.categoryId && (
                  <small className="text-red-500">
                    {error?.categoryId.message}
                  </small>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium" htmlFor="image">
                  Image
                </label>
                <button
                  type="button"
                  className="w-full py-2 border border-gray-300 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-sm focus:outline-none focus:shadow-outline focus:ring-blue-500 focus:border-blue-500"
                  onClick={() => document.getElementById("image")?.click()}
                >
                  <i className="far fa-upload"></i> Upload Image
                </button>
                <input
                  hidden
                  accept="image/*"
                  className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-blue-500 focus:border-blue-500"
                  id="image"
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  placeholder="Image"
                />
                {error?.image && (
                  <small className="text-red-500">{error?.image.message}</small>
                )}
                {(imageError?.includes(
                  "Invalid image type, only jpeg, jpg, png, gif, ico, webp are allowed."
                ) ||
                  imageError?.includes("File too large") ||
                  imageError?.includes(
                    "File too large, only 1MB is allowed."
                  )) && <small className="text-red-500">{imageError}</small>}

                {image.length > 0 && (
                  <div className="mt-2">
                    <button
                      type="button"
                      onClick={handleCancelUpload}
                      className="mb-2 text-blue-500 hover:underline"
                    >
                      Cancel upload
                    </button>
                    <div className="flex gap-2 w-full overflow-x-auto">
                      {image.map((image: any, index: number) => (
                        <div key={index}>
                          <div className="relative group w-20 h-20">
                            <img
                              src={URL.createObjectURL(image)}
                              alt={`Preview ${image.name}`}
                              className="w-full h-full object-cover rounded"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="text-sm absolute inset-0 m-auto text-white bg-black bg-opacity-50 p-2 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                              Remove
                            </button>
                          </div>
                          <p className="w-20 truncate">
                            <small>{image.name}</small>
                          </p>
                          <p>
                            <small>{(image.size / 1024).toFixed(2)} KB</small>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium" htmlFor="title">
                  Title
                </label>
                <input
                  onChange={(e) => setTitle(e.target.value)}
                  className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-blue-500 focus:border-blue-500"
                  id="title"
                  type="text"
                  placeholder="Title"
                  value={title}
                />
                {error?.title && (
                  <small className="text-red-500">{error?.title.message}</small>
                )}
              </div>
              <div>
                <label
                  className="block text-sm font-medium"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  onChange={(e) => setDescription(e.target.value)}
                  className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-blue-500 focus:border-blue-500"
                  id="description"
                  placeholder="Description"
                  value={description}
                />
                {error?.description && (
                  <small className="text-red-500">
                    {error?.description.message}
                  </small>
                )}
              </div>
            </div>
            <div>
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-sm hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  <i className="far fa-xmark"></i> Close
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm hover:scale-105 transition-all duration-300 ease-in-out"
                >
                  {loading ? (
                    <>
                      <i className="far fa-spinner animate-spin"></i> Posting...
                    </>
                  ) : (
                    <>
                      <i className="far fa-paper-plane"></i> Post
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
