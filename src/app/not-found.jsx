import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
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

      <section className="not-found">
        <h1>Photographe introuvable</h1>

        <p>
          Le photographe demandé est introuvable ou n'est plus disponible.
        </p>

        <Link href="/">
          Retour au menu principal
        </Link>
      </section>
    </main>
  );
}