import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import Joi from 'joi';
import { activeValidation, redirectUrlValidation, shortcodeGuidValidation } from '@/utilities/validationRules';

const prisma = new PrismaClient();

const guidSchema = Joi.string().required();

const shortcatSchema = Joi.object({
  id: Joi.number(),
  shortcode_guid: shortcodeGuidValidation,
  redirect_url: redirectUrlValidation,
  active: activeValidation
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const {
      query: { guid },
      method,
    } = req;

    const { error: validationError } = guidSchema.validate(guid);

    if (validationError) {
      return res.status(400).json({ message: 'GUID parameter is invalid' });
    }

    // TODO: some magic validation

    switch (method) {
      case 'GET': {
        const shortcat = await prisma.shortcat.findUnique({
          where: { shortcode_guid: String(guid) },
        });

        if (!shortcat) {
          return res.status(404).json({ message: 'Short URL not found' });
        }

        return res.status(200).json(shortcat);
      }

      case 'PATCH': {
        const { error, value } = shortcatSchema.validate(req.body);

        if (error) {
          return res.status(400).json({ message: error.message });
        }

        const updatedShortcat = await prisma.shortcat.update({
          where: { shortcode_guid: String(guid) },
          data: {
            redirect_url: value.redirect_url,
            active: !!value.active,
          },
        });

        return res.status(200).json(updatedShortcat);
      }

      case 'DELETE': {
        const deletedShortcat = await prisma.shortcat.delete({
          where: { shortcode_guid: String(guid) },
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
