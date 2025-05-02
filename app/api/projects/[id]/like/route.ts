import { NextResponse } from "next/server";
import base from "@/lib/airtable/client";

const table = base("Projects");

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const project = await table.find(id);

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const likes = Number(project.fields["Likes"]) || 0;
    const updated = await table.update(id, { Likes: likes + 1 });

    return NextResponse.json(
      { id: updated.id, likes: updated.fields["Likes"] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error liking project:", error);
    return NextResponse.json({ error: "Failed to like project" }, { status: 500 });
  }
}