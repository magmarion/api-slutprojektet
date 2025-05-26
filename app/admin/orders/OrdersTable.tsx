// Fil: app/components/admin/OrdersTable.tsx
'use client';

import { OrderWithRelations, deleteOrder, updateOrder } from '@/app/orders/actions';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

interface Props {
  orders: OrderWithRelations[];
}

export default function OrdersTable({ orders }: Props) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onDelete = (id: string) => {
    if (!confirm('Är du säker på att du vill radera den här ordern?')) return;
    startTransition(async () => {
      await deleteOrder(id);
      router.refresh();
    });
  };

  const onMarkSent = (id: string) => {
    startTransition(async () => {
      await updateOrder(id, { status: 'skickat' });
      router.refresh();
    });
  };

  return (
    <table className="min-w-full border-collapse">
      <thead>
        <tr>
          <th className="border px-4 py-2">ID</th>
          <th className="border px-4 py-2">Kund</th>
          <th className="border px-4 py-2">Produkter</th>
          <th className="border px-4 py-2">Totalt</th>
          <th className="border px-4 py-2">Status</th>
          <th className="border px-4 py-2">Åtgärder</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td className="border px-4 py-2">{order.id}</td>
            <td className="border px-4 py-2">{order.user.name}</td>
            <td className="border px-4 py-2">
              <ul className="list-disc pl-5">
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.product.title} × {item.quantity}
                  </li>
                ))}
              </ul>
            </td>
            <td className="border px-4 py-2">{order.total} SEK</td>
            <td className="border px-4 py-2 capitalize">{order.status}</td>
            <td className="border px-4 py-2 space-x-2">
              <button
                className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-50"
                disabled={isPending}
                onClick={() => onDelete(order.id)}>
                Radera
              </button>
              {order.status !== 'skickat' && (
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded disabled:opacity-50"
                  disabled={isPending}
                  onClick={() => onMarkSent(order.id)}>
                  Markera som skickat
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
