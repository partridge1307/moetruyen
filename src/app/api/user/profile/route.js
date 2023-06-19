import { getServerSession } from "next-auth";
import { authOptions } from "@app/api/auth/[...nextauth]/route";
import prisma from "@lib/prisma";
import { NextResponse } from "next/server";
import { sendToDisc } from "@utils/util";

export async function PATCH(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  const data = await req.formData();

  let prof = [];
  for (const [name, b64Data] of data.entries()) {
    const imageLink = JSON.parse(await sendToDisc([b64Data]))?.attachments[0]
      .url;

    prof.push({ name, imageLink });
  }

  try {
    await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        image: prof.find((p) => p.name === "image")?.imageLink,
        banner: prof.find((p) => p.name === "banner")?.imageLink,
      },
    });

    return new NextResponse({ status: 204 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}
