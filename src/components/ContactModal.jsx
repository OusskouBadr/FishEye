"use client";

import { useEffect } from "react";

export default function ContactModal({ photographerName, onClose }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    console.log("Prénom :", formData.get("firstName"));
    console.log("Nom :", formData.get("lastName"));
    console.log("Email :", formData.get("email"));
    console.log("Message :", formData.get("message"));
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
     <div
      className="contact-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-title"
      onClick={(event) => event.stopPropagation()}
    >
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