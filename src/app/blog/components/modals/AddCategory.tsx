import api from "@/app/lib/axiosCall";
import React, { Dispatch, SetStateAction, useState } from "react";
import { CategoryType } from "../../types/CategoryTypes";
import useToastr from "../../hooks/Toastr";

export default function AddCategory({
  isOpen,
  onClose,
  setIsRefresh,
  modalRef,
}: {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  setIsRefresh: Dispatch<SetStateAction<boolean>>;
  modalRef: any;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");
  const [error, setError] = useState<CategoryType | any>("");
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useToastr();

  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRefresh(true);
    setLoading(true);
    try {
      const response = await api.post("/categories/create-category", {
        categoryName: title,
        description: description,
        slug: slug,
      });
      if (response.status === 201) {
        handleCloseModal();
        showSuccess(response.data.categoryName, response.statusText);
      }
    } catch (error: any) {
      console.error("Error submitting categories", error);
      setError(error.response.data);
      if (error.response.status === 429) {
        showError(error.response.statusText, "Error");
      }
    } finally {
      setIsRefresh(false);
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setError("");
    onClose(false);
    setTitle("");
    setDescription("");
    setSlug("");
    setError("");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div
        ref={modalRef}
        className="bg-white relative dark:bg-gray-900 rounded-lg w-1/3 p-6 shadow-md transition duration-300 ease-in-out"
      >
        <div className="flex justify-between">
          <div>
            <h2 className="text-lg font-bold">Add Category</h2>
          </div>
          <div>
            <button
              type="button"
              className="absolute right-4 top-3"
              onClick={handleCloseModal}
            >
              <i className="far fa-xmark text-black dark:text-white"></i>
            </button>
          </div>
        </div>
        <hr />
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-sm font-medium" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter category title"
            />
            {error.categoryName && (
              <span className="text-sm text-red-500">
                {error.categoryName.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border dark:bg-gray-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter category description"
              rows={4}
            />
            {error.description && (
              <span className="text-sm text-red-500">
                {error.description.message}
              </span>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium" htmlFor="slug">
              Slug
            </label>
            <input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="mt-1 block w-full px-3 dark:bg-gray-900 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter category slug"
            />
            {error.slug && (
              <span className="text-sm text-red-500">{error.slug.message}</span>
            )}
          </div>

          <div className="flex justify-end space-x-1">
            <button
              type="button"
              onClick={handleCloseModal}
              className="hover border-gray-500 text-sm px-3 border rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-sm text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {loading ? (
                <>
                  <i className="far fa-spinner animate-spin"></i> Submiting...
                </>
              ) : (
                <>
                  <i className="far fa-save"></i> Submit
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
