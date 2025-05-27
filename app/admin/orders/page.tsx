// Fil: app/admin/orders/page.tsx
import { getOrders } from '@/app/orders/actions';
import OrdersTable from './OrdersTable';

export default async function OrdersPage() {
  const orders = await getOrders();
  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Ordrar</h1>
      <OrdersTable orders={orders} />
    </div>
  );
}


