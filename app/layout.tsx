import type {Metadata} from 'next';
import './globals.css'; // Global styles
import { AuthProvider } from '@/context/AuthContext';

export const metadata: Metadata = {
  title: 'OpenKM Cape Town • Non-Motorized Transport Feeder Hub',
  description: 'A protective, open mobility layer for MyCiTi and minibus taxis with dual-use hub infrastructure.',
  openGraph: {
    title: 'OpenKM Cape Town • Non-Motorized Transport Feeder Hub',
    description: 'A protective, open mobility layer for MyCiTi and minibus taxis with dual-use hub infrastructure.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OpenKM Cape Town • Non-Motorized Transport Feeder Hub',
    description: 'A protective, open mobility layer for MyCiTi and minibus taxis with dual-use hub infrastructure.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <head>
        <script src="https://accounts.google.com/gsi/client" async defer></script>
      </head>
      <body suppressHydrationWarning>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

