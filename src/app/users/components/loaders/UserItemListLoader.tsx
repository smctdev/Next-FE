export default function UserItemListLoader() {
  return (
    <>
      {Array.from(Array(7)).map((_, index) => (
        <tr key={index}>
          <td colSpan={7} className="py-2 px-5">
            <p
              className="w-full h-12 rounded-md bg-slate-300 dark:bg-slate-400 animate-pulse"
              style={{
                animationDelay: `${index * 0.2}s`,
              }}
            ></p>
          </td>
        </tr>
      ))}
    </>
  );
}
