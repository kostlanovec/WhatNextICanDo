import '@/app/ui/global.css';
import { lusitana } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body className={`${lusitana.className} antialiased`}>{children}</body>
    </html>
  );
}
