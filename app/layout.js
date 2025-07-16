// app/layout.js
import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ProfileProvider } from "@/context/ProfileContext";

export const metadata = {
  title: 'Arcade Track',
  description: 'Modern and Accurate Arcade Calculating / trackign Platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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