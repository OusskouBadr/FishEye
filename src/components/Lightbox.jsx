"use client";

import Image from "next/image";
import { useEffect } from "react";

export default function Lightbox({
  medias,
  currentIndex,
  onClose,
  onPrevious,
  onNext,
}) {
  const media = medias[currentIndex];

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onPrevious, onNext]);

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div
        className="lightbox"
        role="dialog"
        aria-modal="true"
        aria-label={`Aperçu de ${media.title}`}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="lightbox-close"
          onClick={onClose}
          aria-label="Fermer la lightbox"
          type="button"
        >
          ×
        </button>

        <button
          className="lightbox-previous"
          onClick={onPrevious}
          aria-label="Média précédent"
          type="button"
        >
          ‹
        </button>

        <div className="lightbox-content">
          {media.image ? (
            <Image
              src={`/assets/${media.image}`}
              alt={media.title}
              width={700}
              height={600}
            />
          ) : (
            <video
              src={`/assets/${media.video}`}
              controls
              aria-label={media.title}
            />
          )}

          <p>{media.title}</p>
        </div>

        <button
          type="button"
          className="lightbox-next"
          onClick={onNext}
          aria-label="Média suivant"
        >
          ›
        </button>
      </div>
    </div>
  );
}