import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function handler(req, res) {
  if (req.method === 'GET') {
    return prisma.post.findMany().then((posts) => {
      res.status(200).json(posts)
    }).catch((err) => {
      res.status(500).json({ error: err });
    });
  } else if (req.method === 'POST') {
    return prisma.post.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        authorId: 1,
      },
    }).then((post) => {
      res.status(200).json(post)
    }).catch((err) => {
      res.status(500).json({error: err})
    });
  } else {
    res.status(405)
  }
}