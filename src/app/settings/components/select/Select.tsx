export default function Select({ label, error, ...props }: any) {
  return (
    <div className="mb-4">
      <label className="block font-medium text-sm">{label}</label>
      <select
        {...props}
        className={`mt-1 block w-full px-3 py-2 border border-gray-300 dark:bg-gray-900 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 ${
          error && "border-red-500"
        }`}
      >
        <option value="" hidden>
          {label}
        </option>
        <option value="" disabled>
          {label}
        </option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="NonBinary">Non binary</option>
        <option value="Other">Other</option>
        <option value="PreferNotToSay">Prefer not to say</option>
      </select>
      {error && <small className="text-red-500">{error}</small>}
    </div>
  );
}
