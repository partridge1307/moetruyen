import { Suspense } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import Header from "@components/Manage/Header";

const Manga = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header />
      <Suspense fallback={<p>Loading...</p>}></Suspense>
    </>
  );
};

export default Manga;
