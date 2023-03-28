import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      query: { guid },
      method,
    } = req;

    if (typeof guid !== 'string') {
      return res.status(400).json({ message: 'GUID parameter is invalid' });
    }

    // TODO: some magic validation

    switch (method) {
      case 'GET': {
        const shortcat = await prisma.shortcat.findUnique({
          where: { shortcode_guid: guid },
        });

        if (!shortcat) {
          return res.status(404).json({ message: 'Short URL not found' });
        }

        return res.status(200).json(shortcat);
      }

      case 'PATCH': {
        const { redirect_url, active } = req.body;

        if (!redirect_url) {
          return res.status(400).json({ message: 'Invalid request body' });
        }

        const updatedShortcat = await prisma.shortcat.update({
          where: { shortcode_guid: guid },
          data: {
            redirect_url,
            active: !!active,
          },
        });

        return res.status(200).json(updatedShortcat);
      }

      case 'DELETE': {
        const deletedShortcat = await prisma.shortcat.delete({
          where: { shortcode_guid: guid },
        });

        return res.status(200).json(deletedShortcat);
      }

      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
}