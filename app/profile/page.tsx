import { getMyOrders } from "@/app/users/actions";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FaBoxOpen } from "react-icons/fa";

export default async function ProfilePage() {
  const userSession = await getSession();

  if (!userSession) {
    redirect("/signin");
  }

  const orders = await getMyOrders(userSession.user.id);

  return (

    <main className="min-h-screen bg-gradient-to-b from-[#FEFAE1] to-[#daa400]">
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-[#3D5300] to-[#616F47] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Ditt Konto</h1>
          <p className="text-xl text-[#FEFAE1] max-w-2xl mx-auto">
            Se din profilinformation och spåra dina tidigare beställningar hos Bloom.
          </p>
        </div>
      </div>

      {/* Profile Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">
          <h2 className="text-3xl font-semibold text-[#3D5300]">Profilinformation</h2>
          <div className="space-y-2 text-slate-800">
            <p>
              <span className="font-semibold">Namn:</span> {userSession.user.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {userSession.user.email}
            </p>
          </div>

          <hr className="border-slate-300" />

          <h3 className="text-2xl font-semibold text-[#3D5300]">Beställningshistorik</h3>
          {orders.length > 0 ? (
            <ul className="space-y-4">
              {orders.map((order) => (
                <li
                  key={order.id}
                  className="bg-[#FEFAE1] border border-[#3D5300] p-4 rounded-lg shadow"
                >
                  <div className="font-medium text-[#3D5300]">
                    Order ID: {order.orderNr ?? order.id}
                  </div>
                  <div className="font-semibold mt-2">Produkter:</div>
                  <ul className="ml-4 list-disc text-slate-700 text-sm">
                    {order.items.map((item) => (
                      <li key={item.id}>
                        {item.product.title} (x{item.quantity})
                      </li>
                    ))}
                  </ul>
                  <div className="text-slate-700 mt-2">Status: {order.status}</div>
                  <div className="text-xs text-slate-500">
                    Beställd: {new Date(order.createdAt).toLocaleString()}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center text-center text-slate-600 py-10">
              <FaBoxOpen className="w-16 h-16 mb-4" />
              <p className="text-lg">Du har inte lagt någon beställning ännu.</p>
            </div>
          )}

    <main className="min-h-screen bg-gradient-to-b from-[#FEFAE1] to-[#daa400] py-12 px-4">
      <div className="mx-auto max-w-4xl">
        <div className="bg-gradient-to-b from-[#FEFAE1] to-[#daa400] rounded-2xl shadow-2xl overflow-hidden p-8 space-y-8">
          <div>
            <h1 className="text-4xl font-bold text-[#3D5300] mb-2">
              Din Profil
            </h1>
            <div className="text-[#616F47] space-y-1">
              <p><span className="font-semibold">Namn:</span> {userSession.user.name}</p>
              <p><span className="font-semibold">E-post:</span> {userSession.user.email}</p>
            </div>
          </div>

          <hr className="border-[#daa400]" />

          <div>
            <h2 className="text-2xl font-semibold text-[#3D5300] mb-4">Beställning Historik</h2>

            {orders.length > 0 ? (
              <ul className="space-y-4 text-sm">
                {orders.map((order) => (
                  <li key={order.id} className="bg-[#FEFAE1] border border-[#3D5300] p-4 rounded-xl shadow-md">
                    <div className="font-semibold text-[#3D5300] mb-1">
                      Beställning ID: {order.id}
                    </div>

                    <div className="text-[#616F47] mb-2">
                      <div className="font-medium">Produkter:</div>
                      <ul className="ml-4 list-disc space-y-1">
                        {order.items.map((item) => (
                          <li key={item.id}>
                            {item.product.title} (x{item.quantity})
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-[#3D5300] font-medium">
                      Status: {order.status}
                    </div>
                    <div className="text-xs text-[#616F47] mt-1">
                      Beställd: {new Date(order.createdAt).toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="bg-gradient-to-b from-[#FEFAE1] to-[#daa400] text-[#616F47] p-4 rounded text-center">
                Du har inte gjort några beställningar ännu.
              </div>
            )}
          </div>
        </div>

        {/* Trust Badge */}
        <div className="mt-8 text-center text-[#616F47]">
          <p className="inline-flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Säker betalning • 30 dagars öppet köp
          </p>

        </div>
      </div>
    </main>
  );
}
