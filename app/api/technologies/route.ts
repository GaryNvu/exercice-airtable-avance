import { NextApiRequest, NextApiResponse } from "next";
import base from "@/lib/airtable/client";
import { NextResponse } from "next/server";

const table = base("Technologies");

export async function GET() {
  try {
    const records = await table.select().all();

    const technologies = records.map((record) => ({
      id: record.id,
      Name: record.fields["Name"] as string,
    }));

    return NextResponse.json(technologies, { status: 200 });
  } catch (error) {
    console.error("Error fetching technologies:", error);
    return NextResponse.json({ error: "Failed to fetch technologies" });
  }
}