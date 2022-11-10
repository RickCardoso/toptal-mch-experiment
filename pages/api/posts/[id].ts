import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function handler(req, res) {
  if (req.method === 'GET') {
    return prisma.post.findUnique({
      where: {
        id: parseInt(req.query.id),
      }
    }).then((post) => {
      res.status(200).json(post)
    }).catch((err) => {
      res.status(500).json({ error: err });
    });
  } else {
    res.status(405)
  }
}