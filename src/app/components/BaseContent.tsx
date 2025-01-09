"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SideBar from "./SideBar";
import DropUpButton from "./DropUpButton";

const BaseContent = ({ children }: any) => {
  const { hasHigherRole, hasNormalRole }: any = useAuth();
  const pathName = usePathname();

  const isChat = pathName.startsWith("/chat");

  if (isChat) {
    return <>{children}</>;
  }

  return (
    <>
      <DropUpButton />
      {hasHigherRole && <SideBar children={children} />}
      {hasNormalRole && (
        <>
          <Navbar />
          {children}
          <Footer />
        </>
      )}
    </>
  );
};

export default BaseContent;
