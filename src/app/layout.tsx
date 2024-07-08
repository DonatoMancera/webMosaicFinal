"use client"
import {metadata} from "@/app/metadata"
import { Poppins } from "next/font/google";
import NavBar from "@/ui/NavBar/navbar";
import Footer from "@/ui/Footer/footer"; 
import {Mystyle} from "@/styles/mystyles"

const poppins = Poppins({ subsets: ["latin"], weight: ["700", "400"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <Mystyle>
          <NavBar />
            <main>{children}</main>
          <Footer />
        </Mystyle>
          
      </body>
    </html>
  );
}

