import { useState } from "react";

const Taskbar = ({ sidebar, tabs }) => {
  const [click, setClick] = useState(tabs[0]);

  return (
    <aside
      className={`${
        sidebar ? "left-0" : "-left-full"
      } fixed flex h-full w-64 flex-col gap-y-2 bg-zinc-700 p-3 transition-all`}
    >
      <ul className="space-y-3">
        {tabs.map((tab) => (
          <li
            key={tab}
            className={`${
              tab === click && "bg-[#506DE4]"
            } cursor-pointer rounded-md p-3`}
            onClick={() => {
              setClick(tab);
            }}
          >
            {tab}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Taskbar;
