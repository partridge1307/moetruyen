import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RiMenuLine, RiSearch2Line } from "react-icons/ri";
import { RxPerson } from "react-icons/rx";

const Navbar = ({ dispatch, state }) => {
  const [Navbar, setNavbar] = useState(false);
  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY >= 56) {
        setNavbar(true);
      } else {
        setNavbar(false);
      }
    };

    window.addEventListener("scroll", scrollHandler);
  }, []);

  return (
    <nav className={Navbar ? "navbar active" : "navbar inactive"}>
      {/* Left Navbar Item */}
      <div
        className={
          state.openSearch ? "hidden items-center md:flex" : "navbar_item"
        }
      >
        <button
          className="icon mr-4"
          type="button"
          onClick={() => dispatch("ACTIVE_SIDEBAR")}
        >
          <RiMenuLine />
        </button>
        <Link className="header_text font-bold" href={"/"}>
          Moetruyen
        </Link>
      </div>

      {/* Right Navbar Item */}
      <div
        className={
          state.openSearch
            ? "max-sm:flex-grow md:flex md:items-center"
            : "navbar_item"
        }
      >
        <div className="relative" onClick={() => dispatch("ACTIVE_SEARCH")}>
          <form action="/search?query" method="post">
            <input
              className={state.openSearch ? "search active" : "search"}
              type="text"
              name="search"
              placeholder="Tìm kiếm"
            />
            <i className="search_icon">
              <RiSearch2Line />
            </i>
            <div
              className={
                state.openSearch ? "search_result" : "search_result hidden"
              }
            >
              <div className="flex gap-x-4">
                <Image
                  src="/manga/1/thumbnail.jpg"
                  height={60}
                  width={60}
                  alt="Search Result Thumbnail"
                />
                <div className="grid">
                  <span>Renri no Eda</span>
                  <span>Asagi Iori</span>
                </div>
              </div>
            </div>
          </form>
        </div>
        <button
          className={
            state.openSearch ? "icon hidden md:ml-4 md:block" : "icon ml-4"
          }
          type="button"
          onClick={() => dispatch("ACTIVE_PROFILE")}
        >
          <RxPerson />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
