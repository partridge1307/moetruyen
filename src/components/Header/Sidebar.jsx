import Link from "next/link";
import Image from "next/image";
import { HiOutlineHome } from "react-icons/hi";
import { RxBookmark } from "react-icons/rx";
import { BsBook, BsPin } from "react-icons/bs";
import { SlPeople } from "react-icons/sl";

const menus = [
  {
    title: "Theo dõi",
    icon: <RxBookmark />,
    subMenu: [
      {
        title: "Truyện",
        path: "/me/follow/mangas",
      },
      {
        title: "Nhóm dịch",
        path: "/me/follow/groups",
      },
    ],
  },
  {
    title: "Truyện",
    icon: <BsBook />,
    subMenu: [
      {
        title: "Tìm kiếm nâng cao",
        path: "manga/advancedSearch",
      },
      {
        title: "Truyện mới",
        path: "/manga/new",
      },
      {
        title: "Mới cập nhật",
        path: "/manga/latest",
      },
      {
        title: "Truyện ngẫu nhiên",
        path: "/manga/random",
      },
    ],
  },
  {
    title: "Cộng đồng",
    icon: <SlPeople />,
    subMenu: [
      {
        title: "Forum",
        path: "/forum",
      },
      {
        title: "Nhóm dịch",
        path: "/forum/groups",
      },
    ],
  },
  {
    title: "Moetruyen",
    icon: <BsPin />,
    subMenu: [
      {
        title: "Điều khoản",
        path: "/about/tos",
      },
      {
        title: "Chính sách bảo mật",
        path: "/about/privacy-policy",
      },
    ],
  },
];

const Sidebar = ({ state }) => {
  return (
    <aside
      className={state.openSidebar ? "sidebar active" : "sidebar inactive"}
    >
      <ul className="w-full space-y-4">
        <li>
          <Link className="sidebar_item title focus:bg-[#506DE4]" href={"/"}>
            <i className="icon mr-2">
              <HiOutlineHome />
            </i>
            Trang chủ
          </Link>
        </li>
        {menus.map((menu) => (
          <li key={menu.title}>
            <div className="sidebar_item title">
              <i className="icon mr-2">{menu.icon}</i>
              <span>{menu.title}</span>
            </div>
            {menu.subMenu && (
              <ul className="flex w-full flex-col gap-2">
                {menu.subMenu.map((sub) => (
                  <li key={sub.title}>
                    <Link
                      href={sub.path}
                      className={`text flex rounded-lg px-7 py-1 hover:bg-zinc-500 focus:bg-[#506DE4]`}
                    >
                      {sub.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-8 flex flex-col gap-y-4 border-t p-4">
        <div className="flex items-center justify-center gap-x-4">
          <Link href={"https://www.facebook.com/Bfangteam/"} target="_blank">
            <Image
              src={"/assets/images/facebook.svg"}
              width={30}
              height={30}
              alt="Facebook logo"
            />
          </Link>
          <Link href="https://discord.gg/dongmoe" target="_blank">
            <Image
              src={"/assets/images/discord.svg"}
              width={35}
              height={35}
              alt="Discord Logo"
            />
          </Link>
        </div>
        <div>
          <span className="text">©Moetruyen 2023</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
