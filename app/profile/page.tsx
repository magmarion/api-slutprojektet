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
    <>
      <div className="min-h-screen bg-gradient-to-b from-[#FEFAE1] to-[#daa400]">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-[#3D5300] to-[#616F47] text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Ditt Konto</h1>
            <p className="text-xl text-[#FEFAE1] max-w-2xl mx-auto">
              Se din profilinformation och spåra dina tidigare beställningar hos Bloom.
            </p>
          </div>
        </section>

        {/* Profile Content */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 space-y-6">
            <h2 className="text-3xl font-semibold text-[#3D5300]">Profilinformation</h2>
            <div className="space-y-2 text-slate-800">
              <p>
                <span className="font-semibold">Namn:</span> {userSession.user.name}
              </p>
              <p>
                <span className="font-semibold">E-post:</span> {userSession.user.email}
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
                      Ordernummer: {order.id}
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
              <div className="bg-gradient-to-b from-[#FEFAE1] to-[#daa400] text-[#223500] p-4 rounded text-center">
                <FaBoxOpen className="w-16 h-16 mx-auto mb-4" />
                Du har inte gjort några beställningar ännu.
              </div>
            )}

            {/* Trust Badge */}
            <div className="mt-8 text-center text-[#223500]">
              <p className="inline-flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Säker betalning • 30 dagars öppet köp
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
