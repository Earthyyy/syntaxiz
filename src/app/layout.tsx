"use client";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/header/navbar";
import { ReactFlowProvider } from "reactflow";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Syntaxiz</title>
      </head>
      <body className="min-h-screen flex flex-col">
        <ReactFlowProvider>
          <Navbar />
          {children}
        </ReactFlowProvider>
      </body>
    </html>
  );
}
