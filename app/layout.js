// app/layout.js
import './globals.css'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'


export const metadata = {
  title: 'Arcade Track',
  description: 'Modern and Accurate Arcade Calculating / trackign Platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
          {/* ✅ Wrap all components that need context inside Provider */}
          <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
          <Footer />
      </body>
    </html>
  )
}