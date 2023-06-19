"use client";

import Link from "next/link";
import Image from "next/image";
import { timeDistance } from "@utils/util";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Mousewheel } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/mousewheel";

const Card = ({ chapters }) => {
  return (
    <Swiper
      modules={[Pagination, Mousewheel]}
      pagination={{ clickable: true }}
      mousewheel={{ releaseOnEdges: true }}
      centerInsufficientSlides
      breakpoints={{
        // when width >= 640px
        320: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        // when width >= 640px
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
      }}
      className="h-full w-full rounded-lg"
    >
      {chapters.map((chapter) => (
        <SwiperSlide key={chapter.id}>
          <Link href={`/manga/${chapter.manga.id}`}>
            <div className="relative flex h-full w-full gap-x-3 bg-zinc-700 p-3">
              <div className="h-full w-2/5 md:w-2/6">
                <Image
                  src={chapter.manga.thumbnail}
                  alt={`${chapter.manga.thumbnail} Cover`}
                  height={0}
                  width={0}
                  sizes="0%"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center",
                    width: "100%",
                    height: "100%",
                    borderRadius: "0.5rem",
                  }}
                />
              </div>
              <div className="flex h-full w-3/5 flex-col gap-y-7 md:h-4/6 md:gap-y-4">
                <div>
                  <h5 className="title">{chapter.manga.name}</h5>
                  <p>
                    {chapter.chapNum === 0
                      ? "One Shot"
                      : `C. ${chapter.chapNum}`}{" "}
                    - {chapter.name}
                  </p>
                </div>
                <p>
                  {chapter.manga.user.name} - {chapter.manga.guild.name}
                </p>
                <p>
                  {timeDistance(
                    new Date(chapter.createdAt),
                    Date.now(),
                    "full"
                  )}{" "}
                  trước
                </p>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Card;
