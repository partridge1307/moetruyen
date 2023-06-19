import { getNotableMangas, getLatestCreateChapter } from "@lib/manga";
import SwiperCard from "@components/Manga/SwiperCard";
import Card from "@components/Manga/Card";
import TopCard from "@components/Manga/TopCard";

const Home = async () => {
  const notableMangas = await getNotableMangas();
  const latestChapter = await getLatestCreateChapter();

  return (
    <>
      <div className="h-72 w-full md:h-52">
        <SwiperCard mangas={notableMangas} />
      </div>
      <div className="mt-4 h-60 w-full px-3 md:p-0">
        <h3 className="title mb-2">Mới cập nhật</h3>
        <div className="h-full w-full">
          <Card chapters={latestChapter} />
        </div>
      </div>
      <div className="mt-14 h-60 w-full px-3 md:p-0">
        <h3 className="title mb-2">Bảng xếp hạng</h3>
        <div className="h-full w-full">
          <TopCard />
        </div>
      </div>
    </>
  );
};

export default Home;
