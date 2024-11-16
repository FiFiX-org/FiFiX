import { Roboto } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
import { Navbar } from "./Navbar";
import { RainbowProvider } from "./RainbowProvider";

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
      <body className={`${roboto.className}`}>
        <RainbowProvider>
          <div className=" relative w-full">
            <Navbar />
            {children}
          </div>
        </RainbowProvider>
        <Toaster />
      </body>
    </html>
  );
}
