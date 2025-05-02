import { NextResponse } from "next/server";
import base from "@/lib/airtable/client";

const table = base("Projects");

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const body = await req.json();

    const record = await table.find(id);
    if (!record) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const updated = await table.update(id, body);

    return NextResponse.json(
      { id: updated.id, ...updated.fields },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}