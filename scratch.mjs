import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

await prisma.user.create({
  data: {
    name: "Rick",
  }
})