import { useState, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { Tag, ChevronLeft, ChevronRight } from "lucide-react";
import "./App.css";
import { ITEMS } from "./data";
import { Cloud, Wave, Zigzag } from "./components/Doodles";
import DeskScene from "./components/DeskScene";
import ItemPanel from "./components/ItemPanel";
import MenuTag from "./components/MenuTag";

function Intro({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1700);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="intro"
      onClick={onDone}
      exit={{ y: "-115%" }}
      transition={{ duration: 1.1, ease: [0.7, 0, 0.2, 1] }}
    >
      <motion.p
        className="intro-word"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        (hello)
      </motion.p>
      <Wave className="intro-wave" />
    </motion.div>
  );
}

const reveal = {
  initial: { opacity: 0, filter: "blur(8px)", y: 12 },
  whileInView: { opacity: 1, filter: "blur(0px)", y: 0 },
  viewport: { once: true, amount: 0.8 },
  transition: { duration: 0.9 },
};

export default function App() {
  const reduceMotion = useReducedMotion();
  const [introDone, setIntroDone] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openIndex, setOpenIndex] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(null);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > window.innerHeight * 0.55);
  });

  const finishIntro = useCallback(() => setIntroDone(true), []);
  const showIntro = !introDone && !reduceMotion;

  useEffect(() => {
    document.body.style.overflow = showIntro ? "hidden" : "";
  }, [showIntro]);

  const openById = (id) => {
    setMenuOpen(false);
    setOpenIndex(ITEMS.findIndex((it) => it.id === id));
  };
  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (dir) =>
      setOpenIndex((i) =>
        i === null ? (dir > 0 ? 0 : ITEMS.length - 1) : (i + dir + ITEMS.length) % ITEMS.length
      ),
    []
  );

  return (
    <>
      <AnimatePresence>{showIntro && <Intro onDone={finishIntro} />}</AnimatePresence>

      {/* compact header once the hero is out of view */}
      <header className={`topbar ${scrolled ? "show" : ""}`}>
        <span className="topbar-sub">(a cozy-corner portfolio)</span>
        <a href="#top" className="display topbar-logo">shinnie.</a>
        <button className="topbar-hi" onClick={() => openById("contact")}>say hi →</button>
      </header>

      <main id="top">
        {/* ---------- hero ---------- */}
        <section className="hero">
          <Cloud className="c1" width={170} drift={30} duration={11} />
          <Cloud className="c2" width={120} drift={-22} duration={8} />
          <Cloud className="c3" width={140} drift={26} duration={10} />
          <div className="hero-title">
            <span className="hero-sub">(a cozy-corner portfolio)</span>
            <motion.h1
              className="display"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={introDone || reduceMotion ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              shinnie.
            </motion.h1>
          </div>
          <span className="scroll-cue">scroll ↓</span>
        </section>

        {/* ---------- taglines ---------- */}
        <section className="taglines">
          <motion.p {...reveal}>Part coder, part crafter, part pickleball player</motion.p>
          <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.25 }}>
            Pull up a chair, stay a while
          </motion.p>
        </section>

        {/* ---------- the desk ---------- */}
        <section className="desk" aria-labelledby="desk-hint">
          <p id="desk-hint" className="hint">
            <span className="dot" /> Everything on the desk has a story. Click around.
          </p>
          <DeskScene items={ITEMS} onOpen={openById} onHover={setHovered} />
          <p className="hover-label" aria-live="polite">
            {hovered ? `→ ${hovered}` : " "}
          </p>
        </section>
      </main>

      {/* ---------- footer ---------- */}
      <footer className="footer">
        <Zigzag className="footer-edge" />
        <div className="footer-row">
          <span>MADE WITH ☕ &amp; 🧶</span>
          <span>shinnie. {new Date().getFullYear()}</span>
        </div>
        <p className="display footer-big">thanks for stopping by :)</p>
        <p className="footer-line">
          is there anything better than a warm latte
          <br />
          and a half-finished crochet project?
        </p>
      </footer>

      {/* ---------- floating dock ---------- */}
      {menuOpen && <div className="menu-backdrop" onClick={() => setMenuOpen(false)} />}
      <div className={`dock ${scrolled ? "show" : ""}`}>
        <AnimatePresence>
          {menuOpen && <MenuTag items={ITEMS} onPick={openById} />}
        </AnimatePresence>
        <div className="dock-pill">
          <button
            onClick={() => setMenuOpen((m) => !m)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <Tag size={17} />
          </button>
          <button onClick={() => step(-1)} aria-label="Previous section">
            <ChevronLeft size={18} />
          </button>
          <button onClick={() => step(1)} aria-label="Next section">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <ItemPanel
            item={ITEMS[openIndex]}
            index={openIndex}
            total={ITEMS.length}
            onClose={close}
            onStep={step}
          />
        )}
      </AnimatePresence>
    </>
  );
}
