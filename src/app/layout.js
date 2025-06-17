// app/layout.js
import { Inter } from "next/font/google"
import "./globals.css"
import SessionWrapper from "@/components/SessionWrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Social Media App",
  description: "Social Media App",
}

export default function RootLayout({ children }) {
  return (
    <SessionWrapper>
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    </SessionWrapper>
  )
}