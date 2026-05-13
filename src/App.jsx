import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./App.css";
import ribbonPng from "./assets/ribbon.png";
import shinniePng from "./assets/shinnie.png";
import coffeePng from "./assets/coffee.png";
import flowerPng from "./assets/flower.png";
import luzzPng from "./assets/luzz.png";

const Sticker = ({ sticker, constraintsRef }) => {
  const [showWords, setShowWords] = useState(false);

  useEffect(() => {
    let timer;
    if (showWords) {
      timer = setTimeout(() => {
        setShowWords(false);
      }, 2000);
    }
    return () => clearTimeout(timer);
  }, [showWords]);

  return (
    <motion.div
      className="sticker"
      style={{ top: sticker.top, left: sticker.left }}
      drag
      dragConstraints={constraintsRef}
      dragMomentum={true}
      whileHover={{ scale: 1.1, rotate: 0 }}
      whileTap={{ scale: 0.95 }}
      initial={{ rotate: sticker.rotate }}
      onTap={() => setShowWords((prev) => !prev)}
    >
      <AnimatePresence>
        {showWords && sticker.message && (
          <motion.div
            className="sticker-message"
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            {typeof sticker.message === "function"
              ? sticker.message()
              : sticker.message}
          </motion.div>
        )}
      </AnimatePresence>

      {sticker.type === "image" ? (
        <img
          src={sticker.content}
          className="sticker-img"
          draggable={false}
          alt="sticker"
          style={{ width: sticker.size }}
        />
      ) : (
        <div
          className="sticker-emoji"
          style={{
            fontSize: sticker.size,
            padding: sticker.size ? sticker.size / 3 : undefined,
          }}
        >
          {sticker.content}
        </div>
      )}
    </motion.div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState("about");
  const constraintsRef = useRef(null);

  const stickers = [
    {
      id: 1,
      type: "image",
      content: ribbonPng,
      top: "35%",
      left: "80%",
      rotate: -10,
      size: 40,
      message: "So cute~",
    },
    {
      id: 2,
      type: "image",
      content: shinniePng,
      top: "50%",
      left: "75%",
      rotate: 0,
      size: 300,
      message: "Hello",
    },
    {
      id: 3,
      type: "image",
      content: coffeePng,
      top: "65%",
      left: "80%",
      rotate: -15,
      size: 120,
      message: "Coffee fueled ☕",
    },

    // 🌸 FLOWER STICKER WITH INSTAGRAM CARD
    {
      id: 4,
      type: "image",
      content: flowerPng,
      top: "80%",
      left: "70%",
      rotate: 5,
      size: 120,
      message: () => (
        <div style={{ width: "210px" }}>
          <p style={{ margin: "0 0 10px 0", fontWeight: "600", fontSize: "14px" }}>
            🌸 Flower made by crochet
          </p>

          <div
            style={{
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "14px",
              padding: "12px",
              background: "linear-gradient(135deg, rgba(193,53,132,0.25), rgba(131,58,180,0.25))",
              backdropFilter: "blur(6px)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
              <div style={{
                width: "32px", height: "32px", borderRadius: "50%",
                background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "16px"
              }}>📷</div>
              <div>
                <p style={{ margin: 0, fontWeight: "bold", fontSize: "13px" }}>eighthday_knitch</p>
                <p style={{ margin: 0, fontSize: "11px", color: "#ccc" }}>Instagram</p>
              </div>
            </div>

            <p style={{ margin: "0 0 8px 0", fontSize: "12px", color: "#ddd" }}>
              Handmade crochet pieces 🧶✨
            </p>

            <a
              href="https://www.instagram.com/eighthday_knitch?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: "block",
                textAlign: "center",
                padding: "6px 12px",
                borderRadius: "8px",
                background: "linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)",
                color: "#fff",
                fontSize: "12px",
                fontWeight: "bold",
                textDecoration: "none",
                cursor: "pointer",
              }}
            >
              View on Instagram →
            </a>
          </div>
        </div>
      ),
    },

    {
      id: 5,
      type: "image",
      content: luzzPng,
      top: "50%",
      left: "50%",
      rotate: 0,
      size: 180,
      message: "Play Pickleball with me?",
    },
  ];

  return (
    <div className="app" ref={constraintsRef}>
      {/* STICKERS */}
      {stickers.map((sticker) => (
        <Sticker
          key={sticker.id}
          sticker={sticker}
          constraintsRef={constraintsRef}
        />
      ))}

      {/* MAIN CARD */}
      <motion.div
        className="main-card"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* NAV */}
        <div className="nav-pill">
          <button
            className={activeTab === "about" ? "active" : ""}
            onClick={() => setActiveTab("about")}
          >
            About
          </button>
          <button
            className={activeTab === "projects" ? "active" : ""}
            onClick={() => setActiveTab("projects")}
          >
            Projects
          </button>
          <button
            className={activeTab === "contact" ? "active" : ""}
            onClick={() => setActiveTab("contact")}
          >
            Contact
          </button>
        </div>

        {/* CONTENT */}
        <div className="card-content">
          {activeTab === "about" && (
            <motion.div
              className="hero"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1>About Me</h1>
              <div style={{ textAlign: "left" }}>
                <p>Hi, I'm Shinnie, a Diploma in Computer Science student at TARUMT.</p>
                <p>Seeking an opportunity to gain practical experience.</p>
              </div>
            </motion.div>
          )}

          {activeTab === "projects" && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2>Projects</h2>
              <div className="projects-grid">
                <div className="project-item">
                  <h3>Portfolio Website ✨</h3>
                  <p>
                    A digital scrapbook built with React & Framer Motion.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "contact" && (
            <motion.div
              style={{ textAlign: "center" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2>Let's build something</h2>
              <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
                <FaGithub size={28} />
                <FaTwitter size={28} />
                <FaLinkedin size={28} />
                <FaEnvelope size={28} />
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}