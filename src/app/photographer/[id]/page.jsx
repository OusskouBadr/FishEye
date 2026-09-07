import Image from "next/image";
import {getPhotographerById , getMediasByPhotographerId} from "@/lib/photographers";
import ContactButton from "@/components/ContactButton";
import MediaGallery from "@/components/MediaGallery";
import Link from "next/link";
import { notFound } from "next/navigation"

export default async function PhotographerPage({ params }) {
  // je récupère l'id présent dans l'URL /photographer/[id]
  const { id } = await params;

  
  // Récupère les données du photographe correspondant à l'id
  const photographer = await getPhotographerById(id);
  // Gestion d'erreur si id du photographe inexistante
  if (!photographer) {
    notFound();
  }
  // Récupère les médias du photographe correspondant à l'id
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
          {/* Les données affichées ici viennent du photographe récupéré grâce à l'id */}
          <h1>{photographer.name}</h1>

          <p className="photographer-location">
            {photographer.city}, {photographer.country}
          </p>

          <p>{photographer.tagline}</p>
        </div>

        {/* On passe le nom du photographe au composant via une prop */}  
        <ContactButton photographerName={photographer.name} />

        <Image
          className="photographer-portrait"
          // Le chemin de l'image est construit dynamiquement avec le portrait du photographe
          src={`/assets/${photographer.portrait}`}
          alt={photographer.name}
          width={200}
          height={200}
        />
      </section>
      {/* On transmet les médias et le price à la galerie via les props */}
      <MediaGallery medias={medias} price={photographer.price} />
    </main>
  );
}