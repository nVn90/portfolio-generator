import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { savePortfolio, getPortfolio } from "@/lib/storage";
import type { PortfolioData } from "@/types";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resume, themeId, layoutId } = body;

    if (!resume || !themeId || !layoutId) {
      return NextResponse.json(
        { error: "Missing required fields: resume, themeId, layoutId" },
        { status: 400 }
      );
    }

    const portfolioData: PortfolioData = {
      id: uuidv4(),
      resume,
      themeId,
      layoutId,
      createdAt: new Date().toISOString(),
    };

    await savePortfolio(portfolioData);

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    return NextResponse.json({
      id: portfolioData.id,
      url: `${appUrl}/portfolio/${portfolioData.id}`,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("[generate-portfolio]", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const id = request.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing id parameter" }, { status: 400 });
    }

    const portfolio = await getPortfolio(id);

    if (!portfolio) {
      return NextResponse.json(
        { error: "Portfolio not found. It may have expired." },
        { status: 404 }
      );
    }

    return NextResponse.json(portfolio);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error occurred";
    console.error("[generate-portfolio GET]", error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
