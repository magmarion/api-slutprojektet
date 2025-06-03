export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='p-4 md:p-10 bg-gradient-to-b from-[#FEFAE1] to-[#F4D794]'>
      {children}
    </div>
  );
}