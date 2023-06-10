import NextNTopLoader from "nextjs-toploader";
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
      <body className={inter.className}>
        <NextNTopLoader color="#506DE4" showSpinner={false} />
        <Provider>{children}</Provider>
      </body>
    </html>
  );
};

export default Layout;
