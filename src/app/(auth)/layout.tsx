import '../globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Image from 'next/image'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Messenger Clone',
    description: 'Messenger Clone',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <div className='flex  min-h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100'>
                    <div className="sm:mx-auto sm:w-full sm:max-w-md">
                        <Image
                            height="48"
                            width="48"
                            className="mx-auto w-auto object-contain"
                            src="/images/logo.png"
                            alt="Logo"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight  text-gray-900">
                            Đăng nhập để bắt đầu
                        </h2>
                    </div>

                    {children}
                </div>
            </body>
        </html>
    )
}
