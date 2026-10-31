import type { AddOn, Category, EventCollection, Product, ProductType, Service, Testimonial } from "./types";

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

export const productTypes: { slug: ProductType; title: string }[] = [
  { slug: "bouquet", title: "זרי פרחים" },
  { slug: "arrangement", title: "סידורים וקופסאות פרחים" },
  { slug: "plant", title: "עציצים וצמחים" },
  { slug: "giftset", title: "מארזי מתנה" },
  { slug: "balloon", title: "בלונים" },
  { slug: "chocolate-wine", title: "שוקולדים ויין" },
];

export const categories: Category[] = [
  { slug: "roses", title: "ורדים", image: img("1559779080-6970e0186790") },
  { slug: "tulips", title: "צבעונים", image: img("1554494583-c4e1649bfe71") },
  { slug: "sunflowers", title: "חמניות", image: img("1597848212624-a19eb35e2651") },
  { slug: "peonies", title: "פיוניות", image: img("1582794543462-0d7922e50cf5") },
  { slug: "orchids", title: "סחלבים", image: img("1610397648930-477b8c7f0943") },
];

export const services: Service[] = [
  { slug: "weddings", title: "חתונות", image: img("1519225421980-715cb0215aed") },
  { slug: "corporate", title: "מתנות לעסקים", image: img("1561181274-ac181107c1ff") },
  { slug: "weekend", title: "פרחי שבוע", image: img("1523694576729-dc99e9c0f9b4") },
];

export interface DeliveryZone {
  city: string;
  cost: number;
  costLabel: string;
  time: string;
}

export const deliveryZones: DeliveryZone[] = [
  { city: "חולון", cost: 0, costLabel: "משלוח חינם", time: "באותו היום בהזמנה עד 14:00" },
  { city: "בת ים", cost: 20, costLabel: "20 ₪", time: "באותו היום בהזמנה עד 14:00" },
  { city: "ראשון לציון", cost: 25, costLabel: "25 ₪", time: "באותו היום בהזמנה עד 14:00" },
  { city: "תל אביב", cost: 35, costLabel: "35 ₪", time: "עד יום עסקים אחד" },
];

export const RUSH_DELIVERY_COST = 30;

export const addOns: AddOn[] = [
  { id: "card", label: "כרטיס ברכה", price: 15, hasTextArea: true },
  { id: "chocolate", label: "קופסת שוקולד", price: 35 },
  { id: "balloon", label: "בלון", price: 20 },
  { id: "vase", label: "אגרטל זכוכית", price: 45 },
];

