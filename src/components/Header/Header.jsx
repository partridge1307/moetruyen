"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Header = () => {
  const [openSearch, setOpenSearch] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const menuRef = useRef();
  const sidebarRef = useRef();
  const profileRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setOpenSearch(false);
      }
      if (!sidebarRef.current.contains(e.target)) {
        setOpenSidebar(false);
      }
      if (!profileRef.current.contains(e.target)) {
        setOpenProfile(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <>
      <Navbar
        menuRef={menuRef}
        profileRef={profileRef}
        onOpenSidebar={(open) => setOpenSidebar(open)}
        onOpenSearch={(open) => setOpenSearch(open)}
        openSearch={openSearch}
        onOpenProfile={(open) => setOpenProfile(open)}
        openProfile={openProfile}
      />
      <Sidebar sidebarRef={sidebarRef} openSidebar={openSidebar} />
    </>
  );
};

export default Header;
