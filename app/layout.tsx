import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BookBazaar",
  description: "BookBazaar - Your dream book",
};

if(typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    localStorage.clear()
  })
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`bg-black antialiased`}>{children}</body>
    </html>
  );
}
