import Provider from "@components/Provider";
import { Inter } from "next/font/google";
import "@styles/globals.css";

const inter = Inter({ subsets: ["vietnamese"] });

export const metadata = {
  title: "Moetruyen",
  description: "Powered by Yuri",
};

const Layout = ({ children }) => {
  return (
    <html lang="vi">
      <body
        className={`${inter.className} h-screen overflow-y-auto bg-zinc-800 text-white`}
      >
        <Provider>{children}</Provider>
      </body>
    </html>
  );
};

export default Layout;
