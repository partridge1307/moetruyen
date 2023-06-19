"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useReducer } from "react";
import { formatTime, timeDistance } from "@utils/util";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
import { BsReply } from "react-icons/bs";
import { TbBrandPagekit } from "react-icons/tb";
import { BsChatRightDots } from "react-icons/bs";

const tabs = [
  {
    icon: <TbBrandPagekit />,
    title: "Chapter",
  },
  {
    icon: <BsChatRightDots />,
    title: "Bình luận",
  },
];

const reducer = (state, action) => {
  if (action === "LIKE") {
    return {
      like: !state.like,
      dislike: false,
      change: 1,
    };
  }
  if (action === "DISLIKE") {
    return {
      like: false,
      dislike: !state.dislike,
      change: -1,
    };
  }
  throw Error("Unknown action");
};

const MangaChapterAndComment = ({ chapters, mangaId }) => {
  const [target, setTarget] = useState(tabs[0]);
  const [isReadMore, setReadMore] = useState(false);
  const [state, dispatch] = useReducer(reducer, {
    like: false,
    dislike: false,
    change: 0,
  });

  return (
    <div>
      <div className="text flex items-center justify-between">
        {/* Chapter and Comment button */}
        {tabs.map((tab) => (
          <button
            key={tab.title}
            type="button"
            className={`flex items-center gap-x-1 p-2 transition-colors ${
              tab.title === target.title
                ? "rounded-lg bg-zinc-700"
                : "rounded-2xl hover:bg-zinc-600"
            }`}
            onClick={() => setTarget(tab)}
          >
            <i className="icon">{tab.icon}</i>
            {tab.title}
          </button>
        ))}
      </div>
      {/* Content */}
      <ul className="scrollbar mt-2 flex h-96 flex-col gap-y-3 overflow-auto">
        {/* Chapter section */}
        {target.title === "Chapter"
          ? chapters.map((chapter) => (
              <Link key={chapter.id} href={`/manga/${mangaId}/${chapter.id}`}>
                <li className="flex flex-col justify-between rounded-lg bg-zinc-700 p-1 py-2 text-center transition-colors hover:bg-zinc-600 md:flex-row md:p-3">
                  <span>
                    {chapter.chapNum} - {chapter.name}
                  </span>
                  <span>Đăng lúc: {formatTime(chapter.createdAt)}</span>
                </li>
              </Link>
            ))
          : // Comment Section
            chapters
              .map((chapter) => chapter.comment)
              .flat()
              .map((cmt) => (
                // User avatar
                <li
                  key={cmt.id}
                  className="flex max-h-fit w-full flex-col gap-y-6 rounded-xl bg-zinc-700 p-2"
                >
                  <div className="flex h-full w-full gap-x-4 md:gap-x-6">
                    <div className="h-10 w-14 md:h-12 md:w-12">
                      <Image
                        src="/manga/1/thumbnail.jpg"
                        alt={`${cmt.user.name} Avatar`}
                        height={0}
                        width={0}
                        sizes="0%"
                        style={{
                          width: "100%",
                          height: "100%",
                          borderRadius: "9999px",
                        }}
                      />
                    </div>
                    {/* Comment Content */}
                    <div className="scrollbar flex w-[calc(100%-3rem)] flex-col overflow-auto">
                      <h6>{cmt.user.name}</h6>
                      {/* If comment content >= 255 characters then take first 255 characters and add read more button. If click read more button then show all content*/}
                      <p className="break-words">
                        {cmt.content.length >= 255 ? (
                          !isReadMore ? (
                            <>
                              {cmt.content.slice(0, 256)}...{" "}
                              <button
                                type="button"
                                onClick={() => {
                                  setReadMore(true);
                                }}
                              >
                                Đọc thêm
                              </button>
                            </>
                          ) : (
                            <>{cmt.content}</>
                          )
                        ) : (
                          <>{cmt.content}</>
                        )}
                      </p>
                    </div>
                    <div>
                      {timeDistance(cmt.createdAt, Date.now(), "hour")} trước
                    </div>
                  </div>
                  <div className="flex items-center justify-between px-3 md:px-8">
                    <div className="flex items-center gap-x-6">
                      <button
                        type="button"
                        className="flex items-center gap-x-2"
                        onClick={() => dispatch("LIKE")}
                      >
                        {state.like ? (
                          <>
                            <i className="icon">
                              <AiFillLike />
                            </i>
                            {cmt.like + 1}
                          </>
                        ) : (
                          <>
                            <i className="icon">
                              <AiOutlineLike />
                            </i>
                            {cmt.like}
                          </>
                        )}
                      </button>
                      <button
                        type="button"
                        className="flex items-center gap-x-2"
                        onClick={() => dispatch("DISLIKE")}
                      >
                        {state.dislike ? (
                          <>
                            <i className="icon">
                              <AiFillDislike />
                            </i>
                            {cmt.dislike + 1}
                          </>
                        ) : (
                          <>
                            <i className="icon">
                              <AiOutlineDislike />
                            </i>
                            {cmt.dislike}
                          </>
                        )}
                      </button>
                    </div>
                    <button type="button">
                      <i className="icon">
                        <BsReply />
                      </i>
                    </button>
                  </div>
                </li>
              ))}
      </ul>
    </div>
  );
};

export default MangaChapterAndComment;
