import { cookies } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/prisma/client";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  // ✅ Use Better Auth's built-in API endpoint for sessions
  const cookieStore = cookies();
  const response = await auth.api["auth.session.get"]({ cookies: cookieStore });
  const session = await response.json();
  const userSession = session?.user;

  if (!userSession?.email) {
    redirect("/signin");
  }

  const user = await db.user.findUnique({
    where: { email: userSession.email },
    include: { orders: true },
  });

  if (!user) {
    return <main className="text-white p-10">User not found.</main>;
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white px-4 py-10 flex flex-col items-center">
      <div className="max-w-xl w-full bg-slate-800 rounded shadow-md p-6 space-y-4">
        <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
        <p><span className="font-semibold">Name:</span> {user.name}</p>
        <p><span className="font-semibold">Email:</span> {user.email}</p>
        <p><span className="font-semibold">Phone:</span> {user.phone || "N/A"}</p>

        <hr className="border-slate-600 my-4" />

        <h2 className="text-xl font-semibold">Order History</h2>
        {user.orders.length > 0 ? (
          <ul className="space-y-2 text-sm">
            {user.orders.map((order) => (
              <li key={order.id} className="bg-slate-700 p-3 rounded">
                <div className="font-medium">Product: {order.product}</div>
                <div>Status: {order.status}</div>
                <div className="text-xs text-slate-400">
                  Ordered: {new Date(order.createdAt).toLocaleString()}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="bg-slate-700 p-4 rounded text-sm">
            You haven’t placed any orders yet.
          </div>
        )}
      </div>
    </main>
  );
}
