import { FCN_WEB_API } from "@/app/lib/constants";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(null, { status: 401 });
  }

  const res = await fetch(FCN_WEB_API, {
    method: "GET",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json; charset=UTF-8",
    },
  });
  const results = await res.json();

  return Response.json(results, { status: res.status });
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for");

  const payload = await request.json();

  const payloadWithIP = {
    ...payload,
    ip,
  };

  console.log(JSON.stringify(payloadWithIP));

  return Response.json({});

  // const res = await fetch(FCN_WEB_API, {
  //   method: "POST",
  //   headers: {
  //     Accept: "*/*",
  //     "Content-Type": "application/json; charset=UTF-8",
  //   },
  //   body: JSON.stringify(payloadWithIP),
  // });
  // const text = await res.text();

  // return Response.json(text, { status: res.status });
}