export const products: Product[] = [
  {
    slug: "red-roses-classic",
    title: "זר ורדים אדומים קלאסי",
    description: "עשרים ורדים אדומים טריים עטופים בעבודת יד",
    longDescription:
      "זר קלאסי ונצחי של ורדים אדומים טריים, נבחרים ביד ועטופים באריזת בוטיק איכותית. מתאים למתנה רומנטית, יום נישואין או כל אירוע שרוצים לומר בו \"אני אוהב אותך\".",
    category: "roses",
    productType: "bouquet",
    images: [img("1559779080-6970e0186790"), img("1548094967-e25a127d1f6d"), img("1512056495345-913a0c261dc8")],
    startingPrice: 189,
    sizes: [
      { size: "S", label: "קלאסי", price: 189 },
      { size: "M", label: "מאוהבים", price: 259, isDefault: true },
      { size: "L", label: "רומנטיקה גדולה", price: 349 },
    ],
    bestSeller: true,
  },
  {
    slug: "pastel-peony-dream",
    title: "זר פיוניות \"חלום פסטל\"",
    description: "פיוניות עדינות בגווני אפרסק וורוד פודרה",
    longDescription:
      "זר אוורירי ורומנטי של פיוניות בגווני פסטל, משודך בירוקים טריים. זר מבוקש במיוחד לעונת האביב, מתנות יום האישה וימי נישואין.",
    category: "peonies",
    productType: "bouquet",
    images: [img("1582794543462-0d7922e50cf5"), img("1575178094668-132dc931ad35"), img("1539622230226-3d4eb483b3f2")],
    startingPrice: 229,
    sizes: [
      { size: "S", label: "קלאסי", price: 229 },
      { size: "M", label: "מאוהבים", price: 299, isDefault: true },
      { size: "L", label: "רומנטיקה גדולה", price: 389 },
    ],
    bestSeller: true,
  },
  {
    slug: "pure-white-elegance",
    title: "זר \"טוהר\" לבן-ירוק",
    description: "זר מינימליסטי בגווני לבן וירוק רך",
    longDescription:
      "שילוב נקי ואלגנטי של פרחים לבנים וירק טרי. בחירה מושלמת לאירועים רשמיים, השקות עסקיות וברכות לבית חדש.",
    category: "orchids",
    productType: "bouquet",
    images: [img("1523694576729-dc99e9c0f9b4"), img("1480511361210-b1b966c8d614"), img("1589244159943-460088ed5c92")],
    startingPrice: 199,
    sizes: [
      { size: "S", label: "קלאסי", price: 199 },
      { size: "M", label: "מאוהבים", price: 269, isDefault: true },
      { size: "L", label: "רומנטיקה גדולה", price: 359 },
    ],
  },
  {
    slug: "spring-in-holon-tulips",
    title: "זר צבעונים \"אביב בחולון\"",
    description: "צבעונים צבעוניים טריים ישר מהשדה",
    longDescription:
      "זר עליז ומלא חיים של צבעונים טריים בשלל צבעים. מגיע ארוז בעיטוף נייר טבעי, מושלם כמתנה קלילה ומרעננת.",
    category: "tulips",
    productType: "bouquet",
    images: [img("1554494583-c4e1649bfe71"), img("1586968295564-92fd7572718b"), img("1587316830148-c9b01df2da38")],
    startingPrice: 149,
    sizes: [
      { size: "S", label: "קלאסי", price: 149 },
      { size: "M", label: "מאוהבים", price: 209, isDefault: true },
      { size: "L", label: "רומנטיקה גדולה", price: 279 },
    ],
  },
  {
    slug: "bright-summer-sunflowers",
    title: "זר חמניות \"קיץ זוהר\"",
    description: "חמניות גדולות וזוהרות עם נגיעות ירוק",
    longDescription:
      "זר שמחה וצבע עם חמניות גדולות וטריות. מושלם למתנה שמחמיאה ומעלה חיוך, ומתאים במיוחד למתנות עידוד ולברכות יום הולדת.",
    category: "sunflowers",
    productType: "bouquet",
    images: [img("1597848212624-a19eb35e2651"), img("1470509037663-253afd7f0f51"), img("1598920710727-e6c74781538c")],
    startingPrice: 169,
    sizes: [
      { size: "S", label: "קלאסי", price: 169 },
      { size: "M", label: "מאוהבים", price: 229, isDefault: true },
      { size: "L", label: "רומנטיקה גדולה", price: 299 },
    ],
  },
  {
    slug: "elegant-orchid",
    title: "זר סחלבים \"אלגנטיות\"",
    description: "סחלבים אקזוטיים בעיצוב מיוחד",
    longDescription:
      "זר יוקרתי ומרשים של סחלבים אקזוטיים, לבחירה המדויקת ביותר. מתאים למתנות יוקרה, פתיחת עסק ואירועים חשובים.",
    category: "orchids",
    productType: "bouquet",
    images: [img("1610397648930-477b8c7f0943"), img("1605996370592-b6f7a81e382e"), img("1599463740831-a5015ef7b65a")],
    startingPrice: 259,
    sizes: [
      { size: "S", label: "קלאסי", price: 259 },
      { size: "M", label: "מאוהבים", price: 329, isDefault: true },
      { size: "L", label: "רומנטיקה גדולה", price: 419 },
    ],
  },
  {
    slug: "single-rose",
    title: "ורד בודד",
    description: "ורד טרי בודד, מושלם כמחווה קטנה או תוספת לכל מתנה",
    longDescription:
      "ורד איכותי בודד, נבחר ביד ונארז בעדינות. אפשר להזמין כמחווה קטנה, כתוספת לזר אחר, או בכמות גדולה יותר לאירוע.",
    category: "roses",
    productType: "bouquet",
    images: [img("1559779080-6970e0186790"), img("1548094967-e25a127d1f6d")],
    startingPrice: 7,
    sizes: [
      { size: "S", label: "ורד בודד", price: 7 },
      { size: "M", label: "3 ורדים", price: 19, isDefault: true },
      { size: "L", label: "7 ורדים", price: 39 },
    ],
  },
  {
    slug: "bridal-bouquet",
    title: "זר כלה קלאסי",
    description: "זר כלה עדין בגווני לבן וקרם, בעיצוב אישי",
    longDescription:
      "זר כלה מעוצב בקפידה בגווני לבן ופסטל, מותאם אישית לשמלה ולסגנון היום הגדול. כולל פגישת ייעוץ קצרה לבחירת הפרחים והעיצוב.",
    category: "orchids",
    productType: "bouquet",
    images: [img("1523694576729-dc99e9c0f9b4"), img("1480511361210-b1b966c8d614")],
    startingPrice: 259,
    sizes: [
      { size: "S", label: "קלאסי", price: 259 },
      { size: "M", label: "עשיר", price: 349, isDefault: true },
      { size: "L", label: "יוקרתי", price: 459 },
    ],
  },
  {
    slug: "flower-crown",
    title: "זר פרחים לראש",
    description: "זר פרחים עדין לראש, מושלם לאירועים וצילומים",
    longDescription:
      "זר פרחים טריים לראש, נארג ביד באותו היום של האירוע כדי לשמור על טריות מקסימלית. פופולרי למסיבות רווקות, ימי הולדת וצילומים.",
    category: "tulips",
    productType: "bouquet",
    images: [img("1554494583-c4e1649bfe71"), img("1587316830148-c9b01df2da38")],
    startingPrice: 89,
    sizes: [
      { size: "S", label: "עדין", price: 89 },
      { size: "M", label: "קלאסי", price: 119, isDefault: true },
      { size: "L", label: "עשיר", price: 159 },
    ],
  },
  {
    slug: "wedding-car-bouquet",
    title: "זר לרכב חתן וכלה",
    description: "זר מעוצב במיוחד לקישוט רכב החתן והכלה",
    longDescription:
      "זר ייחודי המותאם להתקנה על רכב חתן וכלה, בעיצוב תואם לזר הכלה ולצבעי האירוע.",
    category: "peonies",
    productType: "bouquet",
    images: [img("1582794543462-0d7922e50cf5"), img("1575178094668-132dc931ad35")],
    startingPrice: 149,
    sizes: [
      { size: "S", label: "קלאסי", price: 149 },
      { size: "M", label: "עשיר", price: 199, isDefault: true },
      { size: "L", label: "יוקרתי", price: 269 },
    ],
  },
  {
    slug: "signature-gift-box",
    title: "מארז מתנה \"סיגנצ'ר\"",
    description: "מארז פרחים ומתנה משולב, ארוז בעיצוב מיוחד",
    longDescription:
      "מארז מתנה הכולל זר פרחים נבחר יחד עם תוספות לבחירה (שוקולד, יין או בלון), ארוז בעיצוב בוטיק מהודר. מתאים למתנות עסקיות, תודה או ברכה מיוחדת.",
    category: "roses",
    productType: "giftset",
    images: [img("1561181274-ac181107c1ff"), img("1559779080-6970e0186790")],
    startingPrice: 219,
    sizes: [
      { size: "S", label: "קלאסי", price: 219 },
      { size: "M", label: "עשיר", price: 289, isDefault: true },
      { size: "L", label: "יוקרתי", price: 379 },
    ],
  },
  {
    slug: "potted-green-plant",
    title: "עציץ ירוק לבית",
    description: "צמח בית ירוק ועדין, בעציץ קרמיקה מעוצב",
    longDescription:
      "צמח בית קל לתחזוקה בעציץ קרמיקה מעוצב, מתנה שנשארת ומזכירה את האירוע הרבה אחרי שהפרחים קמלים. מתאים לבית חדש, ברכת החלמה או מתנה למשרד.",
    category: "orchids",
    productType: "plant",
    images: [img("1592150621744-aca64f48394a")],
    startingPrice: 129,
    sizes: [
      { size: "S", label: "קטן", price: 129 },
      { size: "M", label: "בינוני", price: 179, isDefault: true },
      { size: "L", label: "גדול", price: 249 },
    ],
  },
  {
    slug: "pastel-balloon-bouquet",
    title: "זר בלונים פסטל",
    description: "צרור בלוני הליום בגווני פסטל, מחזיקים עד 3 שעות",
    longDescription:
      "צרור בלוני הליום בגווני פסטל עדינים, מתנפח במקום ומגיע מעוטר בסרטים. הבלונים מחזיקים עד כ-3 שעות מרגע הניפוח, לכן מומלץ להזמין סמוך למועד האירוע.",
    category: "tulips",
    productType: "balloon",
    images: [img("1787319313547-9e5efaaa11ef")],
    startingPrice: 59,
    sizes: [
      { size: "S", label: "3 בלונים", price: 59 },
      { size: "M", label: "6 בלונים", price: 99, isDefault: true },
      { size: "L", label: "12 בלונים", price: 169 },
    ],
  },
  {
    slug: "premium-chocolate-box",
    title: "מארז שוקולדים פרימיום",
    description: "קופסת שוקולדים בלגיים נבחרים, אפשר להוסיף יין בתיאום מראש",
    longDescription:
      "קופסת שוקולדים בלגיים נבחרים בעיצוב מהודר, מתנה מושלמת כשלעצמה או כתוספת לזר. ניתן לשלב עם בקבוק יין לבחירה בתיאום מראש דרך וואטסאפ.",
    category: "roses",
    productType: "chocolate-wine",
    images: [img("1769775264026-fbc4e974dea8")],
    startingPrice: 89,
    sizes: [
      { size: "S", label: "קופסה קטנה", price: 89 },
      { size: "M", label: "קופסה בינונית", price: 139, isDefault: true },
      { size: "L", label: "קופסה גדולה", price: 199 },
    ],
  },
];

