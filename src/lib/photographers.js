import prisma from "./prisma";

export async function getAllPhotographers() {
  return await prisma.photographer.findMany();
}

export async function getPhotographerById(id) {
  return await prisma.photographer.findUnique({
    where: {
      id: Number(id),
    },
  });
}

export async function getMediasByPhotographerId(id) {
  return await prisma.media.findMany({
    where: {
      photographerId: Number(id),
    },
  });
}