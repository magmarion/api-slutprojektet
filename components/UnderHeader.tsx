// components/UnderHeader.tsx
export default function UnderHeader() {
    return (
        <div className="bg-[#00360f] text-white w-full px-4 py-3 text-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-8">
                <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
                    <span className="hover:underline cursor-pointer">BLOMMOR</span>
                    <span className="hover:underline cursor-pointer">VÄXTER</span>
                    <span className="hover:underline cursor-pointer">TIPS & RÅD</span>
                </div>
                <div className="flex flex-wrap justify-center gap-4 sm:justify-end">
                    <span className="hover:underline cursor-pointer">Kundklubb</span>
                    <span className="hover:underline cursor-pointer">Våra butiker</span>
                </div>
            </div>
        </div>
    );
}