import { NextRequest, NextResponse } from "next/server";

const API_KEY = process.env.SHUTTERSTOCK_API_KEY;
const API_SECRET = process.env.SHUTTERSTOCK_API_SECRET;
const BASE_URL = "https://api.shutterstock.com/v2";

function getAuthHeader() {
  const token = Buffer.from(`${API_KEY}:${API_SECRET}`).toString("base64");
  return `Basic ${token}`;
}

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const query = searchParams.get("query") || "thailand";
  const type = searchParams.get("type") || "images"; // images | videos
  const page = searchParams.get("page") || "1";
  const perPage = searchParams.get("per_page") || "20";

  if (!API_KEY || !API_SECRET) {
    return NextResponse.json(
      { error: "Shutterstock API credentials not configured" },
      { status: 500 }
    );
  }

  const endpoint = type === "videos" ? "videos/search" : "images/search";
  const url = `${BASE_URL}/${endpoint}?query=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}&sort=popular`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: getAuthHeader() },
      next: { revalidate: 300 }, // cache 5 min
    });

    if (!res.ok) {
      const errorText = await res.text();
      return NextResponse.json(
        { error: "Shutterstock API error", details: errorText },
        { status: res.status }
      );
    }

    const data = await res.json();

    // Transform to simpler format
    if (type === "videos") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const videos = data.data.map((v: any) => ({
        id: v.id,
        description: v.description,
        duration: v.duration,
        aspect: v.aspect,
        preview: v.assets?.preview_mp4?.url || v.assets?.thumb_mp4?.url || null,
        thumb: v.assets?.thumb_jpg?.url || null,
      }));
      return NextResponse.json({
        total: data.total_count,
        page: Number(page),
        perPage: Number(perPage),
        results: videos,
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const images = data.data.map((img: any) => ({
      id: img.id,
      description: img.description,
      preview: img.assets?.preview?.url || null,
      thumb: img.assets?.small_thumb?.url || img.assets?.large_thumb?.url || null,
      width: img.assets?.preview?.width,
      height: img.assets?.preview?.height,
    }));

    return NextResponse.json({
      total: data.total_count,
      page: Number(page),
      perPage: Number(perPage),
      results: images,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: "Failed to fetch from Shutterstock", message: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}
