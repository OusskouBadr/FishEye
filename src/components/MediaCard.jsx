import Image from "next/image";

export default function MediaCard({ media, onClick, onLike }) {
  return (
    <article className="media-card">
      <button
        className="media-button"
        onClick={onClick}
        aria-label={`Ouvrir ${media.title}`}
      >
        {media.image ? (
          <Image
            src={`/assets/${media.image}`}
            alt={media.title}
            width={350}
            height={300}
            loading="eager"
          />
        ) : (
          <video
            src={`/assets/${media.video}`}
            width="350"
            height="300"
          />
        )}
      </button>

      <div className="media-info">
        <h2>{media.title}</h2>
        <button
          className="like-button"
          onClick={() => onLike(media.id)}
          aria-label={`Ajouter un like à ${media.title}`}
        >
          {media.likes} ♥
        </button>
      </div>
    </article>
  );
}