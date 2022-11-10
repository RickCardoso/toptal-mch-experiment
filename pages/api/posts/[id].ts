import { PrismaClient } from "@prisma/client";
import {NextApiRequest, NextApiResponse} from "next";

const prisma = new PrismaClient();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    if (!req?.query?.id) {
      res.status(400).send('Please provide an id')
    } else {
      return prisma.post.findUnique({
        where: {
          id: parseInt(req.query.id.toString()),
        }
      }).then((post) => {
        res.status(200).json(post)
      }).catch((err) => {
        res.status(500).json({ error: err });
      });
    }
  } else {
    res.status(405)
  }
}