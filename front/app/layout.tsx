import { Roboto } from "next/font/google";
import "./globals.css";
import { Navbar } from "./Navbar";

const roboto = Roboto({
  weight: "400",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.className}`}
      >
          <div className="relative container mx-auto p-8 w-full">
            <Navbar/>
            {children}
          </div>
      </body>
    </html>
  );
}
