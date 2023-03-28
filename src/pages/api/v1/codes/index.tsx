import { prismaHelper } from '@/utilities/prisma';
import { Shortcat } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'

import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        const shortcat = await prismaHelper<Shortcat[]>((prisma) =>
          prisma.shortcat.findMany()
        );
        return res.status(200).json(shortcat);

      case 'POST':
        const { redirect_url } = req.body;
        if (!redirect_url) {
          throw new Error('Redirect Url is not provided.');
        }

        // TODO: Make some elfic magical validation

        const newShortcat = await prismaHelper<Shortcat>(async (prisma) => {
          const shortcatData = {
            shortcode_guid: uuidv4(),
            redirect_url,
            active: true,
          };
          return await prisma.shortcat.create({ data: shortcatData });
        });

        return res.status(200).json(newShortcat);

      default:
        return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}