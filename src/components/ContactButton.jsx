"use client";

import { useState } from "react";
import ContactModal from "./ContactModal";

export default function ContactButton({ photographerName }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="contact-button"
        onClick={() => setIsOpen(true)}
      >
        Contactez-moi
      </button>

      {isOpen && (
        <ContactModal
          photographerName={photographerName}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
}