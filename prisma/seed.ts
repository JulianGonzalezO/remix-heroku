import { PrismaClient } from "@prisma/client";
let db = new PrismaClient();

async function seed() {
  await Promise.all(
    getUsers().map(joke => {
      return db.user.create({ data: joke });
    })
  );
}

seed();

function getUsers() {
  // shout-out to https://icanhazdadjoke.com/

  return [
    {
      email: 'julian@gm',
      name: 'julian',
      posts: undefined,
    },
  ]
}