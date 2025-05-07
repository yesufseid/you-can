

import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { Providers } from "./Redux/Provider";
import "./globals.css";
import Headre from "./components/Header";
import AddCat from "./components/AddCat";


const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "You-Can Measure",
  description: "A simple tool to help households estimate the weight of their plastic waste by item count or image, built with Next.js and Supabase.",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
              <main>
                  <Headre />
                {children}
                <AddCat />
              </main>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
