export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='p-4 md:p-10'>
      {children}
    </div>
  );
}