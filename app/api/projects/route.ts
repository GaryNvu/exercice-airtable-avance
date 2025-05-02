import { NextRequest, NextResponse } from "next/server";
import base from "@/lib/airtable/client";

const table = base("Projects");

export async function GET() {
  try {
    const records = await table.select().all();
    const projects = await Promise.all(
      records.map(async (record) => {
        const technologyIds = (record.fields["Technologies"] || []) as string[];
        let technologies: { id: string; Name: string }[] = [];

        if (technologyIds.length > 0) {
          const technologyRecords = await base("Technologies")
            .select({
              filterByFormula: `OR(${technologyIds.map((id) => `RECORD_ID() = '${id}'`).join(",")})`,
            })
            .all();

          technologies = technologyRecords.map((tech) => ({
            id: tech.id,
            Name: tech.fields["Name"] as string,
          }));
        }

        return {
          id: record.id,
          ...record.fields,
          technologies,
        };
      })
    );

    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, technologies, users, coverImage, images, video } = body;

    const formattedImages = Array.isArray(images)
      ? images.filter((img) => img.trim() !== "").map((img) => ({ url: img }))
      : [];

    const coverImageFormatted = coverImage ? [{ url: coverImage }] : [];

    const created = await table.create({
      Title: title,
      Description: description,
      Technologies: technologies || [],
      CoverImage: coverImageFormatted,
      Images: formattedImages,
      Video: video ? video : "",
      Users: users || [],
      Published: false,
      Likes: 0,
    });

    return NextResponse.json({ id: created.id, ...created.fields }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}