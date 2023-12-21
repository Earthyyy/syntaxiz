import { NextResponse } from "next/server";
import { translateProgram } from "@/utils/server";

export async function POST(req) {
  const { payload } = await req.json();
  const response = [];
  translateProgram(payload, response);

  return NextResponse.json({
    response: response.join("\n"),
  });
}
