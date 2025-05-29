// components/UnderHeader.tsx

export default function UnderHeader() {
    return (
        <div className="bg-[#00360f] text-white w-full px-8 py-3 flex justify-between items-center text-sm">
            <div className="flex gap-8">
                <span className="hover:underline cursor-pointer">BLOMMOR</span>
                <span className="hover:underline cursor-pointer">VÄXTER</span>
                <span className="hover:underline cursor-pointer">TIPS & RÅD</span>
            </div>
            <div className="flex gap-4 text-sm">
                <span className="hover:underline cursor-pointer">Kundklubb</span>
                <span className="hover:underline cursor-pointer">Våra butiker</span>
            </div>
        </div>
    );
}
