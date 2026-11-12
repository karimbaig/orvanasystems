import type { Metadata } from "next";
import "@fontsource-variable/outfit";
import "./globals.css";

export const metadata: Metadata = {
  title: "ORVANA — Smart Systems, Networks, Cybersecurity & Digital Design",
  description: "ORVANA brings smart systems, network installation and security, cybersecurity and digital forensics, and website design together. Based in Damascus, serving Syria.",
  icons: { icon: "/favicon.png" },
  openGraph: { title: "ORVANA — A smarter world. Connected.", description: "Smart systems. Networks and security. Cybersecurity. Websites and digital solutions. One team in Damascus.", type: "website" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
