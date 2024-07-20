import { GsapInit } from "@/components/GsapInit"
import { Header } from "@/components/Header"
import { Nav } from "@/components/Nav"
import { NoMobile } from "@/components/NoMobile"
import { MetadataSeo } from "@/libs/metadata"
import "@/styles/globals.scss"
import { Viewport } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getLocale, getMessages } from "next-intl/server"
import localFont from "next/font/local"
import NextTopLoader from "nextjs-toploader"
import { Toaster } from "sonner"
import { ModalWork } from "./(components)/ModalWork"
import styles from "./layout.module.scss"

const fontMain = localFont({
  variable: "--font-main",
  display: "swap",
  src: [
    {
      path: "./fonts/cabinet-grotesk/CabinetGrotesk-Variable.woff2",
      style: "normal"
    }
  ]
})

export const viewport: Viewport = {
  themeColor: "rgb(5, 8, 17)",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
}

export async function generateMetadata() {
  const title = "The Big Grift"
  const description = "Alpha Version V0.37"

  return MetadataSeo({ title, description })
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const locale = await getLocale()
  const messages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning={true}>
      <body className={fontMain.variable} suppressHydrationWarning={true}>
        <NextTopLoader
          color="var(--pink)"
          height={2}
          showSpinner={false}
          zIndex={999999}
        />
        <GsapInit />
        <NextIntlClientProvider messages={messages}>
          <div className={styles.layout}>
            <Header />
            <div className={styles.main} data-ref="main">
              {children}
            </div>
            <Nav />
            <Toaster
              position="top-center"
              visibleToasts={1}
              toastOptions={{
                className: styles.toast
              }}
            />
          </div>
          <div id="modal-root" />
          <NoMobile />
          <ModalWork />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
