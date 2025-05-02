import { NextRequest, NextResponse } from "next/server";
import base from "@/lib/airtable/client";

const tableProjects = base("Projects");
const tableUsers = base("Users");
const tableTechnologies = base("Technologies");

export async function GET(req: NextRequest, context: { params: { id: string } }) {
  const { id } = await context.params;

  try {
    const project = await tableProjects.find(id);

    const userIds = (project.fields["Users"] || []) as string[];
    let users: any[] = [];

    if (userIds.length > 0) {
      const userRecords = await tableUsers
        .select({
          filterByFormula: `OR(${userIds.map((id) => `RECORD_ID() = '${id}'`).join(",")})`,
        })
        .all();

      users = userRecords.map((user) => ({
        id: user.id,
        ...user.fields,
      }));
    }

    const technologyIds = (project.fields["Technologies"] || []) as string[];
    let technologies: any[] = [];

    if (technologyIds.length > 0) {
      const technologyRecords = await tableTechnologies
        .select({
          filterByFormula: `OR(${technologyIds.map((id) => `RECORD_ID() = '${id}'`).join(",")})`,
        })
        .all();

      technologies = technologyRecords.map((tech) => ({
        id: tech.id,
        Name: tech.fields["Name"] as string,
      }));
    }

    return NextResponse.json({
      id: project.id,
      ...project.fields,
      users,
      technologies,
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  
  try {
      const record = await tableProjects.find(id);
      if (!record) {
          return NextResponse.json({ error: "Project not found" }, { status: 404 });
      }

      await tableProjects.destroy(id);

      return NextResponse.json({ message: "Project deleted successfully" }, { status: 200 });
  } catch (error) {
      console.error("Error deleting project:", error);
      return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}