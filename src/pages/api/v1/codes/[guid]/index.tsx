import { prismaHelper } from '@/utilities/prisma';
import { Shortcat } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { guid },
    method,
  } = req;

  if (typeof guid !== 'string') {
    return res.status(400).json({ message: 'GUID parameter is invalid' });
  }

  // TODO: some magic validation

  switch (method) {
    case 'GET':
      try {
        const shortcat = await prismaHelper<Shortcat | null>((prisma) =>
          prisma.shortcat.findUnique({
            where: { shortcode_guid: guid },
          })
        );

        if (!shortcat) {
          return res.status(404).json({ message: 'Short URL not found' });
        }

        return res.status(200).json(shortcat);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    case 'PATCH':
      try {
        const { redirect_url, active } = req.body;

        if (!redirect_url) {
          return res.status(400).json({ message: 'Invalid request body' });
        }

        const updatedShortcat = await prismaHelper<Shortcat>((prisma) =>
          prisma.shortcat.update({
            where: { shortcode_guid: guid },
            data: {
              redirect_url,
              active: !!active,
            },
          })
        );

        return res.status(200).json(updatedShortcat);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    case 'DELETE':
      try {
        const deletedShortcat = await prismaHelper<Shortcat>((prisma) =>
          prisma.shortcat.delete({
            where: { shortcode_guid: guid },
          })
        );

        return res.status(200).json(deletedShortcat);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
}
