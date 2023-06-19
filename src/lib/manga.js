import prisma from "@lib/prisma";

export const getNotableMangas = async () => {
  try {
    const mangas = await prisma.manga.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      include: {
        tag: true,
        user: false,
        guild: false,
        chapter: false,
      },
      take: 5,
    });

    return mangas;
  } catch (error) {
    throw error.message;
  }
};

export const getLatestCreateChapter = async () => {
  try {
    const mangas = await prisma.chapter.findMany({
      distinct: ["mangaId"],
      orderBy: {
        createdAt: "desc",
      },
      include: {
        manga: {
          include: {
            user: true,
            guild: true,
          },
        },
        comment: false,
      },
      take: 10,
    });

    return mangas;
  } catch (error) {
    throw error.message;
  }
};

export const getSpecificMangaInfo = async ({ mangaId }) => {
  try {
    const manga = await prisma.manga.findUnique({
      where: {
        id: +mangaId,
      },
      include: {
        user: true,
        guild: true,
        chapter: {
          include: {
            comment: {
              include: {
                user: true,
              },
            },
          },
        },
        tag: true,
      },
    });

    return manga;
  } catch (error) {
    throw error.message;
  }
};
