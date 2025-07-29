import type { Metadata } from "next";
import "./globals.css";
import LandingPage from "./landingPage/page";


export const metadata: Metadata = {
  title: "Workshop",
  description: "Workshop",
};

export default function RootLayout() {
  return (
    <html lang="vi" className="w-full h-full">
      <body className='w-full h-full'>
        <LandingPage />
      </body>
    </html>
  );
}
