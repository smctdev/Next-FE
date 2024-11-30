import Link from "next/link";
import { usePathname } from "next/navigation";

const ChildActiveLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const pathName = usePathname();

  const normalizePath = (path: string) => path.replace(/\/$/, "");

  const isActive =
    href === "/"
      ? pathName === href
      : normalizePath(pathName).startsWith(normalizePath(href));

  return (
    <Link
      href={href}
      className={`${
        isActive ? "bg-gray-200 dark:bg-gray-700 dark:text-white text-gray-700" : ""
      } flex items-center w-full p-2 text-gray-900 transition duration-75 rounded-lg pl-11 group hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700`}
    >
      {children}
    </Link>
  );
};

export default ChildActiveLink;
