
import './globals.css'
import Navbar from '../components/Navbar'
import CountdownNotificationBar from '../components/CountdownNotificationBar'
import Footer from '../components/Footer'
import Script from 'next/script';
import { ProfileProvider } from "@/context/ProfileContext";
import { ThemeProvider } from '../context/ThemeContext';
import AdSenseProvider from '../components/AdSenseProvider';


export const metadata = {
  title: 'Arcade Points Calculator | Track Your Points & Progress',
  description: 'Instantly calculate and track arcade points with our modern and accurate platform. Personalized, secure and fast.',
  keywords: 'arcade points calculator, GCP points facilitator points check, arcade facilitator points calculate, learning badges, google cloud arcade points calculator, profile tracker',
  icons: {
    icon: '/images/logo.png',
  },
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
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Theme Flash Prevention Script - Must be executed before any rendering */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'light';
                  if (theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
        <link rel="icon" href="/images/logo.png" type="image/png" />
        <meta name="google-adsense-account" content="ca-pub-5183171666938196"></meta>
        <meta name="google-site-verification" content="JOyjc_CM0VPz54VOGFsxreNldPVnZVuZXJv9qIl0Vjc" />
        
        
        {/* Google Analytics Script */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-ECCG3B88Q0"
          strategy="afterInteractive"
        />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5183171666938196"
          crossOrigin="anonymous"
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
      <body className="bg-blue-50 text-gray-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
        <ThemeProvider>
          <ProfileProvider>
            <Navbar />
            {/* <CountdownNotificationBar /> */}
            <main className="min-h-screen ">
            <AdSenseProvider publisherId="ca-pub-5183171666938196">
              {children}
            </AdSenseProvider>
            </main>
            <Footer />
          </ProfileProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
