import { Unbounded, Instrument_Sans, Vazirmatn } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
});

export const metadata = {
  title: "4OURGARDEN — A Symphony of Scents",
  description:
    "Perfume objects with a sphere for a head and a cube for a heart. Composed in Tehran, collected from Tehran to Muscat. Explore the collections and find a stockist near you.",
  openGraph: {
    title: "4OURGARDEN — A Symphony of Scents",
    description:
      "Perfume objects with a sphere for a head and a cube for a heart. Composed in Tehran, collected everywhere.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${instrument.variable} ${vazirmatn.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
