import Image from "next/image";
import {getPhotographerById , getMediasByPhotographerId} from "@/lib/photographers";
import ContactButton from "@/components/ContactButton";
import MediaGallery from "@/components/MediaGallery";
import Link from "next/link";

export default async function PhotographerPage({ params }) {
  const { id } = await params;

  const photographer = await getPhotographerById(id);
  const medias = await getMediasByPhotographerId(id);

  return (
    <main className="photographer-page">
      <header className="photographer-page-header">
        <Link href="/">
            <Image
                src="/assets/logo.png"
                alt="FishEye - Retour à l'accueil"
                width={200}
                height={50}
            />
        </Link>
      </header>

      <section className="photographer-header">
        <div className="photographer-info">
          <h1>{photographer.name}</h1>

          <p className="photographer-location">
            {photographer.city}, {photographer.country}
          </p>

          <p>{photographer.tagline}</p>
        </div>

        <ContactButton photographerName={photographer.name} />

        <Image
          className="photographer-portrait"
          src={`/assets/${photographer.portrait}`}
          alt={photographer.name}
          width={200}
          height={200}
        />
      </section>

      <MediaGallery medias={medias} price={photographer.price} />
    </main>
  );
}