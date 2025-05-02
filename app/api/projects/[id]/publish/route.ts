import { NextRequest, NextResponse } from "next/server";
import base from "@/lib/airtable/client";

const table = base("Projects");

export async function PUT(req: NextRequest, context: { params: { id: string } }) {
  const { id } = context.params;
  const body = await req.json();

  try {
    const record = await table.find(id);
    if (!record) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const updated = await table.update(id, { Published: body.Published });

    return NextResponse.json(
      { id: updated.id, published: updated.fields["Published"] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error publishing project:", error);
    return NextResponse.json({ error: "Failed to publish project" }, { status: 500 });
  }
}
