"use client";

import Taskbar from "./Taskbar";
import Navbar from "./Navbar";
import { useState } from "react";

const tabs = ["Thống kê", "Truyện đã đăng", "Đăng truyện"];

const Header = () => {
  const [sidebar, setSiderbar] = useState(false);

  const onSidebarHandler = (state) => {
    setSiderbar(state);
  };

  return (
    <>
      <Navbar onSidebar={onSidebarHandler} />
      <Taskbar tabs={tabs} sidebar={sidebar} />
    </>
  );
};

export default Header;
