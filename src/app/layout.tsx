// import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/hooks/useAuth";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { InitAuthProvider } from "@/components/context/auth-context";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata = {
  title: "D. HAPPI",
  description: "Customisized company management software",
  icons: {
    icon: "/Logo blue.png"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />
      </head>
      <body className={` antialiased`}>
        <InitAuthProvider>

          <AuthProvider>
            {children}
            <Toaster richColors toastOptions={{}} />
          </AuthProvider>
        </InitAuthProvider>
      </body>
    </html>
  );
}
