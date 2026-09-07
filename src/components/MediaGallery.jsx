// Ce composant doit être exécuté côté navigateur, pas uniquement côté serveur ( ici on utilise useState + intéractions user)
"use client";

import { useState } from "react";
import MediaCard from "./MediaCard";
import Lightbox from "./Lightbox";
import { updateMediaLikes } from "@/app/actions";

export default function MediaGallery({ medias, price }) {
  const [mediaList, setMediaList] = useState(medias);
  // Index du média actuellement ouvert dans la lightbox, null = aucune lightbox ouverte
  const [currentIndex, setCurrentIndex] = useState(null);
  const [sortBy, setSortBy] = useState("popularity");

  // Calcule le total des likes de tous les médias et reduce permet de transformer tout le tableau en une seule valeur
  const totalLikes = mediaList.reduce((total, media) => {
    return total + media.likes;
  }, 0);

  // Spread operator pour créer nv tableau a cause du sort() ducoup copie + tri de la copie 
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

  // Ouvre la lightbox sur le média correspondant à l'index cliqué
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

  // Gestion du clic sur un like.
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

    // recherche le média modifié pour récupérer sa nouvelle valeur de likes
    const media = updatedMedias.find(
      (media) => media.id === mediaId
    );

    // Met a jour également le nombre de likes dans la bdd
    await updateMediaLikes(mediaId, media.likes);
  }

  return (
    <>
    {/* Zone de sélection du tri */}
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
    
    {/* galerie des médias aprés application du tri */}
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

        {/* Stats du photographe */}  
        <div className="photographer-stats">
        <span>{totalLikes} ♥</span>
        <span>{price}€ / jour</span>
        </div>

      {/* Condition : lightbox existe si currentIndex n'est pas null */}
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