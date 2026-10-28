import { motion } from "framer-motion";

// One clickable object on the desk. The outer <g> carries the hover wiggle
// (CSS transform), so any SVG transform for placement goes on an inner <g>.
function Item({ id, label, onOpen, onHover, dot, children }) {
  const open = () => onOpen(id);
  return (
    <g
      className="desk-item"
      role="button"
      tabIndex={0}
      aria-label={`Open ${label}`}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
      onMouseEnter={() => onHover(label)}
      onMouseLeave={() => onHover(null)}
      onFocus={() => onHover(label)}
      onBlur={() => onHover(null)}
    >
      {children}
      <circle className="hotspot-ring" cx={dot[0]} cy={dot[1]} r="9" />
      <circle className="hotspot" cx={dot[0]} cy={dot[1]} r="6" />
    </g>
  );
}

const windowClouds = (
  <g clipPath="url(#window-clip)">
    <motion.g
      animate={{ x: [0, 40, 0] }}
      transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
    >
      <path className="ln" d="M132 120 C128 110 138 104 146 107 C148 96 162 92 169 100 C174 92 190 94 191 106 C200 103 208 112 204 120 M122 120 H214" />
      <path className="ln" d="M232 200 C228 190 238 184 246 187 C248 176 262 172 269 180 C274 172 290 174 291 186 C300 183 308 192 304 200 M222 200 H318" />
    </motion.g>
  </g>
);

