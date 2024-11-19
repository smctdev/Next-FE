"use client";

import { useAuth } from "../context/AuthContext";
import Navbar from "./Navbar";
import SideBar from "./SideBar";

const BaseContent = ({ children }: any) => {
  const { userRoles }: any = useAuth();

  const hasHigherRole = userRoles?.some((role: any) =>
    ["superadmin", "moderator", "admin"].includes(role)
  );
  const isNormal = userRoles?.includes("user") || userRoles === null;

  if (hasHigherRole) {
    return <SideBar children={children} />;
  }

  if (isNormal) {
    return (
      <>
        <Navbar />
        {children}
      </>
    );
  }
};

export default BaseContent;
