import shinniePng from "./assets/shinnie.png";
import coffeePng from "./assets/coffee.png";
import flowerPng from "./assets/flower.png";
import luzzPng from "./assets/luzz.png";

// Fill these in — empty links are hidden from the contact panel.
export const LINKS = {
  github: "",
  instagram:
    "https://www.instagram.com/eighthday_knitch?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  linkedin: "",
  email: "",
};

// Every object on the desk opens one of these. Order = prev/next order.
export const ITEMS = [
  {
    id: "about",
    label: "the photo frame",
    menu: "Who's behind it?",
    title: "hi, i'm shinnie.",
    meta: "Computer Science student · TARUMT · INFP-T",
    body: [
      "Yoooo guys — I'm a Diploma in Computer Science student at TARUMT, currently looking for an opportunity to gain real, hands-on experience.",
      "When I'm not coding you'll find me crocheting, chasing a pickleball, or hunting for a good latte.",
      "不懂要写什么 随便写先 :)",
    ],
    tags: ["Crochet", "Pickleball", "Coffee", "Blog", "App / Web Dev"],
    image: shinniePng,
  },
  {
    id: "projects",
    label: "the laptop",
    menu: "What have you built?",
    title: "projects.",
    meta: "Things I've made with code",
    body: [
      "This portfolio — a hand-drawn little corner of the internet built with React, Vite and Framer Motion. Every doodle on the desk is an inline SVG.",
      "More projects are brewing. Check back soon!",
    ],
    tags: ["React", "Vite", "Framer Motion", "SVG"],
    note: "</> more brewing...",
  },
  {
    id: "crochet",
    label: "the yarn basket",
    menu: "Do you make things?",
    title: "crochet.",
    meta: "eighthday_knitch · handmade pieces",
    body: [
      "Handmade crochet pieces — flowers, bouquets, accessories and more. Every stitch is made slowly and with a lot of love.",
      "The bouquet in the picture never wilts, which is honestly the best feature.",
    ],
    tags: ["Crochet", "Creative"],
    image: flowerPng,
    link: { href: LINKS.instagram, text: "See them on Instagram" },
  },
  {
    id: "coffee",
    label: "the latte",
    menu: "Coffee or tea?",
    title: "coffee.",
    meta: "Daily ritual · cafés, brews & quiet moments",
    body: [
      "Coffee-fuelled, always. A good latte, a quiet café corner and a laptop is my favourite way to spend an afternoon.",
      "Got a café recommendation? Send it my way.",
    ],
    tags: ["Lifestyle", "Café"],
    image: coffeePng,
  },
  {
    id: "pickleball",
    label: "the paddle",
    menu: "Any sports?",
    title: "pickleball.",
    meta: "Weekend courts · still learning the dink",
    body: [
      "My favourite way to get off the screen. Fast, a little chaotic and always fun.",
      "Play pickleball with me?",
    ],
    tags: ["Sport", "Weekends"],
    image: luzzPng,
  },
  {
    id: "blog",
    label: "the notebook",
    menu: "Anything to read?",
    title: "blog.",
    meta: "May 2025 · Starting this blog",
    body: [
      "This is where my little thoughts and ramblings will live.",
      "More posts coming soon...",
    ],
    tags: ["Notes", "Life"],
    note: "dear diary, today i...",
  },
  {
    id: "contact",
    label: "the letters",
    menu: "Say hi!",
    title: "let's connect.",
    meta: "Open to opportunities, collabs & friendly chats",
    body: [
      "Always open to new opportunities, collaborations, or just a friendly chat.",
    ],
    contact: true,
    note: "write me a letter :)",
  },
];
