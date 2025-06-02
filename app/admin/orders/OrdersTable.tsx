'use client';

import { OrderWithRelations, deleteOrder, updateOrder } from '@/app/orders/actions';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react'; // valfri ikon

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
        <div className="mt-6 px-4">

            <button
                onClick={() => router.back()}
                className="mb-6 flex items-center gap-2 text-md text-[#000000] hover:underline">
                <ArrowLeft className="w-4 h-4" />
                Tillbaka
            </button>

            {/* Mobilvy: Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 xl:hidden">
                {orders.map((order) => (
                    <div
                        key={order.id}
                        className="flex flex-col justify-between bg-white/70 border border-gray-300 rounded-md shadow-md p-4 min-h-[300px] max-h-[350px] overflow-hidden w-full">

                        {/* Innehåll med scroll vid behov */}
                        <div className="flex flex-col space-y-2 flex-grow text-sm text-gray-700 overflow-y-auto pr-1">
                            <div>
                                <strong>Order ID:</strong> <span className="break-all">{order.id}</span>
                            </div>
                            <div>
                                <strong>Kund:</strong> <span className="break-words">{order.user.name}</span>
                            </div>
                            <div>
                                <strong>Produkter:</strong>
                                <ul className="list-disc pl-4 pr-2 space-y-1">
                                    {order.items.map((item) => (
                                        <li key={item.id}>
                                            <span className="break-words">
                                                {item.product.title} × {item.quantity}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="text-green-700 font-medium">
                                <strong>Totalt:</strong> {order.total} SEK
                            </div>
                            <div>
                                <span
                                    className={`inline-block px-2 py-1 rounded text-xs font-semibold ${order.status === 'skickat'
                                        ? 'bg-green-100 text-green-700'
                                        : 'bg-yellow-100 text-yellow-800'
                                        }`}>
                                    {order.status}
                                </span>
                            </div>
                        </div>

                        {/* Knappar */}
                        <div className="mt-4 flex gap-2 shrink-0">
                            <button
                                onClick={() => onDelete(order.id)}
                                disabled={isPending}
                                className="flex-1 px-3 py-1 bg-[#d73d3d] hover:bg-[#a72b2b] text-white rounded-md text-xs disabled:opacity-50 transition">
                                Radera
                            </button>
                            {order.status !== 'skickat' && (
                                <button
                                    onClick={() => onMarkSent(order.id)}
                                    disabled={isPending}
                                    className="flex-1 px-3 py-1 bg-[#688e00] hover:bg-[#4e6a00] text-white rounded-md text-xs disabled:opacity-50 transition">
                                    Skicka
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>


            {/* Desktopvy: Tabell */}
            <div className="hidden xl:block overflow-x-auto">
                <table className="min-w-full text-sm text-left bg-white border border-gray-200 rounded-lg shadow-md">
                    <thead className="bg-[#3D5300] text-white">
                        <tr>
                            <th className="px-4 py-3">Order ID</th>
                            <th className="px-4 py-3">Kund</th>
                            <th className="px-4 py-3">Produkter</th>
                            <th className="px-4 py-3">Totalt</th>
                            <th className="px-4 py-3">Status</th>
                            <th className="px-4 py-3">Åtgärder</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-[#f6f9ef] transition">
                                <td className="px-4 py-3 font-medium text-gray-700">{order.id}</td>
                                <td className="px-4 py-3 text-gray-700">{order.user.name}</td>
                                <td className="px-4 py-3 text-gray-600">
                                    <ul className="list-disc pl-5">
                                        {order.items.map((item) => (
                                            <li key={item.id}>
                                                {item.product.title} × {item.quantity}
                                            </li>
                                        ))}
                                    </ul>
                                </td>
                                <td className="px-4 py-3 font-semibold text-green-700">{order.total} SEK</td>
                                <td className="px-4 py-3 capitalize">
                                    <span
                                        className={`inline-block px-2 py-1 rounded text-xs font-semibold ${order.status === 'skickat'
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-yellow-100 text-yellow-800'
                                            }`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3 space-x-5">
                                    <button
                                        onClick={() => onDelete(order.id)}
                                        disabled={isPending}
                                        className="px-3 py-1 bg-[#d73d3d] hover:bg-[#a72b2b] text-white rounded-md text-xs disabled:opacity-50 transition">
                                        Radera
                                    </button>
                                    {order.status !== 'skickat' && (
                                        <button
                                            onClick={() => onMarkSent(order.id)}
                                            disabled={isPending}
                                            className="px-3 py-1 bg-[#688e00] hover:bg-[#4e6a00] text-white rounded-md text-xs disabled:opacity-50 transition">
                                            Skicka
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
