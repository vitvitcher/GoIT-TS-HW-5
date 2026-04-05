import { createPortal } from "react-dom";
import css from './Modal.module.css'
import { useEffect } from "react";
import NoteForm from "../NoteForm/NoteForm";
import type { NoteBody } from "../../types/note";

interface MovieModalProps {
  onClose: () => void;
  onNoteSubmit: (note: NoteBody) => void
}

export default function Modal({ onClose, onNoteSubmit }: MovieModalProps) {

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(<div
    className={css.backdrop}
    role="dialog"
    aria-modal="true"
    onClick={handleBackdropClick}
  >
    <div className={css.modal}>
      <NoteForm onCancel={onClose} onSubmit={onNoteSubmit}></NoteForm>
    </div>
  </div>,
    document.body
  );
}
