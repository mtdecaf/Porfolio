import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const moonglade = localFont({
  src: [{ path: "./fonts/moongladeLight.ttf",weight: "100", style: "normal" }, 
    {path: "./fonts/moongladeRegular.ttf", weight: "400", style: "normal" },
    {path:"./fonts/moongladeBold.ttf", weight: "700", style: "bold" },
  ],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Apply font to the body */}
      <body className={`${moonglade.className} antialiased`}>{children}</body>
    </html>
  );
}
