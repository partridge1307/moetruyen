import { getSpecificMangaInfo } from "@lib/manga";
import MangaChapterAndComment from "@components/Manga/MangaChapterAndComment";
import Image from "next/image";
import Link from "next/link";

const MangaInfo = async ({ params }) => {
  const manga = await getSpecificMangaInfo(params);

  return (
    <div className="relative h-full px-4 md:p-0">
      {/* Background */}
      <div className="h-1/3 w-full">
        <Image
          src={manga.thumbnail}
          alt={`${manga.thumbnail} Background`}
          height={0}
          width={0}
          sizes="0%"
          style={{
            width: "100%",
            height: "100%",
            filter: "brightness(0.7) blur(2px)",
            objectFit: "cover",
            objectPosition: "bottom",
          }}
        />
      </div>
      {/* Content */}
      <div className="absolute left-[9%] top-1/4 h-44 w-10/12 md:left-0 md:w-full md:px-4">
        {/* Cover and Title */}
        <div className="flex h-full w-full items-end gap-x-2 md:gap-x-4">
          <div className="h-full w-2/5 md:w-1/5">
            <Image
              src={manga.thumbnail}
              alt={`${manga.thumbnail} Cover`}
              height={0}
              width={0}
              sizes="0%"
              style={{ width: "100%", height: "100%" }}
            />
          </div>
          <h5 className="header_text h-[65%] w-3/5 break-words drop-shadow md:w-4/5">
            {manga.name}
          </h5>
        </div>
        {/* Uploaded By */}
        <div className="mt-6 flex h-24 w-full items-center justify-start gap-x-10 rounded-2xl bg-zinc-700 px-4 md:mt-12 md:w-fit">
          <div className="h-14 w-1/4 md:h-12 md:w-16">
            <Image
              src={manga.thumbnail}
              alt={`${manga.guild.name} Avatar`}
              sizes="0%"
              height={0}
              width={0}
              style={{
                height: "100%",
                width: "100%",
                objectFit: "cover",
                borderRadius: "9999px",
              }}
            />
          </div>
          <div className="flex w-3/4 flex-col gap-y-2 md:w-[calc(100%-4rem)]">
            <Link href={`/user/${manga.user.id}`} className="title">
              {manga.user.name}
            </Link>
            <Link href={`/guild/${manga.guild.id}`}>{manga.guild.name}</Link>
          </div>
        </div>
        {/* Tag */}
        <div className="text mt-4 md:mt-12">
          Thể loại <br />
          <div className="flex flex-wrap gap-2">
            {manga.tag.map((t) => (
              <span
                key={t.id}
                className="rounded-xl bg-[#506DE4] p-1 px-2 text-sm"
              >
                {t.name}
              </span>
            ))}
          </div>
        </div>
        {/* View */}
        <div className="text mt-4 md:mt-12">
          Lượt xem:{" "}
          {manga.chapter
            .map((ch) => ch.view)
            .reduce(
              (accumulator, currentValue) => accumulator + currentValue,
              0
            )}
        </div>
        {/* Description */}
        <div className="text mt-4 md:mt-12">
          Mô tả <br />
          <p>{manga.description}</p>
        </div>
        {/* Chapter and Comment */}
        <div className="mt-10 w-full md:mt-20">
          <MangaChapterAndComment
            tabs={tabs}
            chapters={manga.chapter}
            mangaId={manga.id}
          />
        </div>
      </div>
    </div>
  );
};

export default MangaInfo;
