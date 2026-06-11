export const COLLECTIONS = [
  {
    id: "sugar-rush",
    index: "01",
    name: "Sugar Rush",
    moods: ["cherry cola", "picnic gingham", "a red ball nose"],
    bg: "#c42b20",
    sphere: "#e8453a",
    text: "#fdf6ef",
  },
  {
    id: "forza",
    index: "02",
    name: "Forza",
    moods: ["petrol & podium spray", "chess clock tension", "green flag"],
    bg: "#1d5c3c",
    sphere: "#3f8f5f",
    text: "#f2f7ee",
  },
  {
    id: "majestime",
    index: "03",
    name: "Majestime",
    moods: ["velvet seats", "opera dusk", "candied plum"],
    bg: "#4d3592",
    sphere: "#8f76d6",
    text: "#f4f0fb",
  },
  {
    id: "saffron",
    index: "04",
    name: "Saffron",
    moods: ["crimson threads", "warm rice steam", "a thimble of gold"],
    bg: "#b8431c",
    sphere: "#e8852b",
    text: "#fdf4ea",
  },
  {
    id: "for-you",
    index: "05",
    name: "For You",
    moods: ["love letters", "blush ribbon", "soft musk"],
    bg: "#d4789d",
    sphere: "#f0b7cc",
    text: "#2c1220",
  },
  {
    id: "mini",
    index: "06",
    name: "Mini Collection",
    moods: ["the whole garden", "pocket-sized", "carry it everywhere"],
    bg: "#2742c8",
    sphere: "#6e86f0",
    text: "#f3f4fb",
  },
];

export const LOCATIONS = [
  {
    city: "Tehran",
    cityFa: "تهران",
    country: "Iran",
    shops: [
      { name: "گالری پارادایم", address: "فرمانیه، پاساژ سنتر، طبقه همکف" },
      { name: "گالری H", address: "سعادت‌آباد، ساختمان مدرن زعفرانیه، طبقه اول" },
      { name: "۸ بیتی", address: "آوا سنتر اقدسیه، کانسپت استور ۸ بیتی" },
      { name: "گالری پسیمنه", address: "سعادت‌آباد، مگامال سنتر، طبقه همکف" },
      { name: "گالری ادیت", address: "فرمانیه، عمارت روستا، طبقه ۹ (دراوو)" },
      { name: "گالری محو", address: "کریمخان، خیابان سنایی، نبش اعراقی ۶" },
      { name: "آن پروجکت", address: "شریعتی، بالاتر از یخچال، پروژن آن" },
      { name: "چشم و چراغ", address: "نیاوران، بوتیک چشم و چراغ" },
      { name: "سوق استور", address: "مطهری، لرستان، کوچه عبده، پلاک ۱۹، طبقه ۴" },
    ],
  },
  {
    city: "Muscat",
    cityFa: "مسقط",
    country: "Oman",
    shops: [{ name: "DOT BY NANA", address: "مسقط، هتل W" }],
  },
  {
    city: "Isfahan",
    cityFa: "اصفهان",
    country: "Iran",
    shops: [
      { name: "گالری لاب", address: "خیابان استانداری، روبروی لمیز" },
      {
        name: "آرت‌شاپ کوزن",
        address:
          "خیابان حکیم نظامی، خیابان سنگتراش‌های غربی، تبریزی‌ها، روبروی هتل میناس، بن‌بست ۲۱",
      },
    ],
  },
  {
    city: "Shiraz",
    cityFa: "شیراز",
    country: "Iran",
    shops: [
      { name: "کانسپت استور سمت", address: "ابتدای کوی وحدت، نبش خروجی مجتمع دراک" },
      { name: "MTL ROOM", address: "قصرالدشت، نگارخانه سه‌سوزان" },
    ],
  },
  {
    city: "Zanjan",
    cityFa: "زنجان",
    country: "Iran",
    shops: [{ name: "آرتمن", address: "شهرک کارمندان، خیابان اول غربی، پلاک ۱۱۸۸" }],
  },
  {
    city: "Mashhad",
    cityFa: "مشهد",
    country: "Iran",
    shops: [
      { name: "گالری نسترن خانی", address: "بلوار سجاد، بزرگمهر جنوبی ۲۲، پلاک ۶" },
    ],
  },
  {
    city: "Karaj",
    cityFa: "کرج",
    country: "Iran",
    shops: [{ name: "کانسپت استور میدون", address: "گلشهر، میدان گلها" }],
  },
  {
    city: "Ahvaz",
    cityFa: "اهواز",
    country: "Iran",
    shops: [
      {
        name: "کانسپت استور ریشه",
        address: "کیانپارس، خیابان ایدون، بین خیابان ۱ و ۲، ساختمان ۵، طبقه ۴",
      },
    ],
  },
  {
    city: "Mazandaran",
    cityFa: "مازندران",
    country: "Iran",
    shops: [
      { name: "کافه دریا", address: "رویان به سمت نوشهر، روبروی حسن آباد" },
      { name: "SOU ATELIER", address: "نوشهر، ورودی کافه رستوران کوچینی" },
    ],
  },
  {
    city: "Yazd",
    cityFa: "یزد",
    country: "Iran",
    shops: [{ name: "آرت شاپ ممکن", address: "بلوار دانشگاه، کوچه فرساد، پلاک ۸" }],
  },
];

export const SHOP_COUNT = LOCATIONS.reduce((n, c) => n + c.shops.length, 0);
export const CITY_COUNT = LOCATIONS.length;
