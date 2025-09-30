import type { Metadata } from "next";
import "./globals.css";
import FontProvider from "./FontProvider";

export const metadata: Metadata = {
  title: "Quan Doan - Portfolio",
  description: "Personal portfolio website with Windows XP desktop experience",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <FontProvider>{children}</FontProvider>
      </body>
    </html>
  );
}
