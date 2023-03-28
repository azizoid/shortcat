import { prismaHelper } from '@/utilities/prisma';
import { Shortcat } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'

import { v4 as uuidv4 } from 'uuid';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      try {
        const shortcat = await prismaHelper<Shortcat[]>((prisma) =>
          prisma.shortcat.findMany()
        );

        if (!shortcat.length) {
          return res.status(404).json({ message: 'Short URL not found' });
        }

        return res.status(200).json(shortcat);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    case 'POST':
      try {
        const { redirect_url } = req.body;

        // TODO: add some other validaitons here
        if (!redirect_url) {
          throw new Error('Redirect Url is not provided.')
        }

        const newShortcat = await prismaHelper<Shortcat>(async (prisma) => {
          const shortcatData = {
            shortcode_guid: uuidv4(),
            redirect_url,
            active: true
          }
          return await prisma.shortcat.create({ data: shortcatData })
        });

        res.status(200).json(newShortcat)
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}