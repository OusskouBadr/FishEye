import { getAllPhotographers } from "@/lib/photographers";
import PhotographerCard from "@/components/PhotographerCard";
import Image from "next/image";


export default async function Home() {
  const photographers = await getAllPhotographers();

  return (
    <main className="home-page">
      <header className="home-header">
        <Image
          src="/assets/logo.png"
          alt="FishEye"
          width={200}
          height={50}
          loading="eager"
        />
        <h1>Nos photographes</h1>
      </header>

      <section className="photographers-grid">
        {photographers.map((photographer) => (
          <PhotographerCard
            key={photographer.id}
            photographer={photographer}
          />
        ))}
      </section>
    </main>
  );
}