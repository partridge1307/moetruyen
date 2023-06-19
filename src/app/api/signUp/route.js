import bcrypt from "bcrypt";
import prisma from "@lib/prisma";
import { NextResponse } from "next/server";
import { send } from "@utils/nodemailer";
import { signToken } from "@utils/jwt";

const sendVerification = async (token, email) => {
  await send({
    email,
    subject: "Xác thực tài khoản",
    html: `<!DOCTYPE html>
    <html lang="vi">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title></title>
      </head>
      <body
        style="
          text-align: center;
          margin: 0;
          padding: 10px;
          background-color: #3f3f46;
          color: white;
          height: 70vh;
        "
      >
          <div style="font-size: 2rem">
            <h1 style="color: #506de4; margin-bottom: 0.7rem">Moetruyen</h1>
            <p style="margin-top: 0px">Cảm ơn bạn đã tạo tài khoản</p>
          </div>
          <div style="margin-top: 4rem; font-size: 1.2rem">
            <p style="margin-bottom: 5rem">
              Nhấn vào nút bên dưới để xác thực tài khoản. Có hiệu lực trong 30 phút
            </p>
            <a
              href="${process.env.NEXTAUTH_URL}/verify/${token}"
              style="
                text-decoration: none;
                color: white;
                background-color: #506de4;
                padding: 1rem;
                border-radius: 0.7rem;
              "
              >Nhấn tôi đi</a
            >
          </div>
      </body>
    </html>
    `,
  });
};

export async function POST(req) {
  const { email, username, password } = await req.json();

  if (!email || !username || !password) {
    return NextResponse.json(
      {
        message: "Thiếu thông tin",
      },
      {
        status: 400,
      }
    );
  }
  const hashedPwd = await bcrypt.hash(password, 12);

  try {
    const [userEmail, userUsrName] = await prisma.$transaction([
      prisma.user.findUnique({
        where: {
          email,
        },
        select: {
          email: true,
        },
      }),
      prisma.user.findUnique({
        where: {
          username,
        },
        select: {
          username: true,
        },
      }),
    ]);

    if (userEmail) {
      return NextResponse.json(
        { message: "Email đã tồn tại" },
        { status: 400 }
      );
    }
    if (userUsrName) {
      return NextResponse.json(
        { message: "Tên người dùng đã tồn tại" },
        {
          status: 400,
        }
      );
    }

    const token = signToken({ email, username, password: hashedPwd }, "30m");
    await sendVerification(token, email);

    return NextResponse.json(
      {
        message: "Đã gửi thư xác thực tới mail của bạn.",
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        message: "Có lỗi xảy ra",
      },
      {
        status: 500,
      }
    );
  }
}
