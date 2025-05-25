// app/admin/layout.tsx
import Link from 'next/link';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='p-4 md:p-10'>
      <header className='mb-6 flex justify-between items-center'>
        <h1 className='text-3xl font-bold'>Admin Dashboard</h1>
        <nav className='space-x-4'>
          <Link href='/admin' className='underline'>
            Produkter
          </Link>
          <Link href='/admin/orders' className='underline'>
            Ordrar
          </Link>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
}
