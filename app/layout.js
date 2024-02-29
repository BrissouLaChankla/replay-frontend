import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Replay - Pour ne jamais oublier les moments où Skander nous a dit qu'il allait 1v9",
  description: "Uploadez et visionnez les meilleurs moment d'esport. La crème de la crème",
};

export default function RootLayout({ children }) {
  return (
    <>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </>
    );
}
