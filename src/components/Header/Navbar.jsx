import Link from "next/link";
import Profile from "./Profile";
import * as RiIcons from "react-icons/ri";
import * as RxIcons from "react-icons/rx";

const Navbar = ({
  menuRef,
  profileRef,
  onOpenSidebar,
  onOpenSearch,
  openSearch,
  onOpenProfile,
  openProfile,
}) => {
  return (
    <nav className="navbar w-full">
      <div className={`${openSearch ? "hidden md:flex" : "flex"}`}>
        <div className="navbar_item header_text">
          <button className="mr-4" onClick={() => onOpenSidebar(true)}>
            <RiIcons.RiMenuLine />
          </button>
          <Link href={"/"}>Moetruyen</Link>
        </div>
      </div>
      <div className="navbar_item">
        <div
          className={`search ${openSearch ? "active" : "inactive"}`}
          ref={menuRef}
        >
          <form action={`/search?dwa`} method="get">
            <input
              className="search_input"
              type="text"
              name="query"
              placeholder="Tìm Kiếm"
              onClick={() => onOpenSearch(true)}
            />
            <i
              className={`search_icon ${openSearch ? "active" : ""}`}
              onClick={() => onOpenSearch(true)}
            >
              <RiIcons.RiSearch2Line />
            </i>
          </form>
          <ul
            className={`${openSearch ? "flex" : "hidden"} search_result title`}
          >
            <li>Search result 1</li>
            <li>Search result 2</li>
            <li>Search result 3</li>
          </ul>
        </div>
        <div className="relative" ref={profileRef}>
          <button
            className={`${
              openSearch ? "hidden md:inline-block" : "inline-block"
            } header_text`}
            type="button"
            onClick={() => onOpenProfile(true)}
          >
            <RxIcons.RxPerson />
          </button>
          <Profile profileRef={profileRef} openProfile={openProfile} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
