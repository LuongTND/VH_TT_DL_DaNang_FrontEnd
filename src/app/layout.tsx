import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Workshop",
  description: "Workshop",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="w-full h-full">
      <body className='w-full h-full'>
        {children}
      </body>
    </html>
  );
}
