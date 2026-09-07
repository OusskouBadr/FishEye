"use client";

import { useEffect } from "react";

export default function ContactModal({ photographerName, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      // si l'utilisateur appuie sur Echap, on ferme la modale
      if (event.key === "Escape") {
        onClose();
      }
    }
    // ajoute l'écoute clavier quand la modale est affichée
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  function handleSubmit(event) {
    event.preventDefault();

    // Récupère directement l'élément <form>.
    const form = event.currentTarget;
    const formData = new FormData(event.target);

    // Dans ce projet, les données sont affichés dans la console car on les affiches nulle part
    console.log("Prénom :", formData.get("firstName"));
    console.log("Nom :", formData.get("lastName"));
    console.log("Email :", formData.get("email"));
    console.log("Message :", formData.get("message"));

    // vide tous les champs après la soumission sans fermer la modale
    form.reset();
  }

  return (
    // overlay = fond autour de la modale , cliquer dessus ferme la fenêtre
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="contact-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-title"
        // empêche le clic dans la modale de remonter jusqu'à l'overlay
        onClick={(event) => event.stopPropagation()}
      >

      {/* Bouton de fermeture */}
      <button
        type="button"
        className="close-modal"
        onClick={onClose}
        aria-label="Fermer la modale"
      >
        ×
      </button>

      <h2 id="contact-title">
        Contactez-moi
        <br />
        {photographerName}
      </h2>

        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">Prénom</label>
          <input id="firstName" name="firstName" type="text" />

          <label htmlFor="lastName">Nom</label>
          <input id="lastName" name="lastName" type="text" />

          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" />

          <label htmlFor="message">Votre message</label>
          <textarea id="message" name="message" required/>

          <button type="submit">Envoyer</button>
        </form>
      </div>
    </div>
  );
}