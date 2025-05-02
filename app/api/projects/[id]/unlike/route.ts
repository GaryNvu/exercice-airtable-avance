import { NextApiRequest, NextApiResponse } from "next";
import base from "@/lib/airtable/client";

const table = base("Projects");

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ error: "Project ID is required" });
      }

      const record = await table.find(id);
      const likes = Number(record.fields["Likes"]) || 0;

      if (likes <= 0) {
        return res.status(200).json({ id, likes: 0 });
      }

      const updated = await table.update(id, {
        Likes: likes - 1,
      });

      res.status(200).json({ id: updated.id, likes: updated.fields["Likes"] });
    } catch (error) {
      res.status(500).json({ error: "Failed to unlike project" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}