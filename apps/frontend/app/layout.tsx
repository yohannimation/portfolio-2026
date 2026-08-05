import type { Metadata } from "next";
import { Comfortaa } from "next/font/google";
import localFont from 'next/font/local'

import Header from "@/components/ui/header";
import Footer from "@/components/ui/footer";

import "./globals.css";

const moonGet = localFont({
  src: './fonts/moon_get/moon_get-Heavy.ttf',
  variable: '--font-moon-get'
})

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Yohannimation",
    template: "%s - Yohannimation",
  },
  description: "Développeur Front-End passionné par l'expérience utilisateur. J'imagine et développe des interfaces performantes, tout en explorant la création visuelle et l'animation.",
  authors: [{ name: "Yohann RENAULD" }],
  creator: "Yohann RENAULD",
  publisher: "Yohann RENAULD",
  alternates: {
    canonical: `https://yohannimation.fr/`
  },
  openGraph: {
    title: {
      default: "Yohannimation",
      template: "%s - Yohannimation",
    },
    description: "Développeur Front-End passionné par l'expérience utilisateur. J'imagine et développe des interfaces performantes, tout en explorant la création visuelle et l'animation.",
    siteName: "Yohannimation portfolio",
    locale: "fr",
    url: "https://yohannimation.fr/",
    countryName: "France"
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${moonGet.variable} ${comfortaa.variable} h-full antialiased`}
    >
      <body className="
        relative
        mx-auto
        min-h-lvh
        max-w-[1920px]
        flex flex-col
        bg-background/50
        shadow-[0_0_50px_rgba(56,132,35,0.15),0_0_20px_rgba(56,132,35,0.2),0_0_15px_rgba(56,132,35,0.3)]
      ">
        <Header />
        <main className="relative bg-background min-h-screen z-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
