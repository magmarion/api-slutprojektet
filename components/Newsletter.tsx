export default function NewsletterSignup() {
    return (
        <section className="w-full bg-[#f8f2c7] py-12 px-4 mb-4">
            <div className="max-w-xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-[#465232] mb-4">
                    Prenumerera på vårt nyhetsbrev
                </h2>
                <p className="text-[#000000] mb-6">
                    Få de senaste blomnyheterna, specialerbjudanden och tips direkt till din inkorg!
                </p>
                <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <input
                        type="email"
                        placeholder="Din e-postadress"
                        required
                        className="w-[172px] sm:w-auto px-4 py-3 border border-[#4f5e3c] rounded-md focus:outline-none focus:ring-2 focus:ring-[#616F47] text-black"
                    />
                    <button
                        type="submit"
                        className="px-10 py-3 sm:w-auto bg-[#354b18] text-white rounded-md hover:bg-[#3e6111] transition-colors"
                    >
                        Prenumerera
                    </button>
                </form>

            </div>
        </section>
    );
}
