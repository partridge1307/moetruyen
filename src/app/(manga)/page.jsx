import prisma from "@lib/prisma";
import Link from "next/link";

const getManga = async () => {
  try {
    const mangas = await prisma.manga.findMany({
      skip: 0,
      take: 10,
    });
    return mangas;
  } catch (error) {
    throw new Error(error.message);
  }
};

const Home = async () => {
  const mangas = await getManga();
  return (
    <div className="text">
      {mangas.map((manga) => (
        <Link key={manga.id} href={`/manga/${manga.id}`}>
          {manga.name}
        </Link>
      ))}
    </div>
  );
};

export default Home;