export default function DeskScene({ items, onOpen, onHover }) {
  const props = (id, dot) => ({
    id,
    dot,
    label: items.find((it) => it.id === id).label,
    onOpen,
    onHover,
  });

  return (
    <svg
      className="desk-scene"
      viewBox="40 40 960 600"
      role="group"
      aria-label="An illustrated desk — each object opens a section"
    >
      <defs>
        <clipPath id="window-clip">
          <rect x="112" y="62" width="226" height="186" rx="7" />
        </clipPath>
      </defs>

      {/* ---------- wall: window (decoration) ---------- */}
      <rect className="pp" x="110" y="60" width="230" height="190" rx="8" />
      {windowClouds}
      <path className="ln" d="M225 60 V250 M110 155 H340" />
      <rect className="pp" x="96" y="250" width="258" height="14" rx="4" />
      {/* little cactus on the sill */}
      <path className="pp" d="M300 250 L296 230 H326 L322 250 Z" />
      <path className="soft" d="M304 230 V206 Q311 196 318 206 V230 Z" />
      <path className="ln" d="M304 216 H298 V206 M318 220 H324 V212" />

      {/* ---------- wall: photo frame → about ---------- */}
      <Item {...props("about", [505, 98])}>
        <path className="ln" d="M455 64 L410 92 M455 64 L500 92" />
        <circle className="ink" cx="455" cy="63" r="4" />
        <rect className="pp" x="400" y="90" width="110" height="135" rx="4" />
        <rect className="soft" x="412" y="102" width="86" height="111" rx="2" />
        <path className="pp" d="M425 213 C428 182 482 182 485 213 Z" />
        <circle className="pp" cx="455" cy="150" r="19" />
        <path className="ink" d="M436 150 A19 19 0 0 1 474 150 C466 138 446 138 436 150 Z" />
        <path className="ink" d="M472 142 C486 146 486 168 478 176 C480 162 476 152 470 148 Z" />
        <circle className="ink" cx="448" cy="153" r="2" />
        <circle className="ink" cx="462" cy="153" r="2" />
        <path className="ln thin" d="M450 161 Q455 165 460 161" />
      </Item>

      {/* ---------- wall: shelf ---------- */}
      <path className="ln thick" d="M600 256 H905" />
      <path className="ln" d="M636 258 V284 L664 258 M869 258 V284 L841 258" />

      {/* plant (decoration) */}
      <path className="pp" d="M832 214 C820 180 796 176 784 170 C806 166 828 184 832 214 Z" />
      <path className="pp" d="M836 214 C842 176 864 162 882 160 C870 176 852 190 836 214 Z" />
      <path className="pp" d="M834 214 C830 186 836 160 846 146 C850 168 844 192 834 214 Z" />
      <path className="pp" d="M800 256 L792 214 H876 L868 256 Z" />
      <path className="ln" d="M796 228 H872" />

      {/* ---------- shelf: notebooks → blog ---------- */}
      <Item {...props("blog", [712, 160])}>
        <g transform="rotate(10 760 256)">
          <rect className="pp" x="728" y="166" width="34" height="90" rx="3" />
          <path className="ln" d="M728 186 H762 M728 236 H762" />
        </g>
        <rect className="pp" x="640" y="150" width="80" height="106" rx="5" />
        <rect className="soft" x="640" y="150" width="16" height="106" rx="4" />
        <rect className="pp" x="670" y="178" width="38" height="22" rx="2" />
        <path className="ln thin" d="M676 186 H702 M676 193 H694" />
        {[164, 180, 196, 212, 228, 244].map((y) => (
          <circle key={y} className="pp" cx="648" cy={y} r="3.5" />
        ))}
      </Item>

      {/* ---------- desk ---------- */}
      <rect className="pp" x="110" y="464" width="22" height="168" rx="3" />
      <rect className="pp" x="868" y="464" width="22" height="168" rx="3" />
      <rect className="pp" x="600" y="464" width="250" height="92" rx="4" />
      <path className="ln" d="M600 510 H850" />
      <path className="ln thick" d="M712 487 H738 M712 533 H738" />
      <rect className="pp" x="80" y="440" width="840" height="24" rx="5" />
      <path className="ln" d="M46 632 H994" />

      {/* ---------- desk: yarn basket → crochet ---------- */}
      <Item {...props("crochet", [296, 352])}>
        <path className="ln thick" d="M232 384 L286 318" />
        <circle className="ink" cx="287" cy="317" r="4" />
        <circle className="soft" cx="190" cy="372" r="28" />
        <path className="ln thin" d="M168 360 Q190 382 214 362 M164 376 Q190 398 216 380 M176 348 Q204 358 210 392" />
        <circle className="caramel" cx="250" cy="364" r="32" />
        <path className="ln thin" d="M222 352 Q250 374 280 354 M220 370 Q250 392 282 372 M236 336 Q264 350 270 392" />
        <path className="pp" d="M150 380 H300 L288 437 Q287 440 283 440 H167 Q163 440 162 437 Z" />
        <path className="ln thin" d="M154 398 H296 M157 413 H293 M160 428 H290" />
        <path className="ln thin" d="M180 380 V440 M210 380 V440 M240 380 V440 M270 380 V440" />
        <path className="ln" d="M298 392 C322 400 312 430 344 438" />
      </Item>

      {/* ---------- desk: laptop → projects ---------- */}
      <Item {...props("projects", [598, 298])}>
        <rect className="pp" x="395" y="290" width="210" height="140" rx="10" />
        <rect className="ink" x="410" y="304" width="180" height="112" rx="4" />
        <rect className="code" x="424" y="320" width="54" height="7" rx="3.5" />
        <rect className="code dim" x="438" y="336" width="88" height="7" rx="3.5" />
        <rect className="code dim" x="438" y="352" width="64" height="7" rx="3.5" />
        <rect className="code accent" x="452" y="368" width="96" height="7" rx="3.5" />
        <rect className="code dim" x="438" y="384" width="40" height="7" rx="3.5" />
        <rect className="code cursor" x="424" y="398" width="12" height="9" rx="1" />
        <path className="pp" d="M372 428 H628 L644 440 H356 Z" />
        <path className="ln thin" d="M480 434 H520" />
      </Item>

      {/* ---------- desk: latte → coffee ---------- */}
      <Item {...props("coffee", [740, 368])}>
        <path className="ln thin steam s1" d="M676 366 C668 354 684 346 676 334" />
        <path className="ln thin steam s2" d="M690 362 C682 348 698 340 690 324" />
        <path className="ln thin steam s3" d="M704 366 C696 354 712 346 704 334" />
        <ellipse className="pp" cx="690" cy="436" rx="52" ry="6" />
        <path className="ln" d="M722 390 C750 386 750 422 718 420" />
        <path className="pp" d="M654 378 H726 L718 424 Q716 433 706 433 H674 Q664 433 662 424 Z" />
        <ellipse className="caramel" cx="690" cy="379" rx="36" ry="6" />
        <path className="paper-fill" d="M690 384 C682 378 684 374 690 377 C696 374 698 378 690 384 Z" />
        <path className="ln thin" d="M666 400 H714" />
      </Item>

      {/* ---------- desk: letters → contact ---------- */}
      <Item {...props("contact", [856, 360])}>
        <g transform="rotate(-8 806 390)">
          <rect className="pp" x="768" y="362" width="78" height="54" rx="3" />
          <path className="ln" d="M768 364 L807 392 L846 364" />
        </g>
        <g transform="rotate(7 820 396)">
          <rect className="pp" x="782" y="372" width="76" height="50" rx="3" />
          <path className="ln" d="M782 374 L820 400 L858 374" />
          <path className="soft" d="M820 410 C810 402 812 394 820 399 C828 394 830 402 820 410 Z" />
        </g>
        <path className="pp" d="M760 408 H866 V440 H760 Z" />
        <path className="ln thin" d="M774 424 H852" />
      </Item>

      {/* ---------- floor: paddle + ball → pickleball ---------- */}
      <Item {...props("pickleball", [944, 446])}>
        <circle className="pp" cx="850" cy="616" r="15" />
        <circle className="ink" cx="843" cy="610" r="2.6" />
        <circle className="ink" cx="856" cy="608" r="2.6" />
        <circle className="ink" cx="852" cy="621" r="2.6" />
        <circle className="ink" cx="840" cy="622" r="2" />
        <circle className="ink" cx="861" cy="619" r="2" />
        <g transform="rotate(-12 950 632)">
          <rect className="pp" x="938" y="556" width="24" height="76" rx="6" />
          <path className="ln thin" d="M938 572 L962 564 M938 588 L962 580 M938 604 L962 596 M938 620 L962 612" />
          <rect className="pp" x="910" y="430" width="80" height="132" rx="30" />
          {[
            [930, 460], [956, 452], [972, 478], [940, 492], [924, 520],
            [962, 510], [948, 540], [976, 534], [932, 470], [966, 462],
          ].map(([x, y], i) => (
            <circle key={i} className={i % 3 ? "ink" : "caramel-dot"} cx={x} cy={y} r={i % 2 ? 2.2 : 3} />
          ))}
        </g>
      </Item>
    </svg>
  );
}
