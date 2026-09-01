"use server";

import prisma from "@/lib/prisma";

export async function updateMediaLikes(mediaId, likes) {
  await prisma.media.update({
    where: {
      id: mediaId,
    },
    data: {
      likes,
    },
  });
}