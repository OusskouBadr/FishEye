const { PrismaClient } = require("@prisma/client");
const photographers = require("../data/photographer.json");
const medias = require("../data/media.json");

const prisma = new PrismaClient();

async function main() {
  await prisma.media.deleteMany();
  await prisma.photographer.deleteMany();

  // Insère tous les photographes du JSON dans la table Photographer
  await prisma.photographer.createMany({
    data: photographers,
  });

  // Insère tous les photographes du JSON dans la table Media
  await prisma.media.createMany({
    data: medias,
  });

  console.log("Base de données remplie !");
}

main()
  .catch((error) => {
    console.error(error);
  })
  // on ferme proprement la connexion avec Prisma.
  .finally(async () => {
    await prisma.$disconnect();
  });