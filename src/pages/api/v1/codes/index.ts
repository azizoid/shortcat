import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';
import short from 'short-uuid';

import Joi from 'joi';
import { redirectUrlValidation } from '@/utilities/validationRules/validationRules';

const shortcatSchema = Joi.object({
  redirect_url: redirectUrlValidation
});

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'GET':
        const shortcat = await prisma.shortcat.findMany()
        return res.status(200).json(shortcat);

      case 'POST':
        const { error, value } = shortcatSchema.validate(req.body);

        if (error) {
          return res.status(400).json({ message: error.message });
        }

        const newShortcat = await prisma.shortcat.create({
          data: {
            shortcode_guid: short.generate(),
            redirect_url: value.redirect_url,
            active: true,
          }
        });

        return res.status(200).json(newShortcat);

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
