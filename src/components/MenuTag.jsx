import { motion } from "framer-motion";

// The menu is a little handmade-goods price tag, hanging from a string.
export default function MenuTag({ items, onPick }) {
  return (
    <motion.nav
      className="menu-tag"
      aria-label="Sections"
      initial={{ y: 40, opacity: 0, rotate: -4 }}
      animate={{ y: 0, opacity: 1, rotate: -1.5 }}
      exit={{ y: 40, opacity: 0, rotate: 2 }}
      transition={{ type: "spring", stiffness: 220, damping: 20 }}
    >
      <span className="tag-hole" aria-hidden="true" />
      <p className="display tag-title">shinnie's corner</p>
      <p className="tag-sub">handmade with care · no. {new Date().getFullYear()}</p>
      <ul>
        {items.map((it, i) => (
          <li key={it.id}>
            <button onClick={() => onPick(it.id)}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {it.menu}
            </button>
          </li>
        ))}
      </ul>
      <p className="tag-foot">thank you for visiting :)</p>
    </motion.nav>
  );
}
