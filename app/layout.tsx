import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Join",
  description: "Kanban Task Management",
  icons: {
    icon: [
      { url: "/icon-light.svg", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark.svg", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full">
      <body className={`${inter.className} min-h-full`}>
        <div className="landscape-block hidden">
          Bitte drehe dein Gerät in den Hochformat-Modus.
        </div>
        {children}
      </body>
    </html>
  );
}
