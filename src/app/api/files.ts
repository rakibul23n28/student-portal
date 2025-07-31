// pages/api/files.ts

import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const files = await prisma.file.findMany({
      include: { user: true },
    });
    res.status(200).json(files);
  }

  if (req.method === "POST") {
    const { title, url, userId } = req.body;
    const file = await prisma.file.create({
      data: { title, url, userId },
    });
    res.status(201).json(file);
  }
}
