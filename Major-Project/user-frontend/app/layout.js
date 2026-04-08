import { Geist, Geist_Mono } from "next/font/google";
import SessionBootstrap from "@/components/auth/SessionBootstrap";
import ReduxProvider from "@/components/providers/ReduxProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import "swiper/css";
import "swiper/css/effect-fade";
// import AIRecommendations from "../components/AIRecommendations";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "StreamForge",
  description: "Movie Site",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReduxProvider>
          <SessionBootstrap />
          <Header />
          <div className="flex-1">{children}</div>
          {/* < AIRecommendations/> */}
          <Footer />
        </ReduxProvider>
      </body>
    </html>
  );
}
