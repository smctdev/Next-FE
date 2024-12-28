export default function ({ error, label, ...props }: any) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium" htmlFor={label}>
        <span className="capitalize">{label}</span>
      </label>
      <textarea
        {...props}
        className={`mt-1 block w-full px-3 py-2 border dark:bg-gray-900 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
          error && "border-red-500"
        }`}
      />
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
}
