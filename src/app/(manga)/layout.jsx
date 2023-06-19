import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import Header from "@components/Header/Header";

const Layout = async ({ children }) => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Header session={session} />
      <main className="m-auto h-fit w-full md:w-[80%]">{children}</main>
    </>
  );
};

export default Layout;
