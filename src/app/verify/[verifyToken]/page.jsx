import Link from "next/link";
import prisma from "@lib/prisma";
import { jwtVerify } from "@utils/jwt";

const createUser = ({ email, username, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const newUser = await prisma.user.create({
        data: {
          email: email,
          username: username,
          password: password,
        },
      });

      resolve(newUser);
    } catch (error) {
      reject(error.message);
    }
  });

const Verify = async ({ params }) => {
  const decoded = jwtVerify(params.verifyToken);

  let newUser;

  if (decoded) {
    newUser = await createUser(decoded).catch(() => {
      return "AlreadyCreated";
    });
  }

  return !decoded || newUser === "AlreadyCreated" ? (
    <div className="flex h-full w-full items-center justify-center rounded-xl text-center max-sm:bg-zinc-700">
      <div className="h-1/2 w-full rounded-xl md:bg-zinc-700 md:p-10">
        <h1 className="text-5xl font-bold text-[#506DE4]">Xin lỗi</h1>
        <p className="mb-20 mt-6">
          Có vẻ như có ai đó đã đăng ký tài khoản này hoặc đã quá hạn xác thực
          <br />
          Vui lòng đăng ký lại nhé
        </p>
        <Link href={"/signUp"} className="rounded-lg bg-[#506DE4] p-3">
          Đăng ký
        </Link>
      </div>
    </div>
  ) : (
    <div className="flex h-full w-full items-center justify-center text-center max-sm:bg-zinc-700">
      <div className="h-1/2 w-full rounded-xl md:bg-zinc-700 md:p-10">
        <h1 className="text-5xl font-bold text-[#506DE4]">
          Xin chào {newUser?.username}
        </h1>
        <p className="mb-20 mt-6">Bạn đã xác thực tài khoản thành công</p>
        <p>
          Cùng khám phá{" "}
          <Link href={"/"} className="header_text underline">
            Moetruyen
          </Link>{" "}
          nào
        </p>
      </div>
    </div>
  );
};

export default Verify;
