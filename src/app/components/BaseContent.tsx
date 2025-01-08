"use client";

import { usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import Footer from "./Footer";
import Navbar from "./Navbar";
import SideBar from "./SideBar";

const BaseContent = ({ children }: any) => {
  const { hasHigherRole, hasNormalRole }: any = useAuth();
  const pathName = usePathname();

  const isChat = pathName.startsWith("/chat");

  if (isChat) {
    return <>{children}</>;
  }

  if (hasHigherRole) {
    return (
      <>
        <SideBar children={children} />
      </>
    );
  }

  if (hasNormalRole) {
    return (
      <>
        <Navbar />
        {children}
        <Footer />
      </>
    );
  }
};

export default BaseContent;
