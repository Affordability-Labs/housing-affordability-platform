import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Affordability Labs | Housing Affordability Platform",
    template: "%s | Affordability Labs",
  },
  description:
    "A civic-tech housing affordability platform for rent, commute, savings, and neighborhood tradeoff analysis in San Diego.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#060e0c] text-slate-100">
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