export const events: EventCollection[] = [
  {
    slug: "birthday",
    title: "יום הולדת",
    image: img("1597848212624-a19eb35e2651"),
    productSlugs: ["spring-in-holon-tulips", "bright-summer-sunflowers", "pastel-peony-dream", "pastel-balloon-bouquet"],
  },
  {
    slug: "anniversary",
    title: "יום נישואין",
    image: img("1582794543462-0d7922e50cf5"),
    productSlugs: ["red-roses-classic", "pastel-peony-dream", "bridal-bouquet", "wedding-car-bouquet"],
  },
  {
    slug: "love",
    title: "אהבה ורומנטיקה",
    image: img("1559779080-6970e0186790"),
    productSlugs: ["red-roses-classic", "single-rose"],
  },
  {
    slug: "birth",
    title: "לידה",
    image: img("1523694576729-dc99e9c0f9b4"),
    productSlugs: ["pure-white-elegance", "potted-green-plant"],
  },
  {
    slug: "thanks",
    title: "תודה",
    image: img("1523694576729-dc99e9c0f9b4"),
    productSlugs: ["pure-white-elegance", "elegant-orchid", "bright-summer-sunflowers", "signature-gift-box", "premium-chocolate-box"],
  },
  {
    slug: "holidays",
    title: "חגים",
    image: img("1561181274-ac181107c1ff"),
    productSlugs: ["signature-gift-box", "elegant-orchid", "premium-chocolate-box"],
  },
];

