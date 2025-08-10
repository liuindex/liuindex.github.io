import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "免费在线拼图工具",
  description: "免费在线拼图工具，纯前端客户端渲染，提供拼接图和长图拼接两大核心模式。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <header className="fixed top-0 left-0 right-0 h-14 md:h-16 bg-white shadow-sm z-50 flex items-center px-4">
          <nav className="w-full max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center gap-2">
              <img src="/next.svg" alt="Logo" className="w-8 h-8" />
              <span className="text-base md:text-xl font-medium">免费在线拼图工具</span>
            </div>
            <div className="hidden md:flex gap-8 text-gray-600">
              <a href="#" className="hover:text-blue-600">功能特性</a>
              <a href="#" className="hover:text-blue-600">我们的承诺</a>
            </div>
            <button className="bg-blue-600 text-white px-4 py-1.5 md:px-6 md:py-2 text-sm md:text-base rounded-md md:rounded-lg hover:bg-blue-700 transition-colors">
              立即使用
            </button>
          </nav>
        </header>
        <main className="mt-14 md:mt-16">
          {children}
        </main>
      </body>
    </html>
  );
}
