import { getOrders } from './actions';

export default async function OrdersPage() {
    const orders = await getOrders();

    return (
        <div>
            {orders.map(order => (
                <div key={order.id}>{order.status}</div>
            ))}
        </div>
    );
}