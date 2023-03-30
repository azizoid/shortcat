import { getClientIP } from "@/utilities/getClientIP/getClientIP";
import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const {
      query: { guid },
      method,
    } = req;

    if (method === "GET") {
      const visitCount = await prisma.report.count({
        where: { shortcode_guid: String(guid) },
      });

      res.status(200).json({ visit_count: visitCount });
    } else if (method === "POST") {
      const ipAddress = getClientIP(req)

      const visit = await prisma.report.create({
        data: {
          shortcode_guid: String(guid),
          ip_address: ipAddress,
        },
      });

      res.status(200).json(visit);
    } else {
      res.status(405).json({ message: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    await prisma.$disconnect();
  }
}