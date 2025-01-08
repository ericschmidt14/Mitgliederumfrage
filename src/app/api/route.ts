import { FCN_WEB_API } from "@/app/constants";

export async function POST(request: Request) {
  const res = await fetch(FCN_WEB_API, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(await request.json()),
  });
  const text = await res.text();

  return Response.json(text, { status: res.status });
}
