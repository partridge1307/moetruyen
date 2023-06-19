"use client";

import { useEffect, useRef, useState, useReducer } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Profile from "./Profile";

//Bug shadow
const reducer = (state, action) => {
  if (action === "ACTIVE_SEARCH") {
    return {
      openSearch: true,
      openSidebar: false,
      openProfile: false,
      openShadow: true,
    };
  }
  if (action === "ACTIVE_SIDEBAR") {
    return {
      openSearch: false,
      openSidebar: !state.openSidebar,
      openProfile: false,
      openShadow: true,
    };
  }
  if (action === "ACTIVE_PROFILE") {
    return {
      openSearch: false,
      openSidebar: false,
      openProfile: !state.openProfile,
      openShadow: true,
    };
  }
  if (action === "INACTIVE_SHADOW") {
    return {
      openSearch: false,
      openSidebar: false,
      openProfile: false,
      openShadow: false,
    };
  }
  throw Error("Unknown action");
};

const Header = ({ session }) => {
  const shadowRef = useRef();
  const [state, dispatch] = useReducer(reducer, {
    openSearch: false,
    openSidebar: false,
    openProfile: false,
    openShadow: false,
  });

  useEffect(() => {
    const handler = (e) => {
      if (shadowRef.current.contains(e.target)) {
        dispatch("INACTIVE_SHADOW");
      }
    };

    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  return (
    <>
      <Navbar dispatch={(state) => dispatch(state)} state={state} />
      <Sidebar state={state} />
      <Profile state={state} session={session} />
      <div
        className={
          state.openShadow
            ? "fixed z-10 h-screen w-screen bg-black opacity-20"
            : ""
        }
        ref={shadowRef}
      ></div>
    </>
  );
};

export default Header;
