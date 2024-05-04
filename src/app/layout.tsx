import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { getServerSession } from 'next-auth';
import { Toaster } from 'react-hot-toast';

import SessionProvider from '@/providers/SessionProvider';
import NavMenu from '@/components/NavMenu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'HEMA',
	description: 'Portal Hal Ehwal Mahasiswa IKRAM',
};

export default async function RootLayout({ children }: { readonly children: React.ReactNode }) {
	const session = await getServerSession();

	return (
		<html lang="en">
			<body className={inter.className}>
				<SessionProvider session={session}>
					<NavMenu />
					{children}
				</SessionProvider>
				<Toaster />
			</body>
		</html>
	);
}