export const testimonials: Testimonial[] = [
  {
    name: "מיכל כהן",
    city: "חולון",
    bouquet: "זר ורדים אדומים קלאסי",
    quote: "הזר הגיע מדויק לשעה שהתבקשה והיה מרהיב. השירות היה אישי וחם, ממש מורגש שאוהבים את מה שעושים.",
  },
  {
    name: "דניאל לוי",
    city: "בת ים",
    bouquet: "זר פיוניות \"חלום פסטל\"",
    quote: "הזמנתי ליום הנישואין שלנו וקיבלתי תמונה של הזר לפני המשלוח - פרט קטן שעשה הבדל גדול.",
  },
  {
    name: "נועה אברהם",
    city: "חולון",
    bouquet: "זר חמניות \"קיץ זוהר\"",
    quote: "זר צבעוני ומרנין, הגיע טרי וארוז בצורה מושלמת. ממליצה בחום!",
  },
  {
    name: "עידו שמעוני",
    city: "ראשון לציון",
    bouquet: "זר סחלבים \"אלגנטיות\"",
    quote: "הזמנה עסקית לפתיחת משרד - נראה יוקרתי בדיוק כמו בתמונה. יחס מקצועי מהרגע הראשון.",
  },
  {
    name: "שירה גולן",
    city: "חולון",
    bouquet: "זר \"טוהר\" לבן-ירוק",
    quote: "אהבתי את העיצוב הנקי והאלגנטי. גם המשלוח הגיע מוקדם מהצפוי.",
  },
];
