import { NextResponse } from "next/server";
import { getWorkouts } from "@/lib/api";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const workouts = await getWorkouts();
    return NextResponse.json(workouts);
  } catch {
    return NextResponse.json({ error: "Failed to load workouts" }, { status: 502 });
  }
}
