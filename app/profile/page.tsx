import { getMyOrders } from "@/app/users/actions";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const userSession = await getSession();

  if (!userSession) {
    redirect("/signin");
  }

  const orders = await getMyOrders(userSession.user.id);

  return (
    <main className="min-h-screen bg-slate-900 text-white px-4 py-10 flex flex-col items-center">
      <div className="max-w-xl w-full bg-slate-800 rounded shadow-md p-6 space-y-4">
        <h1 className="text-3xl font-bold mb-4">Din Profil</h1>
        <p>
          <span className="font-semibold">Namn:</span> {userSession.user.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {userSession.user.email}
        </p>

        <hr className="border-slate-600 my-4" />

        <h2 className="text-xl font-semibold">Beställning Historik</h2>
        {orders.length > 0 ? (
          <ul className="space-y-2 text-sm">
            {orders.map((order) => (
              <li key={order.id} className="bg-slate-700 p-3 rounded">
                <div className="font-medium">Beställning ID: {order.id}</div>
                <div className="font-medium">Produkter:</div>
                <ul className="ml-4 list-disc">
                  {order.items.map((item) => (
                    <li key={item.id}>
                      {item.product.title} (x{item.quantity})
                    </li>
                  ))}
                </ul>
                <div>Status: {order.status}</div>
                <div className="text-xs text-slate-400">
                  Ordered: {new Date(order.createdAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="bg-slate-700 p-4 rounded text-sm">
            Du har inte gjort några beställningar ännu.
          </div>
        )}
      </div>
    </main>
  );
}
