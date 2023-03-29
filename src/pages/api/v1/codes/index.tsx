import { prismaHelper } from '@/utilities/prisma';
import { Shortcat } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import short from 'short-uuid';

import Joi from 'joi';

const shortcatSchema = Joi.object({
  redirect_url: Joi.string().custom((value) => {
    const pattern = /^http(s)?:\/\//i;
    if (!pattern.test(value)) {
      return "https://" + value;
    }
    return value;
  }).uri().required().messages({
    'string.base': 'Redirect URL must be a string',
    'string.uri': 'Redirect URL must be a valid URL. Try adding `https://`',
    'any.required': 'Redirect URL is required',
  }),
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        const shortcat = await prismaHelper<Shortcat[]>((prisma) =>
          prisma.shortcat.findMany()
        );
        return res.status(200).json(shortcat);

      case 'POST':
        const { error, value } = shortcatSchema.validate(req.body);

        if (error) {
          return res.status(400).json({ message: error.message });
        }

        const newShortcat = await prismaHelper<Shortcat>(async (prisma) => {
          const shortcatData = {
            shortcode_guid: short.generate(),
            redirect_url: value.redirect_url,
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
