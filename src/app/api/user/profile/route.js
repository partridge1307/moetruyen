import { NextResponse } from "next/server";
import { sendToDisc } from "@utils/util";

export async function PATCH(req) {
  const data = await req.formData();
  console.log(data);
}
