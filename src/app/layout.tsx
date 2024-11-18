import localFont from "next/font/local";
import "./assets/styles/globals.css";
import { Providers } from "./providers";
import DropUpButton from "@/app/components/DropUpButton";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";

const geistSans = localFont({
  src: "./assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Blog App",
  description: "Add post to a blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressContentEditableWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.6.0/css/all.css"
        />

        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.6.0/css/sharp-duotone-solid.css"
        />

        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.6.0/css/sharp-thin.css"
        />

        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.6.0/css/sharp-solid.css"
        />

        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.6.0/css/sharp-regular.css"
        />

        <link
          rel="stylesheet"
          href="https://site-assets.fontawesome.com/releases/v6.6.0/css/sharp-light.css"
        />

        <link
          rel="shortcut icon"
          href="https://cdn-icons-png.flaticon.com/128/2065/2065254.png"
          type="image/x-icon"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Providers>
            <Navbar />
            {children}
            <DropUpButton />
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
