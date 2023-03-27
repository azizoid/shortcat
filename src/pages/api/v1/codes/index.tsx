import { prismaHelper } from '@/utilities/prisma';
import { Shortcat } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'

const { uuid } = require('uuidv4');

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const newShortcat = await prismaHelper<Shortcat>(async (prisma) => {
      const shortcatData = {
        shortcode_guid: uuid(),
        redurect_url: 'www.com',
        active: true
      }
      return await prisma.shortcat.create({ data: shortcatData })
    });

    res.status(200).json(newShortcat)
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export default handler