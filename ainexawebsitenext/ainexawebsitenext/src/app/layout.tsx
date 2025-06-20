'use client';

import "./globals.css";
import React  from "react";
import Providers from "@/store/Providers";
import Navbar from "@/uicomponets/Navbar";
import ChatBot from "@/uicomponets/Chatbot";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
          <ChatBot />
        </Providers>
      </body>
    </html>
  );
}
