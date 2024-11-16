import Link from "next/link";
import { useRouter } from "next/navigation";

const ActiveLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const router: any = useRouter();

  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      className={`${
        isActive
          ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 md:dark:text-blue-500"
          : ""
      } block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700`}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
