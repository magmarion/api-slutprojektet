// Fil: app/admin/orders/page.tsx
'use client';

import { useState, useEffect } from 'react';

interface Order {
  id: string;
  userId: string;
  items: any; // Anpassa typ om du har ett mer specifikt items-schema
  total: number;
  status: string;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Hämta alla ordrar
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/orders');
      if (!res.ok) throw new Error('Kunde inte hämta ordrar');
      const data: Order[] = await res.json();
      setOrders(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Radera order
  const deleteOrder = async (id: string) => {
    if (!confirm('Är du säker på att du vill radera den här ordern?')) return;
    try {
      const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Kunde inte radera ordern');
      await fetchOrders();
    } catch (e: any) {
      alert(e.message);
    }
  };

  // Markera som skickat
  const markSent = async (id: string) => {
    try {
      const res = await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'skickat' }),
      });
      if (!res.ok) throw new Error('Kunde inte uppdatera status');
      await fetchOrders();
    } catch (e: any) {
      alert(e.message);
    }
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Ordrar</h1>

      {loading && <p>Inläser ordrar...</p>}
      {error && <p className='text-red-500'>Fel: {error}</p>}

      {!loading && !error && (
        <table className='min-w-full border-collapse'>
          <thead>
            <tr>
              <th className='border px-4 py-2'>ID</th>
              <th className='border px-4 py-2'>Användar-ID</th>
              <th className='border px-4 py-2'>Produkter</th>
              <th className='border px-4 py-2'>Totalt</th>
              <th className='border px-4 py-2'>Status</th>
              <th className='border px-4 py-2'>Åtgärder</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td className='border px-4 py-2'>{order.id}</td>
                <td className='border px-4 py-2'>{order.userId}</td>
                <td className='border px-4 py-2'>
                  <pre className='whitespace-pre-wrap'>
                    {JSON.stringify(order.items, null, 2)}
                  </pre>
                </td>
                <td className='border px-4 py-2'>{order.total} SEK</td>
                <td className='border px-4 py-2 capitalize'>{order.status}</td>
                <td className='border px-4 py-2 space-x-2'>
                  <button
                    className='px-3 py-1 bg-red-500 text-white rounded'
                    onClick={() => deleteOrder(order.id)}>
                    Radera
                  </button>
                  {order.status !== 'skickat' && (
                    <button
                      className='px-3 py-1 bg-green-500 text-white rounded'
                      onClick={() => markSent(order.id)}>
                      Markera som skickat
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
