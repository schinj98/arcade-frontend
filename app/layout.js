// app/layout.js
import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Script from 'next/script';
import { ProfileProvider } from "@/context/ProfileContext";


export const metadata = {
  title: 'Arcade Points Calculator | Track Your Points & Progress',
  description: 'Instantly calculate and track arcade points with our modern and accurate platform. Personalized, secure and fast.',
  keywords: 'arcade points calculator, GCP points facilitator points check, arcade tracking, learning badges, google cloud arcade points calculator, profile tracker',
  openGraph: {
    title: 'Arcade Points Calculator',
    description: 'Track your learning achievements and progress with Arcade Track!',
    url: 'https://arcadetrack.com',
    siteName: 'Arcade Track',
    verification: {
      google: "JOyjc_CM0VPz54VOGFsxreNldPVnZVuZXJv9qIl0Vjc",
    },
    images: [
      {
        url: 'https://arcadetrack.com/',
        width: 1200,
        height: 630,
        alt: 'Arcade Track Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arcade Track - Points Calculator',
    description: 'A smart way to calculate and track arcade points!',
    images: ['https://arcadetrack.com'],
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ECCG3B88Q0"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-ECCG3B88Q0');
            `,
          }}
        />
      </head>
      <body className="bg-blue-50 text-gray-900">
        <ProfileProvider>
          <Navbar />
            <main className="min-h-screen ">
            {/* <div className="px-6 sm:px-10 md:px-10 lg:px-50 xl:px-10 py-1"> */}
              {children}
            {/* </div> */}
            </main>
          <Footer />
        </ProfileProvider>
      </body>
    </html>
  )
}