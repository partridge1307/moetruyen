import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { RiMenuLine } from "react-icons/ri";

const Navbar = ({ onSidebar }) => {
  const [sidebar, setSidebar] = useState(false);

  return (
    <>
      <div className="sticky top-0 flex h-16 items-center justify-between bg-zinc-700 px-4">
        <div className="flex items-center">
          <button
            className="mr-3 text-2xl"
            type="button"
            onClick={() =>
              setSidebar((pre) => {
                onSidebar(!pre);
                return !pre;
              })
            }
          >
            <RiMenuLine />
          </button>
          <Link href={"/"} className="header_text">
            Moetruyen
          </Link>
        </div>
        <div className="flex items-center gap-x-4">
          <Link href={"https://discord.gg/dongmoe"} target="_blank">
            <Image
              src={"/assets/images/discord.svg"}
              alt="Discord Logo"
              height={35}
              width={35}
            />
          </Link>
          <Link href={"https://www.facebook.com/Bfangteam/"} target="_blank">
            <Image
              src={"/assets/images/facebook.svg"}
              alt="Facebook Logo"
              height={30}
              width={30}
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
