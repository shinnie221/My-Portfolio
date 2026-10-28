import { useEffect } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { FaGithub, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { LINKS } from "../data";
import { Zigzag } from "./Doodles";

const CONTACTS = [
  { key: "github", label: "GitHub", Icon: FaGithub },
  { key: "instagram", label: "Instagram", Icon: FaInstagram },
  { key: "linkedin", label: "LinkedIn", Icon: FaLinkedin },
  { key: "email", label: "Email", Icon: FaEnvelope },
].filter((c) => LINKS[c.key]);

export default function ItemPanel({ item, index, total, onClose, onStep }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onStep]);

  return (
    <motion.div
      className="panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="panel-title"
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ duration: 0.6, ease: [0.7, 0, 0.2, 1] }}
    >
      <div className="panel-controls">
        <span className="panel-count">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
        <button className="icon-btn" onClick={() => onStep(-1)} aria-label="Previous">
          <ChevronLeft size={18} />
        </button>
        <button className="icon-btn" onClick={() => onStep(1)} aria-label="Next">
          <ChevronRight size={18} />
        </button>
        <button className="icon-btn" onClick={onClose} aria-label="Close">
          <X size={18} />
        </button>
      </div>

      <motion.div
        key={item.id}
        className="panel-body"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <div className="panel-text">
          <h2 id="panel-title" className="display panel-title">{item.title}</h2>
          <p className="panel-meta">{item.meta}</p>
          {item.body.map((line) => (
            <p key={line} className="panel-copy">{line}</p>
          ))}

          {item.tags && (
            <ul className="chips">
              {item.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          )}

          {item.link?.href && (
            <a className="pill-link" href={item.link.href} target="_blank" rel="noopener noreferrer">
              {item.link.text} <ArrowUpRight size={16} />
            </a>
          )}

          {item.contact && (
            <div className="contact-links">
              {CONTACTS.map(({ key, label, Icon }) => (
                <a
                  key={key}
                  className="pill-link"
                  href={key === "email" ? `mailto:${LINKS.email}` : LINKS[key]}
                  target={key === "email" ? undefined : "_blank"}
                  rel="noopener noreferrer"
                >
                  <Icon size={15} /> {label}
                </a>
              ))}
            </div>
          )}
        </div>

        {item.image ? (
          <motion.img
            className="panel-sticker"
            src={item.image}
            alt=""
            draggable={false}
            initial={{ rotate: -8, scale: 0.9 }}
            animate={{ rotate: 3, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.25 }}
          />
        ) : (
          item.note && (
            <motion.div
              className="panel-note"
              aria-hidden="true"
              initial={{ rotate: 6, scale: 0.9 }}
              animate={{ rotate: -3, scale: 1 }}
              transition={{ type: "spring", stiffness: 120, damping: 12, delay: 0.25 }}
            >
              <span className="display">{item.note}</span>
            </motion.div>
          )
        )}
      </motion.div>

      <Zigzag className="panel-edge" />
    </motion.div>
  );
}
