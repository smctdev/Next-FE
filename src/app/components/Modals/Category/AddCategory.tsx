import React, { Dispatch, SetStateAction, useState } from "react";

export default function AddCategory({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [slug, setSlug] = useState("");

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleCloseModal = () => {
    onClose(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg w-96 p-6 shadow-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Add New Category
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter category title"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter category description"
              rows={4}
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="slug"
            >
              Slug
            </label>
            <input
              type="text"
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter category slug"
              required
            />
          </div>

          <div className="flex justify-end space-x-1">
            <button
              type="button"
              onClick={handleCloseModal}
              className="text-gray-500 hover:text-gray-700 border-gray-500 px-3 border rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
