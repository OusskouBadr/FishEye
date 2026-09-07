import Image from "next/image";

// Props reçu depuis MediaGallery :   v       v        v
export default function MediaCard({ media, onClick, onLike }) {
  return (
    <article className="media-card">
      {/* bouton qui permet d'ouvrir le média dans la lightbox */}
      <button
        className="media-button"
        onClick={onClick}
        // aria-label donne un nom explicite au bouton pour les lecteurs d'écran ( accessibilité )
        aria-label={`Ouvrir ${media.title}`}
      >
        {/* Condition : si media.image existe , on l'affiche sinon afficher l'autre ( ici vidéo ) */}
        {media.image ? (
          <Image
            // Le chemin est construit dynamiquement avec le nom du fichier
            src={`/assets/${media.image}`}
            alt={media.title}
            width={350}
            height={300}
            // ici Eager charge l'image immédiatement
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
          // On envoie l'id du média à la fonction onLike pour savoir quel média est impacté
          onClick={() => onLike(media.id)}
          // Nom accessible pour le bouton
          aria-label={`Ajouter un like à ${media.title}`}
        >
          {media.likes} ♥
        </button>
      </div>
    </article>
  );
}