import Image from "next/image";
import Link from "next/link";

export default function PhotographerCard({ photographer }) {
  return (
    <article className="photographer-card">
      <Link href={`/photographer/${photographer.id}`}>
        <Image
          className="photographer-photo"
          src={`/assets/${photographer.portrait}`}
          alt={photographer.name}
          width={200}
          height={200}
        />

        <h2>{photographer.name}</h2>
      </Link>

      <p className="location">
        {photographer.city}, {photographer.country}
      </p>

      <p className="tagline">{photographer.tagline}</p>

      <p className="price">{photographer.price}€/jour</p>
    </article>
  );
}