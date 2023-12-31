import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Sidebar from './components/sidebar/sidebar'
import { ClerkProvider } from '@clerk/nextjs'
import {auth} from '@clerk/nextjs/server'
import Bottombar from './components/bottombar/bottombar'

// export const dynamic = "force-dynamic";
// import { SignOutButton, SignedIn, UserButton, useUser } from '@clerk/nextjs'

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Task Manager',
//   description: 'Manager your tasks through a simple and intuitive portal',
// }


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // const {isSignedIn, user, isLoaded} = useUser();

  const { userId } : { userId: string | null } = auth();
  return (
    <ClerkProvider>
      <html lang="en" data-theme="dark">
        <body className={inter.className} suppressHydrationWarning={true}>
          <div className=' flex lg:gap-10 lg:p-10 h-dvh flex-col lg:flex-row'>
            {userId && <Sidebar />}
            <div className=' w-full lg:p-2 bg-primary-content lg:rounded-box h-5/6 lg:h-full'>{children}</div>
            {userId && <Bottombar/>}
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
