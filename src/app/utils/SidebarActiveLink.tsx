import Link from "next/link";
import { usePathname } from "next/navigation";

const ActiveLink = ({
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
        isActive
          ? "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white"
          : ""
      } flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group`}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
