import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';
import { authOptions } from '@/auth/[...nextauth]';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { category } = req.query;
  if (!category || Array.isArray(category))
    return res.status(400).json({ message: 'Missing category fields' });

  switch (req.method) {
    case 'GET':
      const articles = await prisma.article.findMany({
        include: {
          categories: true,
        },
        where: {
          categories: {
            some: {
              type: category,
            },
          },
        },
      });
      console.log(articles);
      res.status(200).json({ articles });
      break;
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
