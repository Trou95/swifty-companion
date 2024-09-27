'use client';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import { ReactNode, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { AuthProvider, useAuth } from '@/context/auth-provider';
import axios from '@/lib/axios';
import BrowserAPI from '@/lib/browser.api';
import { mapUser } from '@/utilities/map-user';
import { NextUIProvider } from '@nextui-org/react';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

/*
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
 */

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen`}
      >
        <AuthProvider>
          <NextUIProvider>{children}</NextUIProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
