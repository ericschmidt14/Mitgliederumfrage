import { FCN_WEB_API } from "@/app/lib/constants";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { token: string } }
) {
  const res = await fetch(`${FCN_WEB_API}/${params.token}`, {
    method: "GET",
    headers: {
      Accept: "*/*",
    },
    cache: "no-store",
  });
  const data = res.status === 200 ? await res.json() : await res.text();

  return NextResponse.json(data, { status: res.status });
}
