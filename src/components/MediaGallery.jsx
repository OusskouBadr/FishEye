"use client";

import { useState } from "react";
import MediaCard from "./MediaCard";
import Lightbox from "./Lightbox";
import { updateMediaLikes } from "@/app/actions";

export default function MediaGallery({ medias, price }) {
  const [mediaList, setMediaList] = useState(medias);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [sortBy, setSortBy] = useState("popularity");

  const totalLikes = mediaList.reduce((total, media) => {
    return total + media.likes;
  }, 0);

  const sortedMedias = [...mediaList].sort((a, b) => {
  if (sortBy === "popularity") {
    return b.likes - a.likes;
  }

  if (sortBy === "date") {
    return new Date(b.date) - new Date(a.date);
  }

  if (sortBy === "title") {
    return a.title.localeCompare(b.title);
  }

  return 0;
});

  function openLightbox(index) {
    setCurrentIndex(index);
  }

  function closeLightbox() {
    setCurrentIndex(null);
  }

  function showPrevious() {
    setCurrentIndex(
      (currentIndex - 1 + mediaList.length) % mediaList.length
    );
  }

  function showNext() {
    setCurrentIndex(
      (currentIndex + 1) % mediaList.length
    );
  }

  async function handleLike(mediaId) {
    const updatedMedias = mediaList.map((media) => {
      if (media.id === mediaId) {
        return {
          ...media,
          likes: media.likes + 1,
        };
      }

      return media;
    });

    setMediaList(updatedMedias);

    const media = updatedMedias.find(
      (media) => media.id === mediaId
    );

    await updateMediaLikes(mediaId, media.likes);
  }

  return (
    <>
    <div className="sort-container">
        <label htmlFor="sort">Trier par</label>

        <select
            id="sort"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
        >
            <option value="popularity">Popularité</option>
            <option value="date">Date</option>
            <option value="title">Titre</option>
        </select>
    </div>
    
      <section className="media-gallery">
        {sortedMedias.map((media, index) => (
          <MediaCard
            key={media.id}
            media={media}
            onClick={() => openLightbox(index)}
            onLike={handleLike}
          />
        ))}
      </section>

        <div className="photographer-stats">
        <span>{totalLikes} ♥</span>
        <span>{price}€ / jour</span>
        </div>

      {currentIndex !== null && (
        <Lightbox
          medias={sortedMedias}
          currentIndex={currentIndex}
          onClose={closeLightbox}
          onPrevious={showPrevious}
          onNext={showNext}
        />
      )}
    </>
  );
}