"use client";

import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/autoplay";

const SwiperCard = ({ mangas }) => {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={10}
      loop={true}
      slidesPerView={1}
      autoplay={{ delay: 15000 }}
      className="h-full w-full rounded-lg"
    >
      {mangas.map((manga) => (
        <SwiperSlide key={manga.id}>
          <Link href={`/manga/${manga.id}`}>
            <Image
              src={manga.thumbnail}
              alt={`${manga.name} Background`}
              fill={true}
              sizes="0%"
              style={{
                objectFit: "cover",
                filter: "brightness(0.3) blur(4px)",
              }}
            />
            <div className="relative flex h-3/4 w-full gap-x-3 p-3 max-sm:top-1/4 md:h-full">
              <div className="h-full w-2/5 md:w-1/6">
                <Image
                  src={manga.thumbnail}
                  alt={`${manga.name} Cover`}
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
              <div className="flex h-full w-3/5 flex-col gap-y-2 overflow-hidden md:w-5/6">
                <h5 className="title line-clamp-2">{manga.name}</h5>
                <div className="flex flex-wrap gap-2 text-center text-xs md:gap-1">
                  {manga.tag.length > 5 ? (
                    <>
                      {manga.tag.slice(0, 6).map((t) => (
                        <span
                          key={t.id}
                          title={t.description}
                          className="rounded-xl bg-[#506DE4] p-1 px-2"
                        >
                          {t.name}
                        </span>
                      ))}
                      <span className="rounded-xl bg-[#506DE4] p-1 px-2">
                        +{manga.tag.length - 5}
                      </span>
                    </>
                  ) : (
                    manga.tag.map((t) => (
                      <span
                        key={t.id}
                        title={t.description}
                        className="rounded-xl bg-[#506DE4] p-1 px-2"
                      >
                        {t.name}
                      </span>
                    ))
                  )}
                </div>
                <p
                  title={manga.description}
                  className="scrollbar hidden h-1/2 overflow-auto break-all md:block"
                >
                  {manga.description}
                </p>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperCard;
