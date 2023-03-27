import { prismaHelper } from '@/utilities/prisma';
import { Shortcat } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'

import { v4 as uuidv4 } from 'uuid';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  if (req.method !== 'POST') {
    throw new Error('Invalid request method.')
  }

  const { redirect_url } = req.body;

  // TODO: add some other validaitons here
  if (!redirect_url) {
    throw new Error('Redirect Url is not provided.')
  }

  try {
    const newShortcat = await prismaHelper<Shortcat>(async (prisma) => {
      const shortcatData = {
        shortcode_guid: uuidv4(),
        redirect_url,
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